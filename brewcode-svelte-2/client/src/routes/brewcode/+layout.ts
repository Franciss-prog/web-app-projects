import type { LayoutLoad } from './$types';
import { Coffee, Home, Settings, ShoppingBasket } from 'lucide-svelte';
export const load: LayoutLoad = async ({ parent }) => {
	await parent();

	const navItems = [
		{ id: 1, href: '/brewcode', label: Home },
		{ id: 2, href: '/brewcode/coffee', label: Coffee },
		{ id: 3, href: '/brewcode/cart', label: ShoppingBasket },
		{ id: 4, href: '/brewcode/settings', label: Settings }
	];
	return { navItems };
};
