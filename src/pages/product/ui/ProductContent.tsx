"use client";

import Link from "next/link";
import { Heading } from "~/shared/ui/kit/heading";
import { GalleryCarousel } from "./GalleryCarousel";
import { useProductStrictContext } from "~/entities/product";
import { getStorePathname } from "~/entities/store";
import { HTMLAttributes } from "react";
import { cn } from "~/shared/lib/cn";
import { Button } from "~/shared/ui/kit/button";

export function ProductContent({ className, ...props }: HTMLAttributes<HTMLDivElement>) {
	const product = useProductStrictContext();
	const images = product.galleryImages && product.previewImage ?
		[product.previewImage, ...product.galleryImages]
		: product.galleryImages

	return (
		<div {...props} className={cn("flex flex-col gap-6", className)}>
			<div className="text-[1rem]/[1.3rem] text-black-60">
				<span>by </span>
				{product.storeUrl && (
					<Link
						className='text-accent-100'
						href={getStorePathname(product.storeUrl)}
					>
						{product.storeUrl}
					</Link>
				)}
			</div>

			<Heading size='lg'>
				{product.name}
			</Heading>

			<div className="flex flex-col gap-4 lg:gap-6 pb-8 border-b border-white/[.08]">
				{images && (
					<GalleryCarousel images={images} />
				)}
				<div className=" text-black-74 flex flex-col gap-[1.25rem]">
					<p className="line-clamp-5 lg:line-clamp-none">
						{Boolean(product.description) ? product.description : 'No description'}
					</p>

					<div className="flex flex-row gap-[1rem] flex-wrap">
						{product.tagNames?.map(t => (
							<Button
								asChild
								key={t} colorPalette="gray"
							>
								<Link href={`/marketplace/?tagNames=${t}`}>
									{t}
								</Link>
							</Button>
						))}
					</div>
				</div>
			</div>
		</div >
	);
}