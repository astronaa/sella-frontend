'use client';

import { PropsWithChildren, useMemo, useState } from "react";
import { EditModeProvider, useEditModeStrictContext } from "../../model/edit-mode";
import { Button as BaseButton } from '~/shared/ui/kit/button';

export function Root({ children }: PropsWithChildren) {
	const [enabled, setEnabled] = useState(false);
	const value = useMemo(() => ({ enabled, setEnabled }), [enabled]);

	return (
		<EditModeProvider value={value}>
			{children}
		</EditModeProvider>
	);
}	

export function Button() {
	const { enabled, setEnabled } = useEditModeStrictContext();

	return (
		<BaseButton size='lg' onClick={() => setEnabled(e => !e)}>
			{enabled ? 'Go Back' : 'Manage Items'}
		</BaseButton>
	);
}