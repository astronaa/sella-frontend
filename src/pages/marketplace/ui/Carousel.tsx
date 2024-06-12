'use client'

import { PreviewImage } from "~/shared/ui/image";
import { cn } from "~/shared/lib/cn";
import ScrollContainer from "react-indiana-drag-scroll";
import { ark, HTMLArkProps } from "@ark-ui/react";

export function Carousel({ className, ...props }: HTMLArkProps<'div'>) {
	return (
		<ark.div
			{...props}
			asChild
			className={cn(
				"flex w-full space-x-3 overflow-x-scroll scrollbar-hide",
				className
			)}
		>
			<ScrollContainer>
				{Array.from({ length: 10 }).map((_, index) => (
					<div
						key={index}
						className='flex-none w-[21.5rem] rounded-[1.25rem] border border-secondary bg-white/[.02] p-[0.5rem]'
					>
						<PreviewImage className='w-full' src={null} alt='item' />
					</div>
				))}
			</ScrollContainer>
		</ark.div>
	);
}
