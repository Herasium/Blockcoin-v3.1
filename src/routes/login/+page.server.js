import { error, redirect } from '@sveltejs/kit';
import { v5 as uuid} from 'uuid'
import { login_user } from '$lib/server/firebase.js';
import { generate_token } from "$lib/server/token"

export const actions = {
    async default({ request, cookies,getClientAddress,url }) {
        const form = await request.formData(); 
        const password = form.get('password');
        const username = form.get('username');
        let next = url.searchParams.get('next');
        if (!password || !username) { //Check is all required values are here, redirect if not.
            throw redirect(303, '/login?error=02.4.034'); 
        }

        const data = await login_user(username, password,request.headers.get('CF-Connecting-IP') || getClientAddress(),request.headers.get("User-Agent"));
        const id = data.id

        if (id == null) { redirect(303,'/login?error='+data.internal)}

        cookies.set('_ci', id, {
            path: '/',
            httpOnly: true,
            sameSite: 'strict',
            secure: true,
        });

        cookies.set('_st', await generate_token(id,"t",300), {
            path: '/',
            httpOnly: true,
            sameSite: 'strict',
            secure: true,
        });

        cookies.set('_rt', await generate_token(id,"r",7776000), {
            path: '/',
            httpOnly: true,
            sameSite: 'strict',
            secure: true,
        });
        console.log(next)
        if (next == null) {
            throw redirect(303, '/dashboard');
        }
        throw redirect(303, decodeURI(next));
    }
};
