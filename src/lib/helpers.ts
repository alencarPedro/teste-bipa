export const formatSatsToBtc = (sats: number): string => {
	if (!sats) return 'N/A';
	const btc = sats / 100000000;
	return (
		btc.toLocaleString('de-DE', { minimumFractionDigits: 8, maximumFractionDigits: 8 }) + ' BTC'
	);
};

export const formatUnixTimestamp = (timestamp: number): string => {
	const date = new Date(timestamp * 1000);
	return date.toLocaleString('en-US', {
		year: 'numeric',
		month: '2-digit',
		day: '2-digit',
		hour: '2-digit',
		minute: '2-digit',
		second: '2-digit'
	});
};

export const truncatePublicKey = (key: string): string => {
	if (!key) return 'N/A';
	return `${key.substring(0, 8)}...${key.substring(key.length - 8)}`;
};

import { toasts } from './stores/toasts.js';

export const copyToClipboard = (text: string) => {
	navigator.clipboard
		.writeText(text)
		.then(() => {
			toasts.success('Public key copied to clipboard!');
		})
		.catch((err) => {
			console.error('Failed to copy text: ', err);
			toasts.error('Failed to copy text to clipboard');
		});
};

// Helper function to paginate data
export const paginate = <T>(data: T[], page: number, perPage: number): T[] => {
	const start = page * perPage;
	const end = start + perPage;
	return data.slice(start, end);
};
