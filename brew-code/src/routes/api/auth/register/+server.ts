import { json, error, type RequestHandler } from '@sveltejs/kit';
import userModel from '$lib/server/userSchema';
import { connectToDatabase } from '$lib/server/DB';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';

import { JWT_SECRET } from '$env/static/private';

export const POST: RequestHandler = async ({ request, cookies }) => {
	// connect to db first
	await connectToDatabase();
	const user = await request.formData();

	const username = user.get('username') as string;
	const email = user.get('email') as string;
	const password = user.get('password') as string;

	// validate the data
	if (!username || !email || !password) {
		return json({ message: 'Please fill in all fields' }, { status: 400 });
	}

	const isUserExisted = await userModel.findOne({ email });

	if (isUserExisted) {
		return json({ message: 'User alreaady existed' }, { status: 402 });
	}

	// hash the password
	const salt = await bcrypt.genSalt(10);
	const hashedPassword = await bcrypt.hash(password, salt);

	try {
		// create new user
		const newUser = await userModel.create({
			username,
			email,
			password: hashedPassword
		});

		// generate token
		const token = jwt.sign({ id: newUser._id }, JWT_SECRET, { expiresIn: '1h' });

		cookies.set('jwt', token, {
			httpOnly: true,
			secure: true,
			path: '/',
			maxAge: 60 * 60
		});
		return json({ message: `Welcome to BrewCode ${username}`, token }, { status: 201 });
	} catch (error) {
		// log the error
		console.log(error);
		return json({ message: 'Internal server error' }, { status: 500 });
	}
};
