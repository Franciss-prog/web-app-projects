<script>
	import { AlignLeft, Coffee } from 'lucide-svelte';
	let toggleNav = false;
</script>

<nav class="max-w-full flex justify-between items-center px-20 py-10 bg-coffee">
	<a href="/" class="text-6xl font-bold"><Coffee /></a>
	<div class="flex flex-col gap-3 items-end relative">
		<button
			class=" border border-white rounded-md p-1 w-fit hover:bg-white hover:text-[#6F4E37] outline-none transition-all"
			on:click={() => (toggleNav = !toggleNav)}><AlignLeft /></button
		>
		<div
			class={`${toggleNav ? 'block' : 'hidden'} absolute top-12 border border-white px-4 py-2 flex flex-col gap-4`}
		>
			<a href="/auth">Login</a>
			<a href="/auth/register">Register</a>
		</div>
	</div>
</nav>
