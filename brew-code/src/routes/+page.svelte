<script>
	import { Dot } from 'lucide-svelte';
	import Navbar from '../components/Navbar.svelte';
	
</script>

<!-- root entry -->
<section class="h-[100vh] bg-[#6F4E37] overflow-hidden text-white">
	<!-- Enforce 100vh and prevent scrolling -->
	<Navbar />
	<div class="flex items-center justify-center h-[85vh] px-32 gap-20">
		<!-- Exact 92vh for content -->
		<div class="flex flex-col gap-5">
			<div class="flex flex-col gap-0 cursor-default">
				<span class="text-[120px] font-bold">Brewcode</span>
				<span class="text-4xl font-bold">Code Better, Brew Stronger.</span>
			</div>
			<a
				href="/auth"
				class="tracking-widest border border-white px-3 py-2 flex items-center rounded-3xl w-fit"
			>
				Let's Buy Some Coffee!
				<Dot />
			</a>
		</div>
		<img
			src="https://static.vecteezy.com/system/resources/previews/029/283/233/non_2x/coffee-coffee-coffee-clipart-transparent-background-ai-generative-free-png.png"
			alt="coffee"
			class="h-[520px]"
		/>
	</div>
</section>
