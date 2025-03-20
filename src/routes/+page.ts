import type { PageLoad } from './$types.js';

// Fetch nodes from mempool.space
export const load: PageLoad = async ({ fetch, depends }) => {
	// Add a dependency ID for invalidation
	depends('app:nodes');

	const getNodes = async () => {
		try {
			const response = await fetch(
				`https://mempool.space/api/v1/lightning/nodes/rankings/connectivity`
			);

			if (!response.ok) {
				throw new Error(`API returned ${response.status}: ${response.statusText}`);
			}

			const data = await response.json();
			return data;
		} catch (error) {
			console.error('API request failed:', error);
			throw error;
		}
	};

	return {
		nodes: await getNodes()
	};
};
