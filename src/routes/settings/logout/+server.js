import { json } from '@sveltejs/kit';

export async function GET({request, cookies}) {
    cookies.set('_ci', "", {
        path: '/',
        httpOnly: true,
        sameSite: 'strict',
        secure: true,
    });
    return json({status: 200});
}