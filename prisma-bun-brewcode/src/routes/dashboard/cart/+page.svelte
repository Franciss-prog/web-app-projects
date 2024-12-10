<script lang="ts">
	import { cart, fetchCart, removeCart, updateCart } from '$lib/stores/cart';
	import { onMount } from 'svelte';
	import { Trash, Pencil } from 'lucide-svelte';
	import { CircleMinus, CirclePlus } from 'lucide-svelte';

	export let modifiedStates = new Map<string, boolean>(); // Track if an item has been modified
	export let originalQuantities = new Map<string, number>(); // Store original quantities

	// Fetch cart data on mount
	onMount(async() => {
		await fetchCart();
		$cart.forEach((item) => {
			originalQuantities.set(item._id!, item.quantity);
			modifiedStates.set(item._id!, false);
		});
	});

	// Update modified state when quantity changes
	const updateModifiedState = (id: string, newQuantity: number) => {
		const originalQuantity = originalQuantities.get(id) ?? 1;
		modifiedStates.set(id, originalQuantity !== newQuantity);
	};
</script>

<main class="min-h-auto grid h-1/2 grid-cols-3 gap-7 text-coffee">
	{#each $cart as cartData (cartData._id)}
		<form class="mb-4 flex flex-col items-start gap-4 rounded-lg bg-white p-5 shadow-md w-full">
			<img src={cartData.image} alt={cartData.name} class="aspect-square h-48" />
			<span>{cartData.name}</span>
			<section class="flex items-center justify-between gap-2">
				<!-- Minus Button -->
				<button
					type="button"
					on:click={() => {
						cartData.quantity = Math.max(1, cartData.quantity - 1);
						updateModifiedState(cartData._id!, cartData.quantity);
					}}
					class={`rounded-full p-1 transition-all hover:bg-coffee hover:text-white ${cartData.quantity == 1 ? 'cursor-not-allowed hover:bg-white hover:text-coffee transition-none' : 'cursor-pointer'}`}
				>
					<CircleMinus />
				</button>

				<!-- Quantity Input -->
				<input
					class="w-12 text-center text-xl outline-none"
					type="number"
					bind:value={cartData.quantity}
					min="1"
					readonly
				/>

				<!-- Add Button -->
				<button
					type="button"
					on:click={() => {
						cartData.quantity += 1;
						updateModifiedState(cartData._id!, cartData.quantity);
					}}
					class="rounded-full p-1 transition-all hover:bg-coffee hover:text-white"
				>
					<CirclePlus />
				</button>
			</section>

			<span>Price: ₱{cartData.price * cartData.quantity}</span>
			<div class="flex w-full items-center gap-4">
				{#if modifiedStates.get(cartData._id!)}
					<button
						class="flex gap-2 rounded-md bg-coffee p-2 text-white"
						on:click={() => {
							updateCart(cartData);
						}}>Save <Pencil /></button>
				{/if}
				<button
					class="flex gap-2 rounded-md bg-red-500 p-2 text-white hover:bg-red-600"
					on:click={() => removeCart(cartData, modifiedStates, originalQuantities)}
					type="button">Delete<Trash /></button>
			</div>
		</form>
	{/each}
</main>
