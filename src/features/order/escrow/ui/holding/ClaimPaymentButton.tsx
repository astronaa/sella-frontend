'use client';

import { OrderProp } from "~/entities/order";
import { Button, ButtonProps } from "~/shared/ui/kit/button";
import { dayJs } from "~/shared/lib/dayjs";
import { useEffect, useState } from "react";

export function ClaimPaymentButton({ order, ...props }: ButtonProps & OrderProp) {
	const { status, holdEndingAt } = order.transaction;
	const diff = holdEndingAt ? dayJs.duration(dayJs(holdEndingAt).diff()).asMilliseconds() : null;
	const [enabled, setEnabled] = useState(diff != null && diff <= 0);

	useEffect(() => {
		if (status != 'Hold' || diff == null)
			return;

		const timeout = setTimeout(() => setEnabled(false), diff);

		return () => {
			clearTimeout(timeout);
		};
	}, [status, diff]);

	return (
		<Button
			size='xl'
			{...props}
			disabled={!enabled} 
		/>
	);
}
