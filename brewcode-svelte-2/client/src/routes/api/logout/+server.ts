import { json, type RequestHandler } from '@sveltejs/kit';

export const POST: RequestHandler = async ({ cookies }) => {
	// cookie validation
	if (!cookies.get('jwtCookie')) {
		return json({ message: "Your'e not using jwtAuth" }, { status: 401 });
	}
	cookies.delete('jwtCookie', {
		path: '/'
	});

	return json({ message: 'Successfully logout' }, { status: 200 });
};
