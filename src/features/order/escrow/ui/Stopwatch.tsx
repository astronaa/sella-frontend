'use client';

import { HTMLAttributes, useState } from "react";
import { useInterval } from "usehooks-ts";
import { dayJs } from "~/shared/lib/dayjs";

export function Stopwatch(props: HTMLAttributes<HTMLSpanElement>) {
	const [time, setTime] = useState(0);
	useInterval(() => setTime(t => t + 1), 1000);

	return (
		<span {...props}>
			{dayJs(time * 1000).format('mm:ss')}
		</span>
	);
}
