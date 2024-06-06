import { get_profile, change_user_value, isvalidloggin } from "$lib/server/firebase"
import { json } from '@sveltejs/kit';
import { error } from '@sveltejs/kit';

export async function POST({ request, cookies }) {
  let logged = cookies.get("_ci") != undefined && cookies.get("_ci") != null && cookies.get("_ci") != ""
  const user = cookies.get("_ci")
  if (await get_profile(user) == null) { logged = false }

  if (logged) {
    const check_valid = await check_token(cookies.get("_st"))
    if (check_valid.code != 200 || check_valid.data != user || check_valid.sub != "t") {
      throw redirect(303, "/login?next=" + encodeURI("/settings"))
    }

    const { user, type, value } = await request.json();
    const data = await change_user_value(user, type, value)
    return json({ data: data }, { status: 200 })
  } else {
    if (check_valid.code != 200 || check_valid.data != user || check_valid.sub != "t") {
      throw redirect(303, "/login?next=" + encodeURI("/settings"))
    }
  }

}





