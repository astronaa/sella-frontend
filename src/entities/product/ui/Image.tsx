'use client';

import { cn } from "~/shared/lib/cn";
import { ProductProp } from "./Prop";
import { useProductContextOrProp } from "../model/context";
import { PreviewImage, PreviewImageProps } from "~/shared/ui/image";

const coverGradients = [
	"radial-gradient(120% 120% at 20% 0%, rgba(255,221,0,0.35) 0%, rgba(236,149,21,0.12) 45%, rgba(15,15,15,1) 100%)",
	"radial-gradient(120% 120% at 80% 0%, rgba(255,232,101,0.3) 0%, rgba(201,123,14,0.12) 50%, rgba(15,15,15,1) 100%)",
	"radial-gradient(120% 120% at 50% 100%, rgba(245,196,0,0.28) 0%, rgba(138,90,0,0.12) 50%, rgba(15,15,15,1) 100%)",
	"radial-gradient(120% 120% at 0% 60%, rgba(255,216,77,0.3) 0%, rgba(179,106,0,0.1) 50%, rgba(15,15,15,1) 100%)",
];

function hashOf(text: string) {
	let hash = 0;
	for (let i = 0; i < text.length; i++)
		hash = (hash * 31 + text.charCodeAt(i)) | 0;
	return Math.abs(hash);
}

export function Image({ className, product: p, ...props }: Omit<PreviewImageProps, 'src' | 'alt'> & Partial<ProductProp>) {
	const { previewImage: imageUrl, name: title } = useProductContextOrProp(p);

	if (!imageUrl) {
		const name = title ?? "Sella";

		return (
			<div
				aria-hidden
				className={cn(
					'flex items-center justify-center size-[11.25rem] rounded-[1rem] overflow-hidden',
					'border border-secondary select-none flex-shrink-0 w-full shadow-sm',
					className
				)}
				style={{ background: coverGradients[hashOf(name) % coverGradients.length] }}
			>
				<span className="font-bold font-manrope text-white/90 text-[2.25rem]">
					{name.trim().charAt(0).toUpperCase()}
				</span>
			</div>
		);
	}

	return (
		<PreviewImage
			alt={`Image of ${title}`}
			width={300} height={300}
			src={imageUrl} {...props}
			className={cn('flex-shrink-0 w-full shadow-sm', className)}
		/>
	);
}
