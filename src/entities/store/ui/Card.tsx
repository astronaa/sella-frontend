/* eslint-disable jsx-a11y/alt-text */

'use client';

import { HTMLArkProps, ark } from "@ark-ui/react";
import { StoreProp } from "./Prop";
import { ComponentProps } from "react";
import { cn } from "~/shared/lib/cn";
import { Icons } from "~/shared/ui/icons";
import { PreviewImage, PreviewImageProps } from "~/shared/ui/image";
import { StoreProvider, useStoreStrictContext } from "./context";
import { RatingRow } from "~/shared/ui/rating";

export type RootProps = HTMLArkProps<'div'> & StoreProp;

export function Root({ store, className, ...props }: RootProps) {
	return (
		<StoreProvider value={store}>
			<ark.div
				{...props}
				className={cn(
					'border border-secondary p-[1rem] rounded-[1.25rem] flex gap-[2rem] items-start md:items-center max-w-[35rem]',
					className
				)}
			/>
		</StoreProvider>
	);
}

export function Image({ className, ...props }: Omit<PreviewImageProps, 'src' | 'alt'>) {
	const { previewImage: imageUrl, name: title } = useStoreStrictContext();

	return (
		<PreviewImage
			width={200}
			height={200}
			alt={`Image of ${title}`}
			src={imageUrl ?? null}
			{...props}
			className={cn('rounded-full flex-shrink-0 shadow-sm', className)}
		/>
	);
}

export function ImageDesktop({ className, ...props }: ComponentProps<typeof Image>) {
	return (
		<Image
			{...props}
			className={cn('max-xl:hidden', className)}
		/>
	);
}

export function ImageMobile({ className, ...props }: ComponentProps<typeof Image>) {
	return (
		<Image
			{...props}
			className={cn('size-[3rem] xl:hidden', className)}
		/>
	);
}

export function Content({ className, ...props }: HTMLArkProps<'div'>) {
	return (
		<ark.div className={cn('flex flex-col gap-[1rem]', className)} {...props} />
	)
}

export function Title({ className, children, ...props }: HTMLArkProps<'div'>) {
	const { name: title, shortName: name, isVerified } = useStoreStrictContext();

	return (
		<ark.div
			{...props}
			className={cn(
				'flex gap-[1rem] items-center text-[1.5rem]/[1.3] truncate',
				'max-lg:text-[1.125rem]/[1.3]',
				className
			)}
		>
			{children}

			<div className='flex flex-col gap-[0.25rem] w-full'>
				<div className='flex items-center gap-[0.5rem] font-semibold font-manrope leading-[1.3]'>
					<h1>{title}</h1>
					{isVerified && <Icons.Verified className='text-accent-100 size-[0.85em]' />}
				</div>

				<span className='font-semibold text-black-40 text-[1rem]'>
					{name}
				</span>
			</div>
		</ark.div>
	);
}

export function Description({ className, ...props }: HTMLArkProps<'p'>) {
	const { description } = useStoreStrictContext();

	return (
		<ark.p className={cn('text-black-60 leading-[1.3]', className)} {...props}>
			{description}
		</ark.p>
	);
}

export function Rating(props: Omit<RatingRow.RootProps, 'rating'>) {
	const { rating } = useStoreStrictContext();

	if(!rating)
		return null;

	return (
		<RatingRow.Composed 
			rating={rating} 
			{...props}
		/>
	);
}

export function Composition() {
	return (
		<>
			<ImageDesktop />
			<Content>
				<Title>
					<ImageMobile />
				</Title>
				<Description />
				<Rating />
			</Content>
		</>
	);
}

export function Composed(props: ComponentProps<typeof Root>) {
	return (
		<Root {...props}>
			<Composition />
		</Root>
	);
}
