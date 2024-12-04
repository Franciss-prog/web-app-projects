<script lang="ts">
	import { page } from '$app/stores';
	import errorMessage from '$lib/utils/errorMessage';
	import axios from 'axios';
	import type { Coffee } from './+page';
	import Swal from 'sweetalert2';
	import message from '$lib/utils/message';
	import { fetchCart } from '$lib/stores/cart';
	import { CircleMinus, CirclePlus } from 'lucide-svelte';
	const coffeeData = $page.data.coffeeData;

	const handleAddCart = async (coffee: Coffee) => {
		// Deconstruct the coffee object
		const { name, price, quantity, image } = coffee;

		// Validate quantity before making the request
		if (quantity === 0) {
			return errorMessage({
				message: 'Please select a quantity greater than zero.',
				icon: 'warning'
			});
		}

		// Prepare FormData for multipart/form-data request
		const formData = new FormData();
		formData.append('coffeeName', name);
		formData.append('coffeePrice', price.toString());
		formData.append('coffeeQuantity', quantity.toString());
		formData.append('coffeeImage', image); // Assuming `image` is a valid path or file.

		// Show confirmation dialog with SweetAlert
		const result = await Swal.fire({
			title: 'Add to Cart?',
			html: `<div class="flex flex-col text-lg">
					<span>Coffee: <b>${name}</b></span>
					<span>Quantity: <b>${quantity} ${quantity <= 1 ? "pc" : "pcs"}</b></span>
					<span>Total: <b>₱${price * quantity}</b></span>
				</div>`,
			imageUrl: image,
			imageWidth: 200,
			imageHeight: 200,
			imageAlt: name,
			showCancelButton: true,
			customClass: {
				popup: 'bg-white text-coffee rounded-lg',
				confirmButton: 'bg-coffee text-white',
				cancelButton: 'text-white'
			}
		});

		// If confirmed, send the request
		if (result.isConfirmed) {
			try {
				// Send FormData using Axios
				const response = await axios.post('/api/dashboard/cart/add', formData, {
					headers: { 'Content-Type': 'multipart/form-data' }
				});

				// Handle success
				if (response?.status === 200) {
					message(`${name} has been added to your cart!`, 'success');
					fetchCart(); // Refresh cart data
				}
			} catch (error) {
				// Handle errors
				if (axios.isAxiosError(error)) {
					errorMessage({ message: error.response?.data?.message || 'Failed to add to cart' });
				} else {
					console.error('Unexpected error:', error);
					errorMessage({ message: 'An unexpected error occurred' });
				}
			}
		}
	};
</script>

<main class="grid grid-cols-2 gap-7 text-coffee">
	{#each coffeeData as coffee (coffee.id)}
		<div class="mb-4 flex flex-col items-start rounded-lg bg-white p-5 shadow-md">
			<img src={coffee.image} alt={coffee.name} class="aspect-square h-32" />

			<div class="text-xl font-semibold">{coffee.name}</div>
			<div class="text-lg">₱{coffee.price}</div>

			<div class="mt-2 flex items-center gap-3">
				<button
					type="button"
					on:click={() => (coffee.quantity = Math.max(0, coffee.quantity - 1))}
					class="rounded-full p-1 hover:bg-coffee hover:text-white transition-all"
				>
					<CircleMinus />
				</button>

				<span class="text-xl">{coffee.quantity}</span>

				<button
					type="button"
					on:click={() => (coffee.quantity = coffee.quantity + 1)}
					class="rounded-full p-1 hover:bg-coffee hover:text-white transition-all"
				>
					<CirclePlus />
				</button>
			</div>

			<button
				type="button"
				class="mt-4 rounded-md bg-coffee px-4 py-2 text-white"
				on:click={() => handleAddCart(coffee)}
			>
				Add to Cart
			</button>
		</div>
	{/each}
</main>
