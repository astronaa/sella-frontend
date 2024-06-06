'use client';

import { useField } from "react-final-form";
import { cn } from "~/shared/lib/cn";
import { Uploader } from "../uploader";
import { HTMLAttributes } from "react";
import { ControlProps, ControlProvider } from "./ControlProvider";

export {
	Label, LabelOrError,
	Description, ErrorText
} from './TextControl'

export {
	Previews, AddButton, FilePreview
} from '../uploader'

export type RootProps = ControlProps & Uploader.RootProps & {
	rootProps?: HTMLAttributes<HTMLDivElement>
};

export function Root({ children, name, id, rootProps, ...props }: RootProps) {
	const { input: { onChange } } = useField(name)

	return (
		<ControlProvider name={name} id={id}>
			<Uploader.Root
				name={name} {...props}
				onChange={files => {
					onChange(files);
					props?.onChange?.(files);
				}}
			>
				<div {...rootProps} className={cn('flex flex-col gap-[0.5rem]', rootProps?.className)}>
					{children}
				</div>
			</Uploader.Root>
		</ControlProvider>
	);
}