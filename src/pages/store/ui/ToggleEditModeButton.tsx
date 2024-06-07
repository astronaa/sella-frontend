'use client';

import { Button } from "~/shared/ui/kit/button";
import { useEditModeContext } from "../model/edit-mode";

export function ToggleEditModeButton() {
	const { enabled, setEnabled } = useEditModeContext();

	return (
		<Button size='lg' onClick={() => setEnabled(e => !e)}>
			{enabled ? 'Go Back' : 'Manage Items'}
		</Button>
	);
}