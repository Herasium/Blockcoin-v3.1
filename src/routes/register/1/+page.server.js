import { error, redirect } from '@sveltejs/kit';
import { send_reset_email } from "$lib/server/email"
import { checkUsername,checkEmail,userexist,emailexist,checkPassword } from "$lib/server/firebase"

export const actions = {
    async default({ request, cookies, getClientAddress,url }) {
        const form = await request.formData(); 
        const email = cookies.get("_se")
        const user = cookies.get("_su")
        const pass = form.get('password'); 
        const cpass = form.get('password-confirm'); 

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

        if (checkPassword(pass) == false) {
            throw redirect(303,re ? "/register/1?error=02.4.038&redirect="+re : "/register/1?error=02.4.038")
        }

        if (pass !== cpass) {
            throw redirect(303,re ? "/register/1?error=02.4.039&redirect="+re : "/register/1?error=02.4.039")
        }

        cookies.set('_sp', pass, {
            path: '/',
            httpOnly: true,
            sameSite: 'strict',
            secure: true,
        });


        throw redirect(303,"/register/2")
    }
};
