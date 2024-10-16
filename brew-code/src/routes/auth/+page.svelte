<script lang="ts">
	import { hoverUtils } from '$lib/hoverUtils';
	import errorMessage from '$lib/errorMessage';
	import axios, { AxiosError } from 'axios';
	import successMessage from '$lib/successMessage';
	import { Eye, EyeOff } from 'lucide-svelte';
	// data loads
	const imageURL =
		'https://static.vecteezy.com/system/resources/previews/026/771/391/large_2x/minimalist-coffee-background-free-photo.jpeg';

	let emailorUsername = '';
	let password = '';
	let loading = false;
	let showPassword = false;

	// Function to check if the input is a valid email format
	const isValidEmail = (input: string) => {
		const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
		return emailRegex.test(input);
	};

	// function to submit the data
	const onLogin = async (e: Event) => {
		e.preventDefault();
		loading = true;
		// get the target

		// form validation
		if (!emailorUsername || !password) {
			errorMessage('Please fill in all fields', loading, 1200, password);
		}

		// try to post the data fro server and let the server handle the data
		const formData = new FormData();

		const isValid = isValidEmail(emailorUsername);

		if (!isValid) {
			formData.append('username', emailorUsername);
		} else {
			formData.append('email', emailorUsername);
		}

		formData.append('password', password);
		try {
			const response = await axios.post('/api/auth', formData);
			if (response.status === 201 || response.status === 200) {
				// success if the user is fully authenticated
				console.log(response.data);

				successMessage(response.data.message);
				emailorUsername = '';
				password = '';
				setTimeout(() => (window.location.href = '/dashboard'), 1200);
			}
			return;
		} catch (error) {
			if (axios.isAxiosError(error)) {
				if (error.response) {
					errorMessage(error.response.data.message);
				} else {
					errorMessage('An error Occured please try again');
				}
			}
			// for network response error
			else {
				errorMessage('A non-Axios error occurred');
			}
		} finally {
			loading = false;
		}
	};
</script>

<section class="h-[90vh] overflow-hidden flex justify-center items-center bg-coffee">
	<!-- container -->
	<div class="border border-white w-[800px] h-auto flex flex-row rounded-3xl">
		<img
			src={imageURL}
			alt="coffee for login"
			class="aspect-[9/16] h-[500px] rounded-l-3xl w-[40%]"
		/>
		<div class="flex justify-center w-[60%] py-10">
			<!-- form submit -->
			<form
				class="flex flex-col gap-5 items-center justify-between py-2"
				on:submit|preventDefault={onLogin}
			>
				<span class="text-5xl tracking-wider font-bold">LOGIN</span>
				<div class="flex flex-col gap-8">
					<input
						type="text"
						class={`bg-transparent border-b-2 border-white focus:border-white focus:outline-none p-2 placeholder:text-gray-300 w-full`}
						placeholder="Enter your email/username"
						name="email"
						autocomplete="off"
						bind:value={emailorUsername}
						required
					/>
					<div class="w-full relative">
						{#if showPassword}
							<input
								type="text"
								autocomplete="off"
								name="password"
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
								name="password"
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
					<button class={`${hoverUtils} border p-2`} disabled={loading}>
						{#if loading}
							<div
								role="status"
								class="inline-block h-5 w-5 mr-2 animate-spin rounded-full border-2 border-solid border-current border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]"
							></div>
						{:else}
							<span>Login</span>
						{/if}
					</button>
					<!-- doesnt have account url -->
					<span
						>Doesn't Have an Account? <a href="/auth/register" class="underline">Register Here</a>
					</span>
				</div>
				<div></div>
			</form>
		</div>
	</div>
</section>
