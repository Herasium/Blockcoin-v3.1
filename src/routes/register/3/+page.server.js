import { error, redirect } from '@sveltejs/kit';
import { send_reset_email } from "$lib/server/email"
import { checkUsername,checkEmail,userexist,emailexist,checkPassword,check_date } from "$lib/server/firebase"
import { v5 as uuid} from 'uuid'
import { create_user } from '$lib/server/firebase.js';
import { generate_token } from "$lib/server/token"
import { send_code_email } from "$lib/server/email"


export const actions = {
    async default({ request, cookies, getClientAddress,url }) {
        const form = await request.formData(); 
        const email = cookies.get("_se")
        const user = cookies.get("_su")
        const pass = cookies.get('_sp'); 
        const bd = cookies.get("_sd").split("/")
        const contry = form.get("country")

        const re = url.searchParams.get("redirect")

        const year = bd[0]
        const month = bd[1]
        const day = bd[2]

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
        if (check_date(year,month,day) == false) {
            throw redirect(303,re ? "/register/2?error=02.4.041&redirect="+re : "/register/2?error=02.4.041")
        }

        const data = await create_user(user,email, pass,request.headers.get('CF-Connecting-IP') || getClientAddress(),request.headers.get("User-Agent"));
        const id = data.id

        if (id == null) { redirect(303,'/register?error='+data.internal)}

        cookies.set('_sc', "", {
            path: '/',
            httpOnly: true,
            sameSite: 'strict',
            secure: true,
            maxAge: 1
        });
        cookies.set('_su', "", {
            path: '/',
            httpOnly: true,
            sameSite: 'strict',
            secure: true,
            maxAge: 1
        });
        cookies.set('_se', "", {
            path: '/',
            httpOnly: true,
            sameSite: 'strict',
            secure: true,
            maxAge: 1
        });
        cookies.set('_sd', "", {
            path: '/',
            httpOnly: true,
            sameSite: 'strict',
            secure: true,
            maxAge: 1
        });
        cookies.set('_sp', "", {
            path: '/',
            httpOnly: true,
            sameSite: 'strict',
            secure: true,
            maxAge: 1
        });

        await send_code_email(user,email)

        throw redirect(303, '/verify/'+user);
    }
};
