<script lang="ts">
	import { page } from '$app/stores';
	import errorMessage from '$lib/utils/errorMessage';
	import axios from 'axios';
	import type { Coffee } from './+page';
	import Swal from 'sweetalert2';
	import message from '$lib/utils/message';
	import { fetchCart } from '$lib/stores/cart';
	const coffeeData = $page.data.coffeeData;

	const handleAddCart = async (coffee: Coffee) => {
		const coffeeName = coffee.name;
		const coffeePrice = coffee.price;
		const coffeeQuantity = coffee.quantity;

		// quantity validation (make this more secure) | this validation is optional
		if (coffeeQuantity <= 0) {
			return errorMessage({
				message: 'Make sure the quantity is greater than zero',
				icon: 'question'
			});
		}

		// post the data;

		// use SweetAlert
		Swal.fire({
			title: 'Are you sure you want to add to Cart?',
			html: `<div class="flex flex-col text-2xl">
					<span>Coffee: ${coffeeName}</span>
					<span>Quantity: ${coffeeQuantity} pcs</span>
					<span> Total: ₱${coffeePrice * coffeeQuantity}</span>
			</div>`,
			imageUrl: coffee.image,
			customClass: {
				popup: 'bg-white text-coffee rounded-2xl',
				icon: 'text-coffee',
				confirmButton: 'bg-coffee text-white'
			},
			imageWidth: 200,
			imageHeight: 200,
			imageAlt: coffee.name,
			showCancelButton: true
		}).then((result) => {
			if (result.isConfirmed) {
				axios
					.post(
						'/api/dashboard/cart/add',
						{
							coffeeName,
							coffeePrice,
							coffeeQuantity
						},
						{ headers: { 'Content-Type': 'multipart/form-data' } }
					)
					.then((response?) => {
						if (response?.status === 200) {
							message(`${coffee.name} successfully added to Cart..`, 'success');
							fetchCart();
						}
					})
					.catch((error) => {
						//if axios has error
						if (axios.isAxiosError(error)) {
							errorMessage({ message: error.response?.data.message });
						}
					});
			}
		});
	};
</script>

<main class="grid grid-cols-2 gap-7 text-coffee">
	{#each coffeeData as coffee (coffee.id)}
		<form
			class="mb-4 flex flex-col items-start rounded-lg bg-white p-5 shadow-md"
			method="POST"
			on:submit|preventDefault={() => handleAddCart(coffee)}
		>
			<img src={coffee.image} alt={coffee.name} class="aspect-square h-32" />

			<input
				type="text"
				readonly
				value={coffee.name}
				class="text-xl outline-none"
				name="coffeeName"
			/>
			<input
				type="text"
				readonly
				value={`₱${coffee.price}`}
				class="text-xl outline-none"
				name="coffeePrice"
			/>
			<input
				type="number"
				name="coffeeQuantity"
				placeholder="1"
				min="1"
				max="5"
				bind:value={coffee.quantity}
				required
				class="mb-4 mt-2 w-16 rounded border-2 border-[#C2A377] bg-[#F7F4F0] px-2 py-1 text-center text-coffee focus:border-[#8B5E34] focus:outline-none focus:ring-2 focus:ring-[#8B5E34]/30"
			/>
			<button class="rounded-md bg-coffee p-2 text-white"> Add to Cart </button>
		</form>
	{/each}
</main>
