'use client';

import { cn } from "~/shared/lib/cn";
import { HTMLAttributes } from "react";
import { Button } from "~/shared/ui/kit/button";
import { useRegisterFlow } from "~/shared/model/register-flow";

export function NotAuthorizedBar({ className, ...props }: HTMLAttributes<HTMLDivElement>) {
	const startFlow = useRegisterFlow(s => s.startFlow);

	return (
		<div {...props} className={cn('flex items-center gap-[1rem]', className)}>
			<Button variant='outline'>
				Buy $SELLA
			</Button>

			<Button onClick={startFlow}>
				Open Storefront
			</Button>
		</div>
	);
}
