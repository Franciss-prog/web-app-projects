// images
import espresso from '../../../images/espresso.png';
import americano from '../../../images/americano.png';
import latte from '../../../images/latte.png';
import cappuccino from '../../../images/cappuccino.png';
import macchiato from '../../../images/macchiato.png';
import mocha from '../../../images/mocha-coffee.png';
import type { PageLoad } from './$types';

// svelte

export interface Coffee {
	id: number;
	name: string;
	description: string;
	price: number;
	sizes: string[];
	image: string;
	quantity: number;
}	

const coffeeData: Coffee[] = [
	{
		id: 1,
		name: 'Espresso',
		description: 'A strong, concentrated coffee shot with a rich flavor.',
		price: 140, // 140 PHP
		sizes: ['Small', 'Medium', 'Large'],
		image: espresso,
		quantity: 0
	},
	{
		id: 2,
		name: 'Americano',
		description: 'Espresso diluted with hot water for a smooth, long coffee.',
		price: 168, // 168 PHP
		sizes: ['Small', 'Medium', 'Large'],
		image: americano,
		quantity: 0
	},
	{
		id: 3,
		name: 'Latte',
		description: 'Espresso with steamed milk and a thin layer of foam.',
		price: 196, // 196 PHP
		sizes: ['Small', 'Medium', 'Large'],
		image: latte,
		quantity: 0
	},
	{
		id: 4,
		name: 'Cappuccino',
		description: 'A balanced blend of espresso, steamed milk, and milk foam.',
		price: 196, // 196 PHP
		sizes: ['Small', 'Medium', 'Large'],
		image: cappuccino,
		quantity: 0
	},
	{
		id: 5,
		name: 'Macchiato',
		description: 'Espresso topped with a small amount of milk or foam.',
		price: 196, // 156.8 PHP
		sizes: ['Single', 'Double'],
		image: macchiato,
		quantity: 0
	},
	{
		id: 6,
		name: 'Mocha',
		description: 'A delightful mix of espresso, chocolate, and steamed milk.',
		price: 224, // 224 PHP
		sizes: ['Small', 'Medium', 'Large'],
		image: mocha,
		quantity: 0
	}
];

// load the data
export const load: PageLoad = () => {
	return {
		coffeeData
	};
};
