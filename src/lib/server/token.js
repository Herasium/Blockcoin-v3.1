const Test_Sign_Key = "62197fc8886bd3b739dd2cc8aa109d0be93acdea64c07b8908168b80daf1dc47"
import { jwtDecrypt,EncryptJWT } from "jose"
import { createHash } from 'crypto';

function hash(string) {
    return createHash('sha256').update(string).digest('hex');
  }

let CURRENT = "local"
let TOKEN


if (process.env.TOKEN != undefined) {
  CURRENT = "prod"
}

if (CURRENT == "local") {
    TOKEN = Test_Sign_Key
}  else if (CURRENT == "prof") {
    TOKEN = process.env.TOKEN
}

const decryptJwt = async (jwt, secret) => {
	const options = {
		issuer: "https://blockcoin.social",
		audience: "https://blockcoin.social/",
		contentEncryptionAlgorithms: ["A256GCM"],
		keyManagementAlgorithms: ["dir"],
	};
	return jwtDecrypt(jwt, Buffer.from(secret,"hex"), options);
};

const generateEncryptedJwt = (subject, payload, secret, duration) => {
	return new EncryptJWT(payload)
		.setProtectedHeader({ alg: "dir", enc: "A256GCM" })
		.setIssuedAt()
		.setSubject(subject)
		.setIssuer("https://blockcoin.social")
		.setAudience("https://blockcoin.social/")
		.setExpirationTime(duration)
		.encrypt(Buffer.from(secret,"hex"));
};

export async function check_token(token) {
    try {
        var decoded = await decryptJwt(token, TOKEN);
        return {"data":decoded.payload.data,"sub":decoded.payload.sub,"code":200}
    } catch(err) {
        console.log(err)
        return {"data":undefined,"sub":undefined,"code":400}
    }
}

export async function generate_token(data,type,duration) {
    return await generateEncryptedJwt(type,{data:data},TOKEN,Math.floor(Date.now() / 1000) + duration)
}