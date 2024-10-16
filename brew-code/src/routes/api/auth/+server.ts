import { json, type RequestHandler } from '@sveltejs/kit';
import { connectToDatabase } from '$lib/server/DB';
import userModel from '$lib/server/userSchema';
import { JWT_SECRET } from '$env/static/private';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';

export const POST: RequestHandler = async ({ request, cookies }) => {
	// Connect to the database
	await connectToDatabase();

	// Get the data from the client
	const form = await request.formData();
	const email = (form.get('email') as string) || '';
	const username = (form.get('username') as string) || '';
	const password = (form.get('password') as string) || '';

	// Check for the presence of username/email and password
	if (!password || (!email && !username)) {
		return json({ message: 'Please fill in all fields' }, { status: 400 });
	}

	try {
		// Look up the user based on provided email or username
		const user = email ? await userModel.findOne({ email }) : await userModel.findOne({ username });

		// Check if user exists
		if (!user) {
			return json({ message: 'User Not Found' }, { status: 404 });
		}

		// Validate the password
		const isPasswordValid = await bcrypt.compare(password, user.password);
		if (!isPasswordValid) {
			return json({ message: 'Invalid username and password' }, { status: 402 });
		}

		// Generate a JWT token if authentication is successful
		const token = jwt.sign({ id: user._id }, JWT_SECRET, { expiresIn: '1h' });

		cookies.set('jwt', token, {
			httpOnly: true,
			secure: false,
			path: '/',
			maxAge: 60 * 60
		});
		// Return success response with token
		return json({ message: 'User authenticated successfully', token }, { status: 200 });
	} catch (error) {
		console.error(error); // Log the error for debugging
		return json({ message: 'An error occurred during authentication' }, { status: 500 });
	}
};
