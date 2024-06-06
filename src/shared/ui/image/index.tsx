import { ComponentProps } from "react";
import NextImage from 'next/image'
import { cn } from "~/shared/lib/cn";
import { Icons } from "../icons";

type NextImageProps = ComponentProps<typeof NextImage>

export interface PreviewImageProps extends Omit<NextImageProps, 'src'> {
	src: NextImageProps['src'] | null
}

export function PreviewImage({ src, className, ...props }: PreviewImageProps) {
	return (
		<div className={cn(
			'flex items-center justify-center size-[11.25rem] rounded-[1rem] overflow-hidden',
			'border border-secondary bg-white/[.02] text-white/[.08] [&_svg]:stroke-[0.8]',
			className
		)}
		>
			{src ? (
				<NextImage
					src={src}
					{...props}
					className={cn('size-full object-cover')}
				/>
			) : (
				<Icons.Image
					className='size-[max(1.5rem,40%)] flex-shrink-0'
				/>
			)}
		</div>
	);
}