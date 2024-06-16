'use client';

import { createContext, useContext } from "react";
import { invariant } from "~/shared/lib/asserts";

interface Context {
	value: string,
	setValue: (value: string) => void
}

const context = createContext<Context | null>(null);

export function useSearchBarContext() {
	const value = useContext(context);
	invariant(value, 'Usage of useSearchBarContext outside the context');
	return value;
}

export const SearchBarContextProvider = context.Provider