"use client";

import { HTMLAttributes, PropsWithChildren, useEffect, useRef } from "react";
import { cn } from "~/shared/lib/cn";

export function Eyebrow({ className, children, ...props }: HTMLAttributes<HTMLDivElement>) {
	return (
		<div
			{...props}
			className={cn(
				"flex items-center gap-[0.625rem] text-[0.8125rem] font-semibold uppercase tracking-[0.18em] text-black-60",
				className
			)}
		>
			<span className="size-[0.375rem] rounded-full bg-accent-100 shadow-[0_0_12px_2px_rgba(255,221,0,0.55)]" />
			{children}
		</div>
	);
}

/** Fades content up when it enters the viewport. Pure presentation, no layout impact. */
export function Reveal({
	className,
	delay = 0,
	children,
	...props
}: PropsWithChildren<HTMLAttributes<HTMLDivElement> & { delay?: number }>) {
	const ref = useRef<HTMLDivElement>(null);

	useEffect(() => {
		const node = ref.current;
		if (!node) return;

		// arm only elements still below the viewport, so nothing already
		// visible (or rendered without JS) ever flashes hidden
		const rect = node.getBoundingClientRect();
		if (rect.top < window.innerHeight * 0.85) return;

		node.classList.add("lp-armed");

		const observer = new IntersectionObserver(
			([entry]) => {
				if (entry.isIntersecting) {
					node.classList.add("lp-visible");
					observer.disconnect();
				}
			},
			{ threshold: 0.15, rootMargin: "0px 0px -40px 0px" }
		);

		observer.observe(node);
		return () => observer.disconnect();
	}, []);

	return (
		<div
			ref={ref}
			{...props}
			className={cn("lp-reveal", className)}
			style={{ transitionDelay: delay ? `${delay}ms` : undefined, ...props.style }}
		>
			{children}
		</div>
	);
}
