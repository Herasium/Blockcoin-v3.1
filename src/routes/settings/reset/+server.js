import { get_profile } from "$lib/server/firebase"
import { send_reset_email } from "$lib/server/email"
import { json } from '@sveltejs/kit';
import { error } from '@sveltejs/kit';

export async function POST({request, cookies}) {
    let logged = cookies.get("_ci") != undefined && cookies.get("_ci") != null && cookies.get("_ci") != ""
    const user = cookies.get("_ci")

    if (await get_profile(user) == null) {logged = false}
    if (await isvalidloggin(cookies.get("_ci"),cookies.get("_st")) == false) {logged = false}
    
    if (logged) {
        await send_reset_email(user,(await get_profile(user)).user,(await get_profile(user)).email)
        return json({message:"success!"},{status: 200})
    } else {
        error(401, {
            message: 'You have to be logged in through a valid account.'
        });
    }
}