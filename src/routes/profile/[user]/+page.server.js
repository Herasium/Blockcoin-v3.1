import { get_profile,transform_profile,user_posts,follow_user,get_if_user_follow } from "$lib/server/firebase"
import { check_token } from "$lib/server/token";
import { json } from '@sveltejs/kit';
import { error,redirect } from '@sveltejs/kit';


export async function load({ url,params,cookies }) {
  let logged = cookies.get("_ci") != undefined && cookies.get("_ci") != null && cookies.get("_ci") != ""
  const current_user = cookies.get("_ci")
  const user = params.user
  const raw_profile = await get_profile(user)
  const user_profile = await transform_profile(raw_profile)
  user_profile["posts"] = await user_posts(user,0)
  if (logged) {
     user_profile["user_follow"] = await get_if_user_follow(current_user,user)
  } else {
    user_profile["user_follow"] = false
  }
  console.log(user_profile)
  return user_profile

}


export const actions = {
  async default({ request, cookies, params }) {
    const to_follow = params.user
    let logged = cookies.get("_ci") != undefined && cookies.get("_ci") != null && cookies.get("_ci") != ""
    const user = cookies.get("_ci")
    if (await get_profile(user) == null) {logged = false}

    if (logged) {
      const check_valid = await check_token(cookies.get("_st"))
      if (check_valid.code != 200 || check_valid.data != user || check_valid.sub != "t") {
        throw redirect(303,"/login?next="+encodeURI("/profile/"+to_follow))
      }

      await follow_user(user,to_follow)
      throw redirect(303,"/profile/"+to_follow)
    } else {
      throw redirect(303,"/login?next="+encodeURI("/profile/"+to_follow))
    }
  }
};
