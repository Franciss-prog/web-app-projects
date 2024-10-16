<script>
	import Footer from '../../components/Footer.svelte';
import Navbar from '../../components/Navbar.svelte';
</script>

<main class="text-white ">
	<Navbar />
	<slot />
    <Footer/>
</main>
