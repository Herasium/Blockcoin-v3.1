import { get_profile } from "$lib/server/firebase"
import { error, redirect } from '@sveltejs/kit';
import { check_token } from "$lib/server/token";

export async function load({ request, params }) {
    const token = params.token
    const { ip,id } = check_token(token)


}
