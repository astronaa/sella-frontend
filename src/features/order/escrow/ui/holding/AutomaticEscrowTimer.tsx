'use client';

import { HTMLAttributes, useState } from "react";
import { useInterval } from "usehooks-ts";
import { cn } from "~/shared/lib/cn";
import { dayJs } from "~/shared/lib/dayjs";

interface AutomaticEscrowTimerProps extends HTMLAttributes<HTMLDivElement> {
	holdEndingAt: string
}

export function AutomaticEscrowTimer({ holdEndingAt, className, ...props }: AutomaticEscrowTimerProps) {
	const holdEndingDate = dayJs(holdEndingAt);
	const [interval, setInterval] = useState(0);
	const [timerString, setTimerString] = useState(formatTimer());

	function formatTimer() {
		const duration = dayJs.duration(Math.max(holdEndingDate.diff(), 0));
		const days = duration.asDays() | 0;
		const daysFormat = days ? `${days} ${days > 1 ? 'days' : 'day'}` : '';
		const restFormat = duration.format('HH:mm:ss');

		return `${daysFormat} ${restFormat}`
	}

	useInterval(() => {
		if(interval == 0)
			setInterval(Date.now() % 1000);
		else if(interval != 1000)
			setInterval(1000);

		setTimerString(formatTimer());
	}, interval);

	return (
		<div 
			{...props} 
			className={cn('flex justify-between w-full pt-[1rem] gap-[1rem] text-black-74', className)}
		>
			<span>Automatic Escrow</span>
			<span className='text-accent-100'>
				{timerString}
			</span>
		</div>
	);
}