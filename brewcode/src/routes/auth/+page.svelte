<script>
	const imageURL =
		'https://static.vecteezy.com/system/resources/previews/026/771/391/large_2x/minimalist-coffee-background-free-photo.jpeg';

	import { Instagram, Facebook, Github } from 'lucide-svelte';
	import { hoverUtils } from '$lib/hoverUtils';
	const socmedInfo = [
		{ id: 1, name: 'Instagram', icon: Instagram, url: '' },
		{ id: 2, name: 'Facebook', icon: Facebook, url: '' },
		{ id: 1, name: 'Github', icon: Github, url: '' }
	];
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
			<form class="flex flex-col gap-5 items-center justify-between py-2">
				<span class="text-5xl tracking-wider font-bold">LOGIN</span>
				<div class="flex flex-col gap-8">
					<input
						type="email"
						class="bg-transparent border-b-2 border-white focus:border-white focus:outline-none p-2 placeholder:text-gray-300 w-full"
						placeholder="Enter your email"
					/>
					<input
						type="password"
						class="bg-transparent border-b-2 border-white focus:border-white focus:outline-none p-2 placeholder:text-gray-300 w-full"
						placeholder="Enter your password"
					/>
					<button class={`${hoverUtils} border p-2`}>Login</button>
				</div>
				<div class="flex flex-col gap-4 w-full">
					<span>Contact me: </span>
					<div class="flex justify-between items-center">
						{#each socmedInfo as socmed (socmed.id)}
							<a href={socmed.url} target="_blank" class={hoverUtils}>
								<!-- Render the icon dynamically -->
								<svelte:component this={socmed.icon} size={36} />
							</a>
						{/each}
					</div>
				</div>
			</form>
		</div>
	</div>
</section>
