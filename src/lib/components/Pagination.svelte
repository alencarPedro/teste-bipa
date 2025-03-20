<script lang="ts">
	export let currentPage: number;
	export let totalPages: number;
	export let itemsPerPage: number;
	export let allNodesLength: number;

	export let goToPage: (page: number) => void;
	export let prevPage: () => void;
	export let nextPage: () => void;
</script>

<div class="flex flex-col items-center justify-between gap-4 text-sm sm:flex-row">
	<div class="text-gray-400">
		Showing <span class="font-medium text-white">{currentPage * itemsPerPage + 1}</span> to
		<span class="font-medium text-white"
			>{Math.min((currentPage + 1) * itemsPerPage, allNodesLength)}</span
		>
		of <span class="font-medium text-white">{allNodesLength}</span> nodes
	</div>

	<div class="flex items-center gap-2">
		<button
			on:click={prevPage}
			disabled={currentPage === 0}
			class="rounded-md bg-gray-700 px-3 py-2 font-medium transition-colors hover:bg-gray-600 disabled:cursor-not-allowed disabled:opacity-50"
		>
			Previous
		</button>

		<div class="hidden gap-1 sm:flex">
			{#each Array(Math.min(5, totalPages)) as _, i}
				{@const pageNum =
					currentPage < 2
						? i
						: currentPage > totalPages - 3
							? totalPages - 5 + i
							: currentPage - 2 + i}
				{#if pageNum >= 0 && pageNum < totalPages}
					<button
						on:click={() => goToPage(pageNum)}
						class={`h-9 w-9 rounded-md ${
							currentPage === pageNum
								? 'bg-orange-500 text-white'
								: 'bg-gray-700 text-gray-200 hover:bg-gray-600'
						}`}
					>
						{pageNum + 1}
					</button>
				{/if}
			{/each}
		</div>

		<button
			on:click={nextPage}
			disabled={currentPage === totalPages - 1}
			class="rounded-md bg-gray-700 px-3 py-2 font-medium transition-colors hover:bg-gray-600 disabled:cursor-not-allowed disabled:opacity-50"
		>
			Next
		</button>
	</div>
</div>
