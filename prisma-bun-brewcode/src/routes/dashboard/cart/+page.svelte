<script lang="ts">
	import espresso from '../../../images/espresso.png';
	import americano from '../../../images/americano.png';
	import latte from '../../../images/latte.png';
	import cappuccino from '../../../images/cappuccino.png';
	import macchiato from '../../../images/macchiato.png';
	import mocha from '../../../images/mocha-coffee.png';
	import { cart, fetchCart, type CartItem } from '$lib/stores/cart';
	import { onMount } from 'svelte';
	import { Trash, Pencil } from 'lucide-svelte';
	import Swal from 'sweetalert2';
	import message from '$lib/utils/message';
	import errorMessage from '$lib/utils/errorMessage';
	import axios from 'axios';

	const images = { espresso, americano, latte, cappuccino, macchiato, mocha };

	onMount(() => {
		if (!$cart || $cart) {
			fetchCart();
		}
	});

	// function to delete to cart
	const removeCart = async (cartSelected: CartItem) => {
		const userConfirmation = Swal.fire({
			title: `Are you sure you want to delete ${cartSelected.name}?`,
			html: `<div class="flex flex-col text-2xl">
					<span>Quantity: ${cartSelected.quantity} pcs</span>
					<span> Price: ₱${cartSelected.price}</span>
			</div>`
		});

		if ((await userConfirmation).isConfirmed) {
			try {
				const response = await axios.delete('/api/dashboard/cart/delete', {
					data: { item_id: cartSelected._id },
					withCredentials: true
				});
				if (response.status === 200) {
					message(`Successfully Deleted ${cartSelected.name}`, 'success');
					await fetchCart();
				}
			} catch (error) {
				if (axios.isAxiosError(error)) {
					errorMessage({ message: error.response?.data.message, icon: 'error' });
				}
			}
		}
	};
</script>

<main class="min-h-auto grid h-screen grid-cols-3 gap-7 text-coffee">
	{#each $cart as cartData (cartData._id)}
		<form class="mb-4 flex flex-col items-start gap-4 rounded-lg bg-white p-5 shadow-md">
			<img
				src={images[cartData.name?.toLowerCase()]}
				alt={cartData.name}
				class="aspect-square h-48"
			/>
			<span>{cartData.name}</span>
			{#if cartData.quantity > 1}
				<span>Quantity: {cartData.quantity} pcs</span>
			{:else}
				<span>Quantity: {cartData.quantity} pc</span>
			{/if}

			<span>Price: ₱{cartData.price}</span>
			<div class="flex w-full items-center gap-4">
				<button class="flex gap-2 rounded-md bg-coffee p-2 text-white">Edit <Pencil /></button>
				<button
					class="flex gap-2 rounded-md bg-red-500 p-2 text-white hover:bg-red-600"
					on:click={() => removeCart(cartData)}
					type="button">Delete<Trash /></button
				>
			</div>
		</form>
	{/each}
</main>
