import { redirect } from '@sveltejs/kit';
import type { LayoutServerLoad } from './$types';

export const load: LayoutServerLoad = async ({ locals, cookies }) => {
	const session = await locals.auth();
	const auth = cookies.get('jwtCookie') || (await locals.auth());

	if (auth) {
		throw redirect(303, '/brewcode');
	}
	return {
		session,
		jwt: cookies.get('jwtCookie')
	};
};
