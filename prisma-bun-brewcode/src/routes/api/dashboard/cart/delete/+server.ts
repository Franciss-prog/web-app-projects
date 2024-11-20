import { connectDB } from '$lib/database/connectDB';
import User from '$lib/database/userSchema';
import { json } from '@sveltejs/kit';

export const DELETE = async ({ cookies }) => {
	// connect to database first
	await connectDB();

	// get the user cookies
	const username = cookies.get('username');

	const findUser = await User.findOne({ username });

	// validation
	if (!findUser) {
		return json({ message: 'User not Found' }, { status: 404 });
	}

	findUser.cart = [];
	await findUser.save();
	return json({ message: 'Cart cleared successfully' }, { status: 200 });
};
