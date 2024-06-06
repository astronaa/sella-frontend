import { HTMLAttributes, ReactNode } from "react";
import { cn } from "~/shared/lib/cn";

export interface CustomFileModel {
	name: string,
	url: string
}

export type FilePreviewAllowedTypes = File | CustomFileModel;

export interface FilePreviewProps extends HTMLAttributes<HTMLDivElement> {
	file: FilePreviewAllowedTypes,
	renderActionBar?: ReactNode,
	includeFileName?: boolean
}

export function FilePreview({ file, children, renderActionBar, includeFileName, className, ...props }: FilePreviewProps) {
	const { type, previewUrl, extension, name } = extractFileInfo(file);

	return (
		<div
			{...props}
			className={cn('size-[5rem] overflow-hidden flex flex-col items-center justify-between relative', className)}
		>
			<div
				className={'flex items-center justify-center aspect-square border border-secondary\
				 	overflow-hidden rounded-[0.625rem] w-full'}
			>
				{type == 'image' ? (
					<div
						className='size-full bg-white/10 bg-center bg-cover'
						style={{ backgroundImage: `url(${previewUrl})` }}
					/>
				) : (
					<span>{extension}</span>
				)}
			</div>
			{includeFileName && (
				<span
					title={name} dir='rtl'
					className='truncate max-w-full'
				>
					{name}
				</span>
			)}
			{!!renderActionBar && (
				<div className='flex flex-col gap-[1rem] absolute right-[0.25rem] top-[0.25rem]'>
					{renderActionBar}
				</div>
			)}
			{children}
		</div>
	);
}

const objectUrls = new Map<File, string>();

function resolveObjectUrl(file: File) {
	if (objectUrls.has(file))
		return objectUrls.get(file);

	const url = URL.createObjectURL(file)
	objectUrls.set(file, url);
	return url;
}

function extractFileInfo(file: FilePreviewAllowedTypes) {
	const name = file.name;
	const extension = name.split('.').pop();
	const isImage = file instanceof File ? (
		file.type.startsWith('image/')
	) : (
		extension ? (
			['png', 'jpg', 'jpeg', 'webp'].includes(extension.toLowerCase())
		) : (
			false
		)
	)

	return isImage ? {
		type: 'image',
		previewUrl: file instanceof File ? resolveObjectUrl(file) : file.url,
		extension, name
	} as const : {
		type: 'other',
		extension, name
	} as const
}