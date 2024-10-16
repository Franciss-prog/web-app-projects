import mongoose from 'mongoose';
import { MONGODB_URL } from '$env/static/private';

export async function connectToDatabase() {
	if (mongoose.connection.readyState >= 1) {
		// Already connected
		return;
	}
	try {
		await mongoose.connect(MONGODB_URL);
		console.log('Connected to MongoDB');
	} catch (error) {
		console.error('Error connecting to MongoDB:', error);
	}
}
