<script lang="ts">
	import { onMount } from 'svelte';
	import type { NodeProps } from '$lib/types.js';
	import { paginate } from '$lib/helpers.js';
	import Table from '$lib/components/Table.svelte';
	import Pagination from '$lib/components/Pagination.svelte';
	import { toasts } from '$lib/stores/toasts.js';
	import { invalidate } from '$app/navigation';

	export let data: { nodes: NodeProps[] };

	let nodes = [] as NodeProps[];
	let allNodes = [] as NodeProps[];
	let currentPage = 0;
	let itemsPerPage = 10;
	let totalPages = 0;
	let isLoading = true;
	let isRefreshing = false;

	let error: string | null = null;

	const nextPage = () => {
		if (currentPage < totalPages - 1) {
			currentPage++;
			nodes = paginate(allNodes, currentPage, itemsPerPage);
		}
	};

	const prevPage = () => {
		if (currentPage > 0) {
			currentPage--;
			nodes = paginate(allNodes, currentPage, itemsPerPage);
		}
	};

	const goToPage = (page: number) => {
		currentPage = page;
		nodes = paginate(allNodes, currentPage, itemsPerPage);
	};

	const refreshData = async () => {
		if (isRefreshing) return;

		isRefreshing = true;
		try {
			// Use SvelteKit's invalidate function to re-run the load function
			await invalidate('app:nodes');

			// Once invalidated, the new data should be in the data prop
			allNodes = data.nodes;
			totalPages = Math.ceil(allNodes.length / itemsPerPage);
			nodes = paginate(allNodes, currentPage, itemsPerPage);

			toasts.success('Data refreshed successfully');
		} catch (err) {
			console.error('Failed to refresh data:', err);
			toasts.error('Failed to refresh data');
		} finally {
			isRefreshing = false;
		}
	};

	const retryFetch = async () => {
		isLoading = true;
		error = null;
		try {
			allNodes = await data.nodes;
			totalPages = Math.ceil(allNodes.length / itemsPerPage);
			nodes = paginate(allNodes, currentPage, itemsPerPage);
		} catch (err) {
			console.error('Failed to fetch nodes:', err);
			error = err instanceof Error ? err.message : 'Failed to fetch nodes data';
		} finally {
			isLoading = false;
		}
	};

	onMount(async () => {
		try {
			allNodes = await data.nodes;
			totalPages = Math.ceil(allNodes.length / itemsPerPage);
			nodes = paginate(allNodes, currentPage, itemsPerPage);
		} catch (err) {
			console.error('Failed to fetch nodes:', err);
			error = err instanceof Error ? err.message : 'Failed to fetch nodes data';
		} finally {
			isLoading = false;
		}
	});
</script>

<div class="min-h-screen bg-gradient-to-b from-gray-900 to-gray-800 text-white">
	<div class="container mx-auto max-w-7xl px-4 py-8">
		<header class="mb-8 flex items-end justify-between">
			<div>
				<h1
					class="mb-2 bg-gradient-to-l from-purple-400 via-pink-500 to-blue-600 bg-clip-text text-3xl font-bold text-transparent"
				>
					Lightning Network Nodes
				</h1>
				<p class="text-gray-400">Top lightning network nodes ranked by connectivity</p>
			</div>

			<button
				on:click={refreshData}
				class="flex items-center rounded-md bg-blue-600 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-blue-700 disabled:opacity-50"
				disabled={isLoading || isRefreshing}
			>
				<svg
					class="mr-2 h-4 w-4 {isRefreshing ? 'animate-spin' : ''}"
					xmlns="http://www.w3.org/2000/svg"
					fill="none"
					viewBox="0 0 24 24"
					stroke="currentColor"
				>
					<path
						stroke-linecap="round"
						stroke-linejoin="round"
						stroke-width="2"
						d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
					/>
				</svg>
				{isRefreshing ? 'Refreshing...' : 'Refresh Data'}
			</button>
		</header>

		{#if isLoading}
			<div class="flex justify-center py-20">
				<div
					class="h-12 w-12 animate-spin rounded-full border-4 border-orange-500 border-t-transparent"
				></div>
			</div>
		{:else if error}
			<div class="rounded-lg bg-red-900/30 p-6 text-center">
				<svg
					xmlns="http://www.w3.org/2000/svg"
					class="mx-auto h-12 w-12 text-red-400"
					fill="none"
					viewBox="0 0 24 24"
					stroke="currentColor"
				>
					<path
						stroke-linecap="round"
						stroke-linejoin="round"
						stroke-width="2"
						d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
					/>
				</svg>
				<h3 class="mt-3 text-lg font-medium text-red-100">Error Loading Data</h3>
				<p class="mt-2 text-red-200">{error}</p>
				<button
					on:click={retryFetch}
					class="mt-4 rounded-md bg-red-700 px-4 py-2 font-medium text-white transition-colors hover:bg-red-600"
				>
					Retry
				</button>
			</div>
		{:else}
			<Table {nodes} />
			<Pagination
				{currentPage}
				{totalPages}
				{itemsPerPage}
				allNodesLength={allNodes.length}
				{goToPage}
				{prevPage}
				{nextPage}
			/>
		{/if}
	</div>
</div>
