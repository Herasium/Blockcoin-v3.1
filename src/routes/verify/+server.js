import { code_from_user } from "$lib/server/email"
import { error, redirect } from '@sveltejs/kit';
import { verifyemail } from "$lib/server/firebase"

export async function POST({ request, cookies }) {
	const { user,code } = await request.json();



	if (!user || !code) { //Check is all required values are here, redirect if not.
		throw error(422); 
	}

	const verif = code_from_user(user.toLowerCase())

	if (verif.toString() === code.toString()) {
		await verifyemail(user.toLowerCase())	
		return redirect(303,"/verify/"+user+"/success")
	} else {
		throw redirect(303,"/verify/"+user+"?error=03.4.002"); 
	}
}
