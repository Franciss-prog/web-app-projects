// In your userSchema.ts (or wherever your User schema is defined)
import { Schema, model } from 'mongoose';


// Define a schema for items in the cart
const cartItemSchema = new Schema({
	name: { type: String, required: true },
	price: { type: Number, required: true },
	quantity: { type: Number, required: true }
});
const userSchema = new Schema({
	name: { type: String, required: false }, 
	username: { type: String, required: true },
	email: { type: String, required: true },
	password: { type: String, required: true },
	cart: {type: [cartItemSchema], default: [] }
});

const User = model('User', userSchema);

export default User;
