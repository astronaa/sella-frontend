'use client';

import { PropsWithChildren, useId, useMemo } from "react";
import { createContextFactory } from "~/shared/lib/create-context-factory";

export interface ControlProps {
	name: string
	id?: string
}

const create = createContextFactory('formControl');

export const {
	FormControlProvider: Provider,
	useFormControlStrictContext
} = create<ControlProps>();

export function FormControlProvider({ name, id, children }: PropsWithChildren<ControlProps>) {
	const generatedId = useId();
	const inputId = id ?? generatedId;
	const contextValue = useMemo(() => ({ id: inputId, name }), [inputId, name]);

	return (
		<Provider value={contextValue}>
			{children}
		</Provider>
	);
}