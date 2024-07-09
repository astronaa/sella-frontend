import { HTMLAttributes } from "react";
import { CategoryProp } from "./Prop";
import { cn } from "~/shared/lib/cn";
import { PreviewImage } from "~/shared/ui/image";

export type BoxProps = HTMLAttributes<HTMLDivElement> & CategoryProp & {
	active?: boolean
}

export function Box({ category, active, className, ...props }: BoxProps) {
	return (
		<div
			{...props}
			className={cn(
				'flex flex-col items-center justify-center gap-[0.625rem] size-[9.375rem] select-none',
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
			/>

			<span>{category.name}</span>
		</div>
	)
}