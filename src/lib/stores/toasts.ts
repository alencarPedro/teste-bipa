import { writable } from 'svelte/store';

type ToastType = 'success' | 'error' | 'info';

export interface Toast {
	id: string;
	message: string;
	type: ToastType;
	duration?: number;
}

function createToastsStore() {
	const { subscribe, update } = writable<Toast[]>([]);

	function addToast(message: string, type: ToastType = 'success', duration = 3000) {
		const id = Date.now().toString();
		update((toasts) => [...toasts, { id, message, type, duration }]);
		return id;
	}

	function removeToast(id: string) {
		update((toasts) => toasts.filter((toast) => toast.id !== id));
	}

	return {
		subscribe,
		success: (message: string, duration?: number) => addToast(message, 'success', duration),
		error: (message: string, duration?: number) => addToast(message, 'error', duration),
		info: (message: string, duration?: number) => addToast(message, 'info', duration),
		remove: removeToast
	};
}

export const toasts = createToastsStore();
