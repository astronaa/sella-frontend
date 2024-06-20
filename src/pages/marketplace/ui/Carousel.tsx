'use client'

import { PreviewImage } from "~/shared/ui/image";
import { Scrollable } from "~/shared/ui/scrollable";

export function Carousel(props: Scrollable.RootProps) {
	return (
		<Scrollable.Root {...props}>
			<Scrollable.Container className='gap-[1rem]'>
				{Array.from({ length: 10 }).map((_, index) => (
					<div
						key={index}
						className='flex-none w-[21.5rem] rounded-[1.25rem] border border-secondary bg-white/[.02] p-[0.5rem]'
					>
						<PreviewImage className='w-full' src={null} alt='item' />
					</div>
				))}
			</Scrollable.Container >
		</Scrollable.Root>
	);
}
