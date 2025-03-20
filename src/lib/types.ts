// Node type from mempool.space
export interface NodeProps {
	publicKey: string;
	alias: string;
	channels: number;
	capacity: number;
	firstSeen: number;
	updatedAt: number;
	country: {
		en: string;
	};
}
