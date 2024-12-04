<script lang="ts">
	import { cart, fetchCart, type CartItem } from '$lib/stores/cart';
	import { onMount } from 'svelte';
	import { Trash, Pencil } from 'lucide-svelte';
	import Swal from 'sweetalert2';
	import message from '$lib/utils/message';
	import errorMessage from '$lib/utils/errorMessage';
	import axios from 'axios';
	import { CircleMinus, CirclePlus } from 'lucide-svelte';

	onMount(() => {
		if (!$cart || $cart) {
			fetchCart();
		}
	});

	let modifiedStates = new Map<string, boolean>();
	// function to delete to cart
	const removeCart = async (cartSelected: CartItem) => {
		// deconstruct the callback data
		const { name, quantity, price, _id, image } = cartSelected;
		const userConfirmation = Swal.fire({
			title: `Are you sure you want to delete ${name}?`,
			html: `<div class="flex flex-col text-lg">
					<span>Coffee: <b>${name}</b></span>
					<span>Quantity: <b>${quantity} ${quantity <= 1 ? 'pc' : 'pcs'}</b></span>
					<span>Total: <b>₱${price}</b></span>
				</div>`,
			imageUrl: image,
			imageWidth: 200,
			imageHeight: 200,
			imageAlt: name,
			showCancelButton: true,
			confirmButtonText: 'Yes',
			customClass: {
				popup: 'bg-white text-coffee rounded-lg',
				confirmButton: 'bg-coffee text-white',
				cancelButton: 'text-white'
			}
		});

		if ((await userConfirmation).isConfirmed) {
			try {
				const response = await axios.delete('/api/dashboard/cart/delete', {
					data: { item_id: _id },
					withCredentials: true
				});
				if (response.status === 200) {
					message(`Successfully Deleted ${name}`, 'success');
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
		<form class="mb-4 flex h-fit flex-col items-start gap-4 rounded-lg bg-white p-5 shadow-md">
			<img src={cartData.image} alt={cartData.name} class="aspect-square h-48" />
			<span>{cartData.name}</span>
			<div class="mt-2 flex w-full items-center gap-3">
				<button
					type="button"
					on:click={() => {
						cartData.quantity = Math.max(1, cartData.quantity - 1);
						if (cartData.quantity === 1) {
							modifiedStates.set(cartData._id!, false);
						}
						modifiedStates.set(cartData._id!, true);
					}}
					class={`rounded-full p-1 transition-all hover:bg-coffee hover:text-white ${cartData.quantity == 1 ? 'cursor-not-allowed' : 'cursor-pointer'}`}
				>
					<CircleMinus />
				</button>

				<input
					class=" text-xl outline-none"
					type="number"
					value={cartData.quantity}
					min="1"
					readonly
				/>

				<button
					type="button"
					on:click={() => {
						cartData.quantity += 1;
						modifiedStates.set(cartData._id!, true);
					}}
					class="rounded-full p-1 transition-all hover:bg-coffee hover:text-white"
				>
					<CirclePlus />
				</button>
			</div>

			<span>Price: ₱{cartData.price * cartData.quantity}</span>
			<div class="flex w-full items-center gap-4">
				{#if modifiedStates.get(cartData._id!)}
					<button class="flex gap-2 rounded-md bg-coffee p-2 text-white">Save <Pencil /></button>
				{/if}
				{#if cartData.quantity}
					<button class=" hidden gap-2 rounded-md bg-coffee p-2 text-white">Save <Pencil /></button>
				{/if}
				<button
					class="flex gap-2 rounded-md bg-red-500 p-2 text-white hover:bg-red-600"
					on:click={() => removeCart(cartData)}
					type="button">Delete<Trash /></button
				>
			</div>
		</form>
	{/each}
</main>
