<script lang="ts">
	import type { NodeProps } from '$lib/types.js';
	import {
		formatSatsToBtc,
		formatUnixTimestamp,
		truncatePublicKey,
		copyToClipboard
	} from '$lib/helpers.js';

	export let nodes: NodeProps[];
</script>

<div class="mb-6 overflow-hidden rounded-xl bg-gray-800 shadow-xl">
	<div class="overflow-x-auto">
		<table class="w-full">
			<thead>
				<tr class="bg-gray-750 border-b border-gray-700">
					<th class="px-6 py-3 text-left text-xs font-medium tracking-wider text-gray-400 uppercase"
						>Channels</th
					>
					<th class="px-6 py-3 text-left text-xs font-medium tracking-wider text-gray-400 uppercase"
						>Node</th
					>
					<th class="px-6 py-3 text-left text-xs font-medium tracking-wider text-gray-400 uppercase"
						>Capacity</th
					>
					<th class="px-6 py-3 text-left text-xs font-medium tracking-wider text-gray-400 uppercase"
						>Public Key</th
					>
					<th class="px-6 py-3 text-left text-xs font-medium tracking-wider text-gray-400 uppercase"
						>Country</th
					>
					<th class="px-6 py-3 text-left text-xs font-medium tracking-wider text-gray-400 uppercase"
						>First Seen</th
					>
					<th class="px-6 py-3 text-left text-xs font-medium tracking-wider text-gray-400 uppercase"
						>Updated At</th
					>
				</tr>
			</thead>
			<tbody class="divide-y divide-gray-700">
				{#each nodes as node}
					<tr class="hover:bg-gray-750 transition-colors">
						<td class="px-6 py-4 text-sm whitespace-nowrap">
							<span class="inline-flex rounded-md bg-gray-700 px-2 py-1 text-xs font-medium">
								{node.channels || 'N/A'}
							</span>
						</td>
						<td class="px-6 py-4 text-sm font-medium whitespace-nowrap">{node.alias}</td>
						<td class="px-6 py-4 text-left text-sm whitespace-nowrap">
							<span class="inline-flex rounded-md bg-gray-700 px-2 py-1 text-xs font-medium">
								{formatSatsToBtc(node.capacity)}
							</span>
						</td>
						<td class="px-6 py-4 text-left text-sm whitespace-nowrap">
							<div class="flex items-center">
								<span class="inline-flex rounded-md bg-gray-700 px-2 py-1 text-xs font-medium">
									{truncatePublicKey(node.publicKey)}
								</span>
								<button
									class="ml-2 text-gray-400 hover:text-gray-200"
									on:click={() => copyToClipboard(node.publicKey)}
									aria-label="Copy public key"
								>
									<svg
										xmlns="http://www.w3.org/2000/svg"
										class="h-4 w-4"
										fill="none"
										viewBox="0 0 24 24"
										stroke="currentColor"
									>
										<path
											stroke-linecap="round"
											stroke-linejoin="round"
											stroke-width="2"
											d="M8 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-1M8 5a2 2 0 002 2h2a2 2 0 002-2M8 5a2 2 0 012-2h2a2 2 0 012 2m0 0h2a2 2 0 012 2v3m2 4H10m0 0l3-3m-3 3l3 3"
										/>
									</svg>
								</button>
							</div>
						</td>
						<td class="px-6 py-4 text-left text-sm whitespace-nowrap">
							<span class="inline-flex rounded-md bg-gray-700 px-2 py-1 text-xs font-medium">
								{node.country?.en || 'N/A'}
							</span>
						</td>
						<td class="px-6 py-4 text-left text-sm whitespace-nowrap">
							<span class="inline-flex rounded-md bg-gray-700 px-2 py-1 text-xs font-medium">
								{formatUnixTimestamp(node.firstSeen)}
							</span>
						</td>
						<td class="px-6 py-4 text-left text-sm whitespace-nowrap">
							<span class="inline-flex rounded-md bg-gray-700 px-2 py-1 text-xs font-medium">
								{formatUnixTimestamp(node.updatedAt)}
							</span>
						</td>
					</tr>
				{/each}
			</tbody>
		</table>
	</div>
</div>
