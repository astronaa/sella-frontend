import { HTMLAttributes, useEffect, useRef } from "react";
import { CategoryProp } from "./Prop";
import { cn } from "~/shared/lib/cn";
import { PreviewImage } from "~/shared/ui/image";

export type BoxProps = HTMLAttributes<HTMLDivElement> & CategoryProp & {
	active?: boolean,
	truncateName?: boolean,
	autoScrollOnActive?: boolean
}

export function Box({ category, active, className, truncateName, autoScrollOnActive = true, ...props }: BoxProps) {
	const ref = useRef<HTMLDivElement>(null);

	useEffect(() => {
		if (autoScrollOnActive && active) {
			ref.current?.scrollIntoView({
				behavior: 'smooth',
				block: 'nearest',
				inline: 'center'
			})
		}
	}, [autoScrollOnActive, active])

	return (
		<div
			ref={ref}
			{...props}
			className={cn(
				'flex flex-col items-center justify-center gap-[0.625rem] size-[9.375rem] select-none p-[0.5rem]',
				'rounded-[0.75rem] bg-white/[.04] flex-shrink-0 transition hover:bg-white/[.06] text-center',
				'border border-transparent',
				active && 'border-accent-100 text-accent-100 bg-transparent',
				className
			)}
		>
			<PreviewImage
				src={category.image}
				className='size-[5rem] border-none bg-transparent'
				alt={`Category ${category.name} image`}
				width={300} height={300}
				priority={true}
			/>

			<span className={cn(truncateName && 'truncate max-w-full')}>
				{category.name}
			</span>
		</div>
	)
}