<script lang="ts">
	import '../app.css';
	import ToastContainer from '$lib/components/ToastContainer.svelte';
	let { children } = $props();
</script>

{@render children()}
<ToastContainer />
