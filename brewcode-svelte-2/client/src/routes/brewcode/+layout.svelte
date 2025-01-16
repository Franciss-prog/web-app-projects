<script lang="ts">
	import VerticalNavbar from '$lib/components/dashboard/VerticalNavbar.svelte';
	import HorizontalNavbar from '$lib/components/dashboard/HorizontalNavbar.svelte';
	import { navWidth } from '$lib/utils/ui/widthUtils'; // w-32
	let { children } = $props();
</script>

<main class="flex h-screen flex-1">
	<VerticalNavbar />
	<div class={`${navWidth.replace('w-', 'ml-')} flex-col px-20 py-10 flex-1`}>
		<HorizontalNavbar />
		{@render children()}
	</div>
</main>
