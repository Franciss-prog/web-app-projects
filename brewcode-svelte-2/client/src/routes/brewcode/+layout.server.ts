import { redirect } from '@sveltejs/kit';
import type { LayoutServerLoad } from './$types';

export const load: LayoutServerLoad = async ({ locals, cookies }) => {
	const session = await locals.auth();
	const auth = cookies.get('jwtCookie') || session;

	if (!auth) {
		throw redirect(303, '/auth');
	}

	return {
		session,
		jwt: cookies.get('jwtCookie')	
	};
};
