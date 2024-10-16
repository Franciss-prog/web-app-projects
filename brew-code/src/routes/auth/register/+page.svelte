<script lang="ts">
	import { hoverUtils } from '$lib/hoverUtils';
	import errorMessage from '$lib/errorMessage';
	import successMessage from '$lib/successMessage';
	const imageURL =
		'https://static.vecteezy.com/system/resources/previews/026/771/391/large_2x/minimalist-coffee-background-free-photo.jpeg';
	import { Eye, EyeOff } from 'lucide-svelte';
	import axios from 'axios';

	let username = '';
	let email = '';
	let password = '';
	let confirmPassword = '';
	// ui handling
	let showPassword = false;
	let loading = false;
	let showConfirmPassword = false;
	// function to submit the data
	const onRegister = async (e: Event) => {
		loading = true;

		// form validation
		if (!email || !password || !username) {
			errorMessage('Please fill in all fields', loading, 1200, password);
		}
		// password length validation
		if (password.length <= 8) {
			errorMessage('Your password must be at least 8 characters long.', loading, 1200, password);
		}
		// validation of two input passwords is same value
		if (password !== confirmPassword) {
			errorMessage('Password not match', loading, 1200, confirmPassword);
		}
		// try to post the data fro server and let the server handle the data
		try {
			const formData = new FormData(e.target as HTMLFormElement);
			const response = await axios.post('/api/auth/register', formData);
			console.log(response.data);
			if (response.status === 201) {
				// success Response
				successMessage(response.data.message);
				username = '';
				email = '';
				password = '';
				confirmPassword = '';
			}
			return;
		} catch (error) {
			if (axios.isAxiosError(error) && error.response) {
				errorMessage(error.response.data.message);
			} else {
				// for network error
				errorMessage('Check yout connection');
			}
		} finally {
			loading = false;
		}
	};
</script>

<section class="h-[90vh] overflow-hidden flex justify-center items-center bg-coffee">
	<!-- container -->
	<div class="border border-white w-[800px] h-auto flex flex-row rounded-3xl">
		<img src={imageURL} alt="coffee for login" class="aspect-[9/16] h-full rounded-l-3xl w-[40%]" />
		<div class="flex justify-center w-[60%] pt-10">
			<!-- form submit -->
			<form
				class="flex flex-col gap-5 items-center justify-between py-2"
				on:submit|preventDefault={onRegister}
			>
				<span class="text-5xl tracking-wider font-bold">Register</span>
				<div class="flex flex-col gap-8">
					<input
						type="text"
						class={`bg-transparent border-b-2 bordr-white focus:border-white focus:outline-none p-2 placeholder:text-gray-300 w-full`}
						placeholder="Enter your username"
						name="username"
						autocomplete="off"
						bind:value={username}
						required
					/><input
						type="email"
						class={`bg-transparent border-b-2 border-white focus:border-white focus:outline-none p-2 placeholder:text-gray-300 w-full`}
						placeholder="Enter your email"
						name="email"
						autocomplete="off"
						bind:value={email}
						required
					/>
					<div class="w-full relative">
						{#if showPassword}
							<input
								type="text"
								name="confirm"
								class={`bg-transparent border-b-2 border-white focus:border-white focus:outline-none p-2 placeholder:text-gray-300 w-full`}
								placeholder="Enter your password"
								bind:value={password}
								required
							/>
							<button on:click={() => (showPassword = !showPassword)} class="absolute right-2 top-2"
								><Eye /></button
							>
						{:else}
							<input
								type="password"
								name="confirm"
								class={`bg-transparent border-b-2 border-white focus:border-white focus:outline-none p-2 placeholder:text-gray-300 w-full`}
								placeholder="Enter your password"
								bind:value={password}
								required
							/>
							<button on:click={() => (showPassword = !showPassword)} class="absolute right-2 top-2"
								><EyeOff /></button
							>
						{/if}
					</div>
					<div class="w-full relative">
						{#if showConfirmPassword}
							<input
								type="text"
								name="password"
								class={`bg-transparent border-b-2 border-white focus:border-white focus:outline-none p-2 placeholder:text-gray-300 w-full`}
								placeholder="Confirm your password"
								bind:value={confirmPassword}
								required
							/>
							<button
								on:click={() => (showConfirmPassword = !showConfirmPassword)}
								class="absolute right-2 top-2"><Eye /></button
							>
						{:else}
							<input
								type="password"
								name="password"
								class={`bg-transparent border-b-2 border-white focus:border-white focus:outline-none p-2 placeholder:text-gray-300 w-full`}
								placeholder="Confirm your password"
								bind:value={confirmPassword}
								required
							/>
							<button
								on:click={() => (showConfirmPassword = !showConfirmPassword)}
								class="absolute right-2 top-2"><EyeOff /></button
							>
						{/if}
					</div>
					<button class={`${hoverUtils} border p-2`} disabled={loading}>
						{#if loading}
							<div
								role="status"
								class="inline-block h-5 w-5 mr-2 animate-spin rounded-full border-2 border-solid border-current border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]"
							></div>
						{:else}
							<span>Register</span>
						{/if}
					</button>
					<span>Already Have an Account? <a href="/auth" class="underline">Login Here</a> </span>
				</div>
				<div></div>
			</form>
		</div>
	</div>
</section>
