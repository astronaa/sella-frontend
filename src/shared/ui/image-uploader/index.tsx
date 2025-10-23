'use client';

import { cn } from "~/shared/lib/cn";
import { Icons } from "../icons";
import { HTMLAttributes, InputHTMLAttributes, useEffect, useRef, useState } from "react";
import { IconButton } from "../kit/button";
import { useCallbackRef } from "~/shared/lib/use-callback-ref";
import { toaster } from "../toaster";

export interface ImageUploaderProps extends Omit<HTMLAttributes<HTMLDivElement>, 'onChange'> {
	label: string
	onChange?: (image: File | null | undefined) => void
	accept?: InputHTMLAttributes<HTMLInputElement>['accept'],
	initialImageSrc?: string
	maxSizePerFile?: number
}

export function ImageUploader({ className, label, onChange, accept, initialImageSrc, maxSizePerFile, ...props }: ImageUploaderProps) {
	const defaultValue = initialImageSrc ?? null;
	const [imagePreview, setImagePreview] = useState<string | null>(defaultValue);
	const inputRef = useRef<HTMLInputElement>(null);

	const changePreview = (image: File | null) => {
		setImagePreview(image ? URL.createObjectURL(image) : null);
		onChange?.(image);
	}

	const resetImage = useCallbackRef(() => {
		setImagePreview(defaultValue);
		onChange?.(undefined);

		if (inputRef.current)
			inputRef.current.value = '';
	});

	const clearImage = () => {
		setImagePreview(null);
		onChange?.(null);

		if (inputRef.current)
			inputRef.current.value = '';
	}

	const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const file = e.target.files?.[0];
		if (!file)
			return;

		if (maxSizePerFile && file.size > maxSizePerFile) {
			const maxSizeMB = (maxSizePerFile / (1024 * 1024)).toFixed(1);
			const fileSizeMB = (file.size / (1024 * 1024)).toFixed(1);
			toaster.error({
				title: 'File too large',
				description: `File is ${fileSizeMB}MB, maximum allowed is ${maxSizeMB}MB`
			});
			if (inputRef.current)
				inputRef.current.value = '';
			return;
		}

		changePreview(file)
	};

	useEffect(() => {
		resetImage();
	}, [defaultValue, resetImage])

	return (
		<div
			{...props}
			className={cn(
				'group flex flex-col items-center justify-center gap-[0.25rem] relative overflow-hidden',
				'size-[10rem] rounded-[1rem] border border-white/10 text-black-40 bg-white/5',
				'hocus:bg-white/10',
				'max-md:size-[10rem] max-md:mx-auto',
				className
			)}
		>
			{imagePreview && (
				// eslint-disable-next-line @next/next/no-img-element
				<img
					src={imagePreview}
					className="object-contain size-full group-hover:opacity-[.08] transition-all"
					alt="Preview"
				/>
			)}

			<div
				className={cn(
					'flex flex-col items-center justify-center absolute size-full',
					imagePreview && 'transition-all opacity-0 group-hover:opacity-100'
				)}
			>
				<Icons.UploadCloud className='size-[1.25rem]' />
				<p className='w-min text-center'>{label}</p>
			</div>

			<input
				ref={inputRef} type='file'
				accept={accept ?? 'image/*'}
				className='absolute size-full top-0 left-0 opacity-0 cursor-pointer'
				onChange={handleFileChange}
			/>

			<div className='absolute bottom-[0.5rem] flex gap-[0.5rem]'>
				{imagePreview !== defaultValue && defaultValue !== null && (
					<IconButton
						className='rounded-full transition-all opacity-0 group-hover:opacity-100 relative z-10'
						size='sm' variant='ghost'
						onClick={resetImage}
					>
						<Icons.Refresh />
					</IconButton>
				)}

				{imagePreview !== null && (
					<IconButton
						className='rounded-full transition-all opacity-0 group-hover:opacity-100 relative z-10'
						size='sm' variant='ghost'
						onClick={clearImage}
					>
						<Icons.Close />
					</IconButton>
				)}
			</div>
		</div>
	);
}
