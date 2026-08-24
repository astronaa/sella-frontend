import { ComponentPropsWithoutRef, forwardRef } from "react";
import NextImage from 'next/image'
import { cn } from "~/shared/lib/cn";

type NextImageProps = ComponentPropsWithoutRef<typeof NextImage>

export interface PreviewImageProps extends Omit<NextImageProps, 'src'> {
	src: NextImageProps['src'] | null
}

export const PreviewImage = forwardRef<HTMLImageElement, PreviewImageProps>(({ src, className, ...props }, ref) => (
	<div
		className={cn(
			'flex items-center justify-center size-[11.25rem] rounded-[1rem] overflow-hidden',
			'border border-secondary bg-white/[.02] text-white/[.08] [&_svg]:stroke-[0.8]',
			className
		)}
	>
		{src ? (
			<NextImage
				src={src}
				ref={ref}
				{...props}
				className={cn('size-full object-cover')}
			/>
		) : (
			<div
				ref={ref as never}
				className='flex items-center justify-center size-full'
				style={{
					background:
						'radial-gradient(90% 90% at 30% 10%, rgba(255,221,0,0.10) 0%, rgba(236,149,21,0.04) 45%, rgba(15,15,15,0) 100%)',
				}}
			>
				{/* Sella spark placeholder */}
				<svg
					viewBox="0 0 24 24"
					className='size-[max(1.75rem,28%)] flex-shrink-0 fill-accent-100/25'
				>
					<path d="M13.6 2L5 13.2h5.2L10 22l8.7-11.2h-5.3L13.6 2z" />
				</svg>
			</div>
		)}
	</div>
));

PreviewImage.displayName = 'PreviewImage'
