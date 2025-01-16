<script lang="ts">
	import { navWidth } from '$lib/utils/ui/widthUtils';
	import { Coffee, LogOut } from 'lucide-svelte';
	import { page } from '$app/stores';
	import { onLogout } from '$lib/utils/actions/logout';
	import { signOut } from '@auth/sveltekit/client';
	$: isJWT = !$page.data.session ? true : false;
	console.log(isJWT);
</script>

<!-- Sidebar -->
<nav
	class={`fixed left-0 top-0 h-full ${navWidth} flex flex-col items-center justify-between bg-gray-200 py-10 text-foreground`}
>
	<!-- Sidebar Content -->
	<section class="flex w-full flex-col items-center gap-20">
		<!-- logo -->
		<a href="/brewcode"><Coffee /></a>
		<div
			class="flex w-full flex-col items-center gap-7 text-white
"
		>
			{#each $page.data.navItems as { label: IconComponent, href }}
				<a
					{href}
					class="rounded-lg p-4 text-obsidian transition-all hover:bg-obsidian hover:text-white"
					class:text-white={$page.url.pathname === href}
					class:bg-obsidian={$page.url.pathname === href}
				>
					<IconComponent />
				</a>
			{/each}
		</div>
	</section>
	<button
		class="rounded-lg bg-obsidian p-4 text-softMist"
		on:click={() => (isJWT ? onLogout() : signOut())}><LogOut /></button
	>
</nav>
