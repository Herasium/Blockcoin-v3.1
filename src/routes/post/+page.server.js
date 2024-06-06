import { error, redirect } from '@sveltejs/kit';
import { v5 as uuid} from 'uuid'
import { login_user } from '$lib/server/firebase.js';
import { generate_token } from "$lib/server/token"

export const actions = {
    async default({ request, cookies,getClientAddress,url }) {
        const form = await request.formData(); 
        console.log(form)
    }
};
