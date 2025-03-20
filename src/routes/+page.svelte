<script lang="ts">
	import { onMount } from 'svelte';
	import type { NodeProps } from '$lib/types.js';
	import { paginate } from '$lib/helpers.js';
	import Table from '$lib/components/Table.svelte';
	import Pagination from '$lib/components/Pagination.svelte';

	export let data: { nodes: NodeProps[] };

	let nodes = [] as NodeProps[];
	let allNodes = [] as NodeProps[];
	let currentPage = 0;
	let itemsPerPage = 10;
	let totalPages = 0;
	let isLoading = true;
	let expandedNodeIndex: number | null = null;

	const nextPage = () => {
		if (currentPage < totalPages - 1) {
			currentPage++;
			nodes = paginate(allNodes, currentPage, itemsPerPage);
			expandedNodeIndex = null;
		}
	};

	const prevPage = () => {
		if (currentPage > 0) {
			currentPage--;
			nodes = paginate(allNodes, currentPage, itemsPerPage);
			expandedNodeIndex = null;
		}
	};

	const goToPage = (page: number) => {
		currentPage = page;
		nodes = paginate(allNodes, currentPage, itemsPerPage);
		expandedNodeIndex = null;
	};

	onMount(async () => {
		try {
			allNodes = await data.nodes;
			totalPages = Math.ceil(allNodes.length / itemsPerPage);
			nodes = paginate(allNodes, currentPage, itemsPerPage);
		} catch (error) {
			console.error('Failed to fetch nodes:', error);
		} finally {
			isLoading = false;
		}
	});
</script>

<div class="min-h-screen bg-gradient-to-b from-gray-900 to-gray-800 text-white">
	<div class="container mx-auto max-w-7xl px-4 py-8">
		<header class="mb-8">
			<h1
				class="mb-2 bg-gradient-to-l from-purple-400 via-pink-500 to-blue-600 bg-clip-text text-3xl font-bold text-transparent"
			>
				Lightning Network Nodes
			</h1>
			<p class="text-gray-400">Top lightning network nodes ranked by connectivity</p>
		</header>

		{#if isLoading}
			<div class="flex justify-center py-20">
				<div
					class="h-12 w-12 animate-spin rounded-full border-4 border-orange-500 border-t-transparent"
				></div>
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
