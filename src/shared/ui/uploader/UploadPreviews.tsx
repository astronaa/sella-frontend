import { useUploadContext } from "./Upload";
import { HTMLAttributes, ReactNode } from "react";
import { FilePreview, FilePreviewAllowedTypes, FilePreviewProps } from "./FilePreview";
import { cn } from "~/shared/lib/cn";
import { IconButton } from "../kit/button";
import { Icons } from "../icons";

interface UploadPreviewsProps extends HTMLAttributes<HTMLDivElement> {
	prevSlot?: ReactNode
}

export function UploadPreviews({ children, className, prevSlot, ...props }: UploadPreviewsProps) {
	const context = useUploadContext();

	return (
		<div {...props} className={cn('grid grid-cols-5 gap-[1rem]', className)}>
			{prevSlot}
			{context?.files.map((f, index) => (
				<UploadPreviewItem key={index} file={f} />
			))}
			{children}
		</div>
	);
}

interface UploadPreviewItemProps<T extends FilePreviewAllowedTypes> extends FilePreviewProps {
	file: T,
	onClickDelete?: (file: T) => void
}

export function UploadPreviewItem<T extends FilePreviewAllowedTypes>(
	{ file, onClickDelete, ...props }: UploadPreviewItemProps<T>
) {
	const context = useUploadContext();
	const shouldRenderDeleteButton = !!context?.deleteFile || !!onClickDelete;

	const handleFileClickDelete = () => {
		onClickDelete?.(file);

		if (file instanceof File)
			context?.deleteFile(file);
	}

	return (
		<FilePreview
			file={file}
			{...props}
			renderActionBar={
				shouldRenderDeleteButton && (
					<IconButton
						variant='action' size='xs'
						onClick={handleFileClickDelete}
					>
						<Icons.Close className='size-[1.25rem]' />
					</IconButton>
				)
			}
		/>
	);
}