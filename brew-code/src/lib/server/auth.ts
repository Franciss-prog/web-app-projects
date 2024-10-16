import jwt from 'jsonwebtoken';
import userModel from './userSchema';
import bcrypt from 'bcryptjs';
import { JWT_SECRET } from '$env/static/private';

export const authLogin = async (email: string, password: string) => {
	const user = await userModel.findOne({ email });

	// validate the user
	if (!user) {
		throw new Error('user not found');
	}

	// compare the hashing
	const isMatch = await bcrypt.compare(password, user.password);

	if (!isMatch) {
		throw new Error("password doesn't match");
	}

	// generate JWT token
	const token = jwt.sign({ id: user._id }, JWT_SECRET);
	return token;
};



