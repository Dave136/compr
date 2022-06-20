<script lang="ts" context="module">
	import type { Load } from '@sveltejs/kit';

	export const load: Load = async ({ fetch }) => {
		const url = 'http://localhost:3001/api/v1/';
		const response = await fetch(url);
		const data = await response.json();

		return {
			status: 200,
			props: {
				message: data.message
			}
		};
	};
</script>

<script lang="ts">
	export let message: string;
</script>

<h1>Welcome to SvelteKit</h1>
<p>Visit <a href="https://kit.svelte.dev">kit.svelte.dev</a> to read the documentation</p>
<p>Message from backend: {message}</p>
