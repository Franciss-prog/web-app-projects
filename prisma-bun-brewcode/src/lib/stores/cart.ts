import { writable } from 'svelte/store';
import axios from 'axios';
// Cart item type
export interface CartItem {
	id: number;
	name: string;
	price: number;
	quantity: number;
	image: string;
}
export const cart = writable<CartItem[]>([]);

// Fetch and update the cart store
export const fetchCart = async () => {
	try {
		const response = await axios.get('/api/dashboard/cart/get');
		if (response.status === 200) {
			cart.set(response.data.message || []);
		}
	} catch (error) {
		if (axios.isAxiosError(error)) {
			console.error('Error fetching cart:', error);
		}
	}
};
