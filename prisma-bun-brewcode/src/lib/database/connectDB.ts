import mongoose from 'mongoose';
import { MONGODB_URL } from '$env/static/private';

export const connectDB = async () => {
	if (mongoose.connections[0].readyState) {
		console.log('Database connection already established.');
	}
	try {
		await mongoose.connect(MONGODB_URL);
		//  success log
		console.log('Connected to Databse Success!');
		return true;
	} catch (err) {
		// error handling
		console.error('Failed to Connect to DB: ', err);
		return false;
	}
};
