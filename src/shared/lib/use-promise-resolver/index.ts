import { useCallback, useMemo, useRef } from "react";

export function usePromiseResolver<T>() {
	const refResolve = useRef<((result: T) => void) | null>(null);
	const refReject = useRef<((reason: unknown) => void) | null>(null);

	const createPromise = useCallback(() => {
		return new Promise<T>((resolve, reject) => {
			refResolve.current = resolve;
			refReject.current = reject;
		});
	}, [])

	const resolve = useCallback((result: T) => {
		refResolve.current?.(result);
	}, []);

	const reject = useCallback((reason: unknown) => {
		refReject.current?.(reason);
	}, []);

	return useMemo(() => ({
		createPromise,
		resolve,
		reject
	}), [createPromise, reject, resolve])
}