import { error, redirect } from '@sveltejs/kit';
import { send_reset_email } from "$lib/server/email"
import { checkUsername,checkEmail,userexist,emailexist } from "$lib/server/firebase"

export const actions = {
    async default({ request, cookies, getClientAddress,url }) {
        const form = await request.formData(); 
        const email = form.get('email'); 
        const user = form.get('username'); 

        const re = url.searchParams.get("redirect")
        
        if (checkEmail(email) == false) {
            throw redirect(303,re ? "/register?error=02.4.036&redirect="+re : "/register?error=02.4.036")
        }

        if (checkUsername(user) == false) {
            throw redirect(303,re ? "/register?error=02.4.037&redirect="+re : "/register?error=02.4.037")
        }

        if (await userexist(user)) {
            throw redirect(303,re ? "/register?error=02.4.032&redirect="+re : "/register?error=02.4.032")
        }
        
        if (await emailexist(email)) {
            throw redirect(303,re ? "/register?error=02.4.040&redirect="+re : "/register?error=02.4.040")
        }


        cookies.set('_su', user, {
            path: '/',
            httpOnly: true,
            sameSite: 'strict',
            secure: true,
        });
        cookies.set('_se', email, {
            path: '/',
            httpOnly: true,
            sameSite: 'strict',
            secure: true,
        });

        throw redirect(303,"/register/1")
    }
};
