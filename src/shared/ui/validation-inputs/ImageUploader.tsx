'use client';

import { useField } from "react-final-form";
import { ImageUploader, ImageUploaderProps } from "../image-uploader";
import { cn } from "~/shared/lib/cn";
import { shouldRenderFieldError } from "./error";

interface VImageUploaderProps extends ImageUploaderProps {
	name: string
}

export function VImageUploader({ name, className, ...props }: VImageUploaderProps) {
	const { 
		input: { onChange },
		meta: fieldState
	} = useField(name)

	const shouldRender = shouldRenderFieldError(fieldState);
	
	return (
		<ImageUploader
			{...props}
			className={cn(shouldRender && 'border-error-100 text-error-100', className)}
			onChange={image => {
				onChange(image);
				props?.onChange?.(image);
			}}
		/>
	);
}