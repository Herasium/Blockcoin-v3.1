// @ts-nocheck
import admin from 'firebase-admin';
import { v5 } from 'uuid'
import serviceAccount from "./creds/firebase.json";
import { createHash } from 'crypto';
import { UAParser } from "ua-parser-js"
import { send_ip_email } from './email';
import { generate_token, check_token } from './token';
import NodeCache from "node-cache";


export function detectLanguage(text) {
  const langCode = franc(text);
  return langCode
}

function hash(string) {
  return createHash('sha256').update(string).digest('hex');
}

let CURRENT = "local"

function removeUndefinedValues(obj) {
  for (let key in obj) {
    if (obj[key] === undefined) {
      delete obj[key];
    } else if (typeof obj[key] === 'object') {
      removeUndefinedValues(obj[key]);
    }
  }
}


export function checkUsername(inputString) {
  const pat = /^[a-zA-Z0-9\.\-_]{4,16}$/;
  const match = inputString.match(pat);
  return match !== null;
}

export function checkPassword(inputString) {
  const pat = /^.{8,32}$/;
  const match = inputString.match(pat);
  return match !== null;
}

export function checkEmail(s) {
  const pat = /\b[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,7}\b/;
  const match = s.trim().match(pat);
  return match !== null;
}


function getRandomInt(max) {
  return Math.floor(Math.random() * max);
}

if (process.env.SERVICE != undefined) {
  CURRENT = "prod"
}

const profile_cache = new NodeCache({ stdTTL: 300 });
const trending_cache = new NodeCache({ stdTTL: 600 });
const user_posts_cache = new NodeCache({ stdTTL: 600 });
const user_buyed_cache = new NodeCache({ stdTTL: 600 });

try {
  if (CURRENT == "local") {
    admin.initializeApp({
      credential: admin.credential.cert(serviceAccount),
      databaseURL: "https://blockcoin-test-default-rtdb.europe-west1.firebasedatabase.app/"
    });
  } else if (CURRENT == "prod") {
    admin.initializeApp({
      credential: admin.credential.cert(process.env.SERVICE),
      databaseURL: "https://blockcoin-db-default-rtdb.firebaseio.com"
    });
  }
} catch (e) {
  console.log("Firebase app already exist (hot reload)")
}




const db = admin.database();

const writeToDatabase = (collection, data) => {
  const ref = db.ref(collection);
  return ref.set(data);
};

export const readFromDatabase = (collection) => {
  const ref = db.ref(collection);
  return ref.once('value').then(snapshot => snapshot.val());
};

async function send_img(img) {
  const url = 'https://api.imgbb.com/1/upload';
  const fd = new FormData();
  fd.append('image', img);

  const response = await fetch(url + '?' + "key=" + "5136ba1bbda2bfdde19ecc810c93acf7", {
    method: 'POST',
    body: fd
  });
  let txt = await response.text()
  console.log(await response.json())
  return await response.json();
}


export async function get_profile(user) {

  let profile

  if (user in profile_cache) { //Get if the user profile exist in cache
    profile = profile_cache[user];
  } else {
    profile = await db.ref("/Users/" + user).once("value", function (snapshot) { return snapshot });
    profile = profile.val()
    profile_cache[user] = profile;
  }

  return profile
}

export function transform_profile(profile) {
  const newprofile = {
    "display": profile["display"],
    "user": profile["user"],
    "id": profile["id"],
    "about": profile["about"],
    "profile-picture": profile["profile-picture"],
    "banner": profile["banner"],
    "badges": profile["badges"] || [],
    "balance": profile["balance"],
    "followers": profile["followers"],
    "profile_picture":profile["profile-picture"],
  }
  return newprofile
}

export async function convert_post(post) {
  let profile, buyer;


  if (post["user"] in profile_cache) { //Get if the user profile exist in cache
    profile = profile_cache[post["user"]];
  } else {
    profile = await db.ref("/Users/" + post["user"]).once("value", function (snapshot) { return snapshot });
    profile = profile.val()
    profile_cache[post["user"]] = profile;
  }

  if (post["buyer"] !== "None") {
    if (post["buyer"] in profile_cache) {
      buyer = profile_cache[post["buyer"]];
    } else {
      buyer = await db.ref("/Users/" + post["buyer"]).once("value", function (snapshot) { return snapshot });
      buyer = buyer.val()
      profile_cache[post["buyer"]] = buyer;
    }
  }

  if (profile == null) {
    profile = {
      "display": "Deleted User",
      "user": "404",
      "id": "404",
      "profile-picture": "https://i.ibb.co/qD79cdF/image.png",
      "badges": [],

    }
  }

  const profile_data = {
    "display": profile["display"],
    "user": profile["user"],
    "id": post["user"],
    "profile-picture": profile["profile-picture"],
    "badges": profile["badges"] || []
  };

  const post_data = {
    "data": post,
    "profile": profile_data
  };

  if (buyer) {
    const buyer_data = {
      "display": buyer["display"],
      "user": buyer["user"],
      "id": post["buyer"],
      "profile-picture": buyer["profile-picture"],
      "badges": buyer["badges"] || []
    };
    post_data["buyer"] = buyer_data;
  }

  let regex = />/i;
  post_data["data"]["data"] = post_data["data"]["data"].replace(regex, '&gt;')

  regex = /</i;
  post_data["data"]["data"] = post_data["data"]["data"].replace(regex, '&lt;')

  post_data["data"]["comments_number"] = post_data["data"]["comments"] ? Object.keys(post_data["data"]["comments"]).length : 0
  delete post_data["data"]["all_likes"]
  delete post_data["data"]["comments"]
  delete post_data["data"]["view_list"]
  return post_data
}

export async function trending(offset) {
  try {
    offset = parseInt(offset)
    if (offset in trending_cache) {
      const trending_posts = trending_cache[offset];
      const sorted_trending = trending_posts.sort((a, b) => b["data"]["score"] - a["data"]["score"]);
      return sorted_trending;
    }

    let posts = await db.ref('/Posts').orderByChild('date').startAfter(Date.now() / 1000 + 604800).once("value", function (snapshot) { return snapshot });
    posts = posts.val()
    let trending_posts = [];
    const profiles = {};

    for (const [key, value] of Object.entries(posts)) {
      const date_score = (Date.now() / 1000 - value["date"]) / (60 * 60 * 24);
      const likes_score = (value["likes"] + 1) / (value["views"] + 1);
      const view_score = value["views"];
      const score = ((view_score / 100) * likes_score * 1000) / (date_score + 1);
      value["score"] = score;
      posts[key] = value;
    }

    const sorted_dict = Object.fromEntries(Object.entries(posts).sort(([, a], [, b]) => b["score"] - a["score"]));
    const sliced = Object.fromEntries(
      Object.entries(sorted_dict).slice(20 * offset, 20 * (offset + 1))
    );
    let count = offset * 20
    for (const [key, value] of Object.entries(sliced)) {
      let new_post = await convert_post(value)
      new_post["data"]["position"] = count
      trending_posts.push(new_post)
      count++
    }

    trending_cache[offset] = trending_posts;
    return trending_posts
  } catch (error) {
    console.error("Error in trending function:", error);
  }
};

async function getPostsFromUser(user) {
  let posts = await db.ref('/Posts').orderByChild('user').equalTo(user).once("value", function (snapshot) { return snapshot });
  posts = posts.val()
  return posts

}

export async function getStats(user) {
  let posts = await getPostsFromUser(user);
  let likes = 0;
  let views = 0;
  for (id in posts) {
    let post = posts[id];
    likes += post.likes;
    views += post.likes;
  }
  return { likes, views }
}

async function getUserFromName(name) {
  let user = await db.ref('/Users').orderByChild('user').equalTo(name).once("value", function (snapshot) { return snapshot });
  return user.val()
}
async function getUserFromEmail(name) {
  let user = await db.ref('/Users').orderByChild('email').equalTo(name).once("value", function(snapshot) {return snapshot});
  return user.val()
}


export async function login_user(username, password, ip, agent) {

  const user = username.toLowerCase()

  const id = v5("https://blockcoin.social/" + user.toLowerCase(), v5.URL)

  const profile = await get_profile(id)

  if (profile == null) { return { id: null, http: 409, internal: "02.4.031" } }

  if (hash(password + user) != profile.password) { return { id: null, http: 403, internal: "02.4.002" } }

  if (profile.ip.includes(ip)) return { id: id, http: 200 }

  const ip_data = await (await fetch("http://ip-api.com/json/" + ip + "?fields=66846719")).json()

  const continent = (ip_data.status == "success") ? ip_data.continent : "UNKNOWN"
  const country = (ip_data.status == "success") ? ip_data.country : "UNKNOWN"
  const city = (ip_data.status == "success") ? ip_data.city : "UNKNOWN"

  const parser = new UAParser(agent)
  const os = parser.getDevice().vendor + " " + parser.getOS().name + " " + parser.getOS().version
  const location = continent + " • " + country + " • " + city

  send_ip_email(id, username, profile.email, location, os, await generate_token({ id: id, ip: ip }, "aip", 300))

  return { id: null, http: 403, internal: "02.4.035" }
}

export async function create_user(username, email, password, ip, agent) {

  const user = username.toLowerCase()
  const id = v5("https://blockcoin.social/" + user, v5.URL)

  if (await getUserFromName(user) != null) { return { id: null, http: 409, internal: "02.4.032" } }

  if (checkEmail(email) == false) { return { id: null, http: 409, internal: "02.4.023" } }
  if (checkUsername(user) == false) { return { id: null, http: 409, internal: "02.4.023" } }
  if (checkPassword(password) == false) { return { id: null, http: 409, internal: "02.4.023" } }

  const ip_data = await (await fetch("http://ip-api.com/json/" + ip + "?fields=66846719")).json()
  const parser = new UAParser(agent)
  let parser_result = parser.getResult()
  removeUndefinedValues(parser_result)

  const user_profil = {
    'email': email,
    'about': 'Hello! I\'m ' + username + '! And I have a BlockCoin Account!',
    'password': hash(password + user),
    'balance': 0,
    'banned': false,
    'banner': "https://blockcoin.social/assets/default_banner.png",
    'user': user,
    'followers': 0,
    'public-balance': true,
    'public-follow': true,
    'display': username,
    'profile-picture': "https://blockcoin.social/assets/acc_" + (getRandomInt(4) + 1) + ".svg",
    "join-date": Date.now(),
    'ip': [ip],
    'id': id,
    'verified': false,
    "badges": [5],
    "ip_data": [{
      "local": ip_data.status == "fail",
      "country": (ip_data.status == "success") ? ip_data.countryCode : "UNKNOWN",
      "continent": (ip_data.status == "success") ? ip_data.continentCode : "UNKNOWN",
      "region": (ip_data.status == "success") ? ip_data.region : "UNKNOWN",
      "city": (ip_data.status == "success") ? ip_data.city : "UNKNOWN",
      "zip": (ip_data.status == "success") ? ip_data.zip : "UNKNOWN",
      "lat": (ip_data.status == "success") ? ip_data.lat : "UNKNOWN",
      "timezone": (ip_data.status == "success") ? ip_data.timezone : "UNKNOWN",
      "currency": (ip_data.status == "success") ? ip_data.currency : "UNKNOWN",
      "proxy": (ip_data.status == "success") ? ip_data.proxy : "UNKNOWN",
      "isp": (ip_data.status == "success") ? ip_data.isp : "UNKNOWN",
      "lon": (ip_data.status == "success") ? ip_data.lon : "UNKNOWN",
    }],
    "main_ip": 0,
    "ua_data": [parser_result],
  }

  await db.ref("/Users/" + id).set(user_profil)

  return { id: id, http: 200 }

}

export async function change_user_value(user, type, value) {
  let user_data = await get_profile(user)
  if (type == "profile-picture" || type == "banner") {
    const img = await send_img(value);
    user_data[type] = img["data"]["url"];
    await db.ref("/Users/" + user).set(user_data)
    return img["data"]["url"];
  } else if (type == "password") {
    user_data[type] = hash(value + user_data["user"]);
    await db.ref("/Users/" + user).set(user_data)
    return value;
  } else {
    user_data[type] = value;
    await db.ref("/Users/" + user).set(user_data)
    return value;
  }
}

export function toid(user) {
  return v5("https://blockcoin.social/"+user,v5.URL)
}

export async function userexist(user) {
  return await getUserFromName(user.toLowerCase()) !== null
}

export async function emailexist(email) {
  return await getUserFromEmail(email) !== null
}


export async function verifyemail(user) {
  const userId = toid(user)
  await db.ref(`/Users/${userId}/verified`).set(true)
}

export async function isvalidloggin(user, token) {
  const data = await check_token(token)
  return (data.type == "t" || data.data == user.toLowerCase())
}

export async function explore(offset) {
  try {
    offset = parseInt(offset)

    let posts = await db.ref('/Posts').orderByChild('date').once("value", function (snapshot) { return snapshot });
    posts = posts.val()
    let trending_posts = [];
    const profiles = {};
    for (const [key, value] of Object.entries(posts)) {
      const score = Math.random()
      value["score"] = score
    }

    const sorted_dict = Object.fromEntries(Object.entries(posts).sort(([, a], [, b]) => b["score"] - a["score"]));
    const sliced = Object.fromEntries(
      Object.entries(sorted_dict).slice(20 * offset, 20 * (offset + 1))
    );
    let count = offset * 20
    for (const [key, value] of Object.entries(sliced)) {
      let new_post = await convert_post(value)
      new_post["data"]["position"] = count
      trending_posts.push(new_post)
      count++
    }
    return trending_posts
  } catch (error) {
    console.error("Error in explore function:", error);
  }
};

export async function create_post(user, post, price) {
  const time = Date.now()

  const res = await fetch('https://vector.profanity.dev', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ message: post }),
  })



  const post_data = {
    "data": post,
    "user": user,
    "date": time,
    "likes": 0,
    "like_list": [],
    "views": 0,
    "view_list": [],
    "buyer": "None",
    "price": price,
    "ver": 2,
    "boost_multi": 1,
    "boost_end": 0,
    "hashtags": ""
  }
}


export function check_date(year, month, day) {
  const date = new Date(year, month - 1, day);
  return (
      date.getFullYear() == year &&
      date.getMonth() + 1 == month &&
      date.getDate() == day
  );
}

export async function user_posts(user,offset) {
  try {
    offset = parseInt(offset)
    if (user in user_posts_cache) {
      if (offset in user_posts_cache) {
        const trending_posts = user_posts_cache[user][offset];
        const sorted_trending = trending_posts.sort((a, b) => b["data"]["likes"] - a["data"]["likes"]);
        return sorted_trending;
      }
    }
    let posts = await db.ref('/Posts').orderByChild('user').equalTo(user).once("value", function (snapshot) { return snapshot });
    posts = posts.val()
    let trending_posts = [];

    const sorted_dict = Object.fromEntries(Object.entries(posts).sort(([, a], [, b]) => b["likes"] - a["likes"]));
    const sliced = Object.fromEntries(
      Object.entries(sorted_dict).slice(20 * offset, 20 * (offset + 1))
    );
    let count = offset * 20
    for (const [key, value] of Object.entries(sliced)) {
      let new_post = await convert_post(value)
      new_post["data"]["position"] = count
      trending_posts.push(new_post)
      count++
    }
    if (user in user_posts_cache == false) {
          user_posts_cache[user] = {}
    }

    user_posts_cache[user][offset] = trending_posts;
    return trending_posts
  } catch (error) {
    console.error("Error in user post function:", error,user);
  }
};

export async function user_buyed_posts(user,offset) {
  try {
    offset = parseInt(offset)
    if (user in user_buyed_cache) {
      if (offset in user_buyed_cache) {
        const trending_posts = user_buyed_cache[user][offset];
        const sorted_trending = trending_posts.sort((a, b) => b["data"]["likes"] - a["data"]["likes"]);
        return sorted_trending;
      }
    }
    let posts = await db.ref('/Posts').orderByChild('buyer').equalTo(user).once("value", function (snapshot) { return snapshot });
    posts = posts.val()
    let trending_posts = [];

    const sorted_dict = Object.fromEntries(Object.entries(posts).sort(([, a], [, b]) => b["likes"] - a["likes"]));
    const sliced = Object.fromEntries(
      Object.entries(sorted_dict).slice(20 * offset, 20 * (offset + 1))
    );
    let count = offset * 20
    for (const [key, value] of Object.entries(sliced)) {
      let new_post = await convert_post(value)
      new_post["data"]["position"] = count
      trending_posts.push(new_post)
      count++
    }
    if (user in user_buyed_cache == false) {
      user_buyed_cache[user] = {}
    }

    user_buyed_cache[user][offset] = trending_posts;
    return trending_posts
  } catch (error) {
    console.error("Error in user post function:", error,user);
  }
};

export async function follow_user(user,tofollow) {
  let follow_data = await db.ref('/Users/'+tofollow+"/followers_list").once("value", function (snapshot) { return snapshot });
  follow_data = follow_data.val()

  let following_data = await db.ref('/Users/'+user+"/following_list").once("value", function (snapshot) { return snapshot });
  following_data = following_data.val()

  if (follow_data == null ){follow_data = []}
  if (following_data == null ){following_data = []}

  if (follow_data.includes(user)) {
    const index = follow_data.indexOf(user);
    if (index > -1) { 
      follow_data.splice(index, 1); 
    }
  } else {
    follow_data.push(user)
  }

  if (following_data.includes(tofollow)) {
    const index = following_data.indexOf(tofollow);
    if (index > -1) { 
      following_data.splice(index, 1); 
    }
  } else {
    following_data.push(tofollow)
  }

  if (tofollow in profile_cache) {
    profile_cache[tofollow]["followers"] = follow_data.length
    profile_cache[tofollow]["followers_list"] = follow_data
  }

  if (user in profile_cache	) {
    profile_cache[user]["following_list"] = following_data
  }

  await db.ref('/Users/'+user+"/following_list").set(following_data)
  await db.ref('/Users/'+tofollow+"/followers_list").set(follow_data)
  await db.ref('/Users/'+tofollow+"/followers").set(follow_data.length)

}


export async function get_if_user_follow(user,tofollow) {
  if (user in profile_cache	) {
    if (profile_cache[user]["following_list"] != undefined) {
      return profile_cache[user]["following_list"].includes(tofollow)
    }
    return false
  }

   else {
    let following_data = await db.ref('/Users/'+user+"/following_list").once("value", function (snapshot) { return snapshot });
    following_data = following_data.val()
    if (following_data != null) {
      return following_data.includes(tofollow)
    }
    return false
   }
}