"use client";

import Link from "next/link";
import { Heading } from "~/shared/ui/kit/heading";
import { GalleryCarousel } from "./GalleryCarousel";
import { useProductStrictContext } from "~/entities/product";
import { getStorePathname } from "~/entities/store";
import { HTMLAttributes } from "react";
import { cn } from "~/shared/lib/cn";

export function Hero({ className, ...props }: HTMLAttributes<HTMLDivElement>) {
	const product = useProductStrictContext();

	return (
		<div {...props} className={cn("flex flex-col gap-6", className)}>
			<div className="text-[1rem]/[1.3rem] text-black-60">
				<span>by </span>
				<Link className='text-accent-100' href={getStorePathname(product.storeUrl)}>
					{product.storeUrl}
				</Link>
			</div>

			<Heading size='lg'>
				{product.name}
			</Heading>

			<div className="flex flex-col gap-4 lg:gap-6 pb-8 border-b border-white/[.08]">
				<GalleryCarousel images={product.galleryImages} />
				<div className="font-normal text-black-74 flex flex-col gap-4">
					<p className="line-clamp-5 lg:line-clamp-none">
						{product.description}
					</p>
				</div>
			</div>
		</div>
	);
}
