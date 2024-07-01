'use client';

import { Button, ButtonProps } from "~/shared/ui/kit/button";
import { useRegisterFlow } from "../model/flow";

export function StartButton(props: ButtonProps) {
	const startFlow = useRegisterFlow(s => s.startFlow);

	return (
		<Button
			{...props}
			onClick={startFlow}
		>
			Open Storefront
		</Button>
	);
}