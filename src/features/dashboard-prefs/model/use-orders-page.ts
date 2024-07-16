import { useLocalStorage } from "usehooks-ts";

type PossiblePages = 'orders' | 'sales';

export function useOrdersPage() {
	return useLocalStorage<PossiblePages>('dashboard-prefs-order-page', 'orders')
}