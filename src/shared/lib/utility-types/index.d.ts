import { InfiniteData, UseInfiniteQueryOptions, UseQueryOptions } from "@tanstack/react-query";

export type WithOptional<T, K extends keyof T> = Omit<T, K> & Partial<Pick<T, K>>;
export type WithRequired<T, K extends keyof T> = Omit<T, K> & Required<Pick<T, K>>;

export type Nullable<T> = {
	[P in keyof T]: T[P] | null;
};

export type InferQueryOptionsFnData<Options> = 
	// eslint-disable-next-line @typescript-eslint/no-unused-vars
	Options extends UseInfiniteQueryOptions<infer TQueryFnData, infer A, infer B, infer C, infer D, infer E> 
		? InfiniteData<TQueryFnData>
		// eslint-disable-next-line @typescript-eslint/no-unused-vars
		: Options extends UseQueryOptions<infer TQueryFnData, infer A, infer B, infer C>
			? TQueryFnData
			: never;