import { useRef, useState } from "react";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function useDebounce<T extends (...args: any) => void>(func: T, delayMs: number) {
	const intervalRef = useRef<NodeJS.Timeout>();

	function clearDebounce(){
		if (intervalRef.current)
			clearTimeout(intervalRef.current);
	}
	function debounceFn(...args: Parameters<T>) {
		clearDebounce()
		intervalRef.current = setTimeout(() => func.apply(null, [...args]), delayMs);
	}

	return {debounceFn, clearDebounce}
}

export function useDebouncedState<S = undefined>(delay: number, initialState: S) {
	const [state, setState] = useState(initialState);
	const {debounceFn} = useDebounce(setState, delay);

	return [state, debounceFn, setState] as const;
}