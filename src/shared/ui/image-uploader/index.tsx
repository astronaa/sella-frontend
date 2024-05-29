'use client';

import { cn } from "~/shared/lib/cn";
import { Icons } from "../icons";
import { HTMLAttributes, InputHTMLAttributes, useState } from "react";

export interface ImageUploaderProps extends Omit<HTMLAttributes<HTMLDivElement>, 'onChange'> {
	label: string
	onChange?: (image: File | null) => void
	accept?: InputHTMLAttributes<HTMLInputElement>['accept']
}

export function ImageUploader({ className, label, onChange, accept, ...props }: ImageUploaderProps) {
	const [imagePreview, setImagePreview] = useState<string | null>();

	const changePreview = (image: File | null) => {
		setImagePreview(image ? URL.createObjectURL(image) : null);
		onChange?.(image);
	}

	const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const file = e.target.files?.[0];
		if (!file)
			return;

		changePreview(file)
	};

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
				accept={accept ?? 'image/*'}
				className='absolute size-full top-0 left-0 opacity-0 cursor-pointer'
				type='file'
				onChange={handleFileChange}
			/>
		</div>
	);
}
