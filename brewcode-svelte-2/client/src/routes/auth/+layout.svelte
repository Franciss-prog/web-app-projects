<script lang="ts">
	import AuthNavbar from '$lib/components/auth/AuthNavbar.svelte';

	let { children } = $props();
</script>

<main class="bg-background">
	<AuthNavbar />
	{@render children()}
</main>
