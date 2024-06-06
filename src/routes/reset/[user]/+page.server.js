import { get_profile } from "$lib/server/firebase"
import { error, redirect } from '@sveltejs/kit';

export async function load({ request, params }) {
    const query = new URL(request.url).searchParams;
    const x = parseInt(query.get("x"));
	if (await get_profile(params.user) != null) {
        if (Math.floor(Date.now() / 1000) <= x) {
            return {
                id: params.user
            }
        } else {
            error(403, {
                message: 'This Password Reset link has expired.'
            });
        }
    } else {
        error(401, {
            message: 'You have to be reseting the password of a valid account.'
        });
    }
}