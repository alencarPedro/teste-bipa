<script lang="ts">
	import { createEventDispatcher, onMount } from 'svelte';

	export let message: string;
	export let type: 'success' | 'error' | 'info' = 'success';
	export let duration = 3000;

	const dispatch = createEventDispatcher<{ dismiss: void }>();
	let visible = false;
	let timer: ReturnType<typeof setTimeout>;

	onMount(() => {
		visible = true;
		timer = setTimeout(() => {
			close();
		}, duration);

		return () => {
			clearTimeout(timer);
		};
	});

	function close() {
		visible = false;
		setTimeout(() => {
			dispatch('dismiss');
		}, 300); // Wait for transition to complete
	}
</script>

<div
	class="flex items-center rounded-lg px-4 py-3 shadow-lg transition-all duration-300 {visible
		? 'translate-y-0 opacity-100'
		: 'translate-y-4 opacity-0'} {type === 'success'
		? 'bg-green-800 text-green-100'
		: type === 'error'
			? 'bg-red-800 text-red-100'
			: 'bg-blue-800 text-blue-100'}"
>
	{#if type === 'success'}
		<svg
			xmlns="http://www.w3.org/2000/svg"
			class="mr-2 h-5 w-5 text-green-400"
			viewBox="0 0 20 20"
			fill="currentColor"
		>
			<path
				fill-rule="evenodd"
				d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
				clip-rule="evenodd"
			/>
		</svg>
	{:else if type === 'error'}
		<svg
			xmlns="http://www.w3.org/2000/svg"
			class="mr-2 h-5 w-5 text-red-400"
			viewBox="0 0 20 20"
			fill="currentColor"
		>
			<path
				fill-rule="evenodd"
				d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
				clip-rule="evenodd"
			/>
		</svg>
	{:else}
		<svg
			xmlns="http://www.w3.org/2000/svg"
			class="mr-2 h-5 w-5 text-blue-400"
			viewBox="0 0 20 20"
			fill="currentColor"
		>
			<path
				fill-rule="evenodd"
				d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
				clip-rule="evenodd"
			/>
		</svg>
	{/if}
	<p>{message}</p>
	<button
		class="ml-4 rounded p-1 transition-colors hover:bg-black/20"
		on:click={close}
		aria-label="Close notification"
	>
		<svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
			<path
				fill-rule="evenodd"
				d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
				clip-rule="evenodd"
			/>
		</svg>
	</button>
</div>
