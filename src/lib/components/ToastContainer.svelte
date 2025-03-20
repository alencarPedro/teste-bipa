<script lang="ts">
	import Toast from './Toast.svelte';
	import { toasts, type Toast as ToastType } from '../stores/toasts.js';
</script>

<div class="fixed right-4 bottom-4 z-50 flex flex-col items-end space-y-2">
	{#each $toasts as toast (toast.id)}
		<Toast
			message={toast.message}
			type={toast.type}
			duration={toast.duration}
			on:dismiss={() => toasts.remove(toast.id)}
		/>
	{/each}
</div>
