import type { RequestHandler } from '@sveltejs/kit';
import { json } from '@sveltejs/kit';
import User from '$lib/database/userSchema.js';
import { connectDB } from '$lib/database/connectDB.js';
export const GET = async ({ cookies }) => {
	let cart;
	// get the cookies
	const username = cookies.get('username');
	await connectDB();

	try {
		const findUser = await User.findOne({ username });

		if (findUser) {
			cart = findUser.cart;
		} else {
			return json({ message: 'User not Found' }, { status: 404 });
		}
	} catch (error) {
		console.log(error);
	}

	return json({ message: cart }, { status: 200 });
};
