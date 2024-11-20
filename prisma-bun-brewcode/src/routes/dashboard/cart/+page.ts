import axios from 'axios';
import type { PageLoad } from './$types';
import { cart } from '$lib/stores/cart';


export const load: PageLoad = async () => {
	let error = null;
	try {
        const response = await axios.get('/api/dashboard/cart/get')

        // response validation
        if (response.status === 200 && Array.isArray(response.data.message)) {
            cart.set(response.data.message || [])
        }
		else {
			console.warn('Unexpected response format:', response.data);
			cart.set([]); 
		}
    } catch (err) {
        console.error('Failed to fetch cart:', err);
		cart.set([])
    }

	return {
		cart,
		error
	};
};
