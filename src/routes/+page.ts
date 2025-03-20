// Fetch nodes from mempool.space
export function load() {
	const getNodes = async () => {
		const response = await fetch(
			`https://mempool.space/api/v1/lightning/nodes/rankings/connectivity`
		);
		const data = await response.json();

		return data;
	};

	return {
		nodes: getNodes()
	};
}
