'use client';

import { cn } from "~/shared/lib/cn";
import { ProductProp } from "./Prop";
import { useProductContextOrProp } from "./context";
import { PreviewImage, PreviewImageProps } from "~/shared/ui/image";

export function Image({ className, product: p, ...props }: Omit<PreviewImageProps, 'src' | 'alt'> & Partial<ProductProp>) {
	const { previewImage: imageUrl, name: title } = useProductContextOrProp(p);

	return (
		<PreviewImage
			alt={`Image of ${title}`}
			width={300} height={300}
			src={imageUrl ?? null} {...props}
			className={cn('flex-shrink-0 w-full shadow-sm', className)}
		/>
	);
}