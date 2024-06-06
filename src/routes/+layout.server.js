import NodeCache from "node-cache";
import { get_profile,transform_profile } from "$lib/server/firebase"
import { check_token,generate_token } from "$lib/server/token"

const profile_cache = new NodeCache({stdTTL: 300});

export async function load({cookies}) {
    let logged = cookies.get("_ci") != undefined && cookies.get("_ci") != null && cookies.get("_ci") != ""
    const user = cookies.get("_ci")
    const check_valid = await check_token(cookies.get("_st"))
    if (check_valid.code == 200 && check_valid.data == user && check_valid.sub == "t") {
        logged = true
    } else {
        const check_refresh = await check_token(cookies.get("_rt"))
        if (check_refresh.code == 200 && check_refresh.data == user && check_refresh.sub == "r") {
            cookies.set('_st', await generate_token(user,"t",3600), {
                path: '/',
                httpOnly: true,
                sameSite: 'strict',
                secure: true,
            });
        } else {
            logged = false
        }

    }
    let profile = undefined
    if (logged == true) {
        if (user in profile_cache) {
            profile = profile_cache[user]
        } else {
            profile = await get_profile(user)
            if (profile != null) {
                profile = transform_profile(profile)
                profile_cache[user] = profile
            } else {
                logged = false
            }

        }
    }

    return {logged:logged,user:user,profile:profile}
}