'use client';

import React, {
	createContext,
	useContext as useReactContext
} from 'react'

interface CreateContextOptions<Data> {
	errorMessage?: string
	defaultValue?: Data
}

type CreateContextReturn<Data, Name extends string, Key extends string = Capitalize<Name>> =
	Record<`use${Key}Context`, () => Data | null>
	& Record<`use${Key}StrictContext`, () => Data>
	& Record<`${Key}Provider`, React.Provider<Data>>
	& Record<`${Key}Consumer`, React.Consumer<Data>>

function getErrorMessage(hook: string, provider: string) {
	return `${hook} returned \`undefined\`. Seems you forgot to wrap component within ${provider}`
}

function capitalize<T extends string>(str: T) {
	return str.charAt(0).toUpperCase() + str.slice(1) as Capitalize<T>;
}

export function createContextFactory<Name extends string>(name: Name) {
	return function create<Data>(options: CreateContextOptions<Data> = {}) {
		const {
			errorMessage,
			defaultValue = null,
		} = options

		const context = createContext<Data | null>(defaultValue);
		const capitilizeName = capitalize(name);

		context.displayName = `${capitilizeName}Context`;

		const hookName = `use${capitilizeName}Context` as const;
		const strictHookName = `use${capitilizeName}StrictContext` as const;
		const providerName = `${capitilizeName}Provider` as const;
		const consumerName = `${capitilizeName}Consumer` as const;

		function useStrictContext() {
			const value = useReactContext(context);
			if (!value) {
				const error = new Error(errorMessage ?? getErrorMessage(strictHookName, providerName))
				error.name = 'ContextError'
				Error.captureStackTrace?.(error, useStrictContext)
				throw error
			}

			return value
		}

		return {
			[providerName]: context.Provider,
			[consumerName]: context.Consumer,
			[hookName]: () => useReactContext(context),
			[strictHookName]: useStrictContext
		} as CreateContextReturn<Data, Name>;
	}
}