import { describe, it, expect } from 'vitest';
import { formatSatsToBtc, formatUnixTimestamp, truncatePublicKey, paginate } from './helpers.js';

describe('Helper functions', () => {
	describe('formatSatsToBtc', () => {
		it('formats satoshis to BTC correctly', () => {
			expect(formatSatsToBtc(100000000)).toBe('1,00000000 BTC');
			expect(formatSatsToBtc(123456789)).toBe('1,23456789 BTC');
			expect(formatSatsToBtc(0)).toBe('N/A');
		});

		it('returns N/A for falsy values', () => {
			expect(formatSatsToBtc(0)).toBe('N/A');
			expect(formatSatsToBtc(undefined as unknown as number)).toBe('N/A');
			expect(formatSatsToBtc(null as unknown as number)).toBe('N/A');
		});
	});

	describe('formatUnixTimestamp', () => {
		it('formats Unix timestamp correctly', () => {
			// Unix timestamp for 2025-03-20 01:13:29 PM UTC
			const timestamp = 1742487209;
			expect(formatUnixTimestamp(timestamp)).toMatch(/(?:03\/20\/2025|03\/21\/2025)/);
		});
	});

	describe('truncatePublicKey', () => {
		it('truncates a public key correctly', () => {
			const key = '1234567890abcdefghijklmnopqrstuvwxyz';
			expect(truncatePublicKey(key)).toBe('12345678...stuvwxyz');
		});

		it('returns N/A for falsy values', () => {
			expect(truncatePublicKey('')).toBe('N/A');
			expect(truncatePublicKey(undefined as unknown as string)).toBe('N/A');
			expect(truncatePublicKey(null as unknown as string)).toBe('N/A');
		});
	});

	describe('paginate', () => {
		it('paginates data correctly', () => {
			const data = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

			expect(paginate(data, 0, 3)).toEqual([1, 2, 3]);
			expect(paginate(data, 1, 3)).toEqual([4, 5, 6]);
			expect(paginate(data, 2, 3)).toEqual([7, 8, 9]);
			expect(paginate(data, 3, 3)).toEqual([10]);
			expect(paginate(data, 4, 3)).toEqual([]);
		});
	});
});
