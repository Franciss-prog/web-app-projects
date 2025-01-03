<script lang="ts">
	import '../app.css';
	let { children } = $props();
</script>

<main class="outline-none">
	{@render children()}
</main>
