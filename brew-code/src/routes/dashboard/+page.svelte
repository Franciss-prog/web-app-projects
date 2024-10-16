<script>
	import errorMessage from '$lib/errorMessage';
	import axios from 'axios';

	const logout = async () => {
		try {
			const response = await axios.post('/api/logout');
			if (response.status === 200) {
				window.location.href = '/login';
			}
		} catch (error) {
			if (axios.isAxiosError(error)) {
				if (error.response) {
					errorMessage(error.response.data.message);
				}
			}
		}
	};
</script>

<main>
	Dashboard Page
	<button on:click={logout}>Logout</button>
</main>
