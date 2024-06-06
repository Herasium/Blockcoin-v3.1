import { get_profile, getStats, transform_profile } from "$lib/server/firebase"
import { json } from '@sveltejs/kit';
import { error } from '@sveltejs/kit';


export async function load({ cookies }) {
    let logged = cookies.get("_ci") != undefined && cookies.get("_ci") != null && cookies.get("_ci") != ""
    const user = cookies.get("_ci")

    if (await get_profile(user) == null) {logged = false}

    if (logged) {
        const stats = await getStats(user)
        const profile = await transform_profile(await get_profile(user))
        console.log(profile)
        return {
            dashboard: {
                user: profile,
                stats: {
                    likes: stats.likes,
                    views: stats.views,
                    followers: profile.followers
                }
            }
        }
    } else {
        error(401, {
            message: 'You have to be logged in through a valid account.'
        });
    }
}


