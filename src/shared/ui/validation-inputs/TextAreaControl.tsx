'use client';

import { InputGroup, TextArea, TextAreaProps } from "../kit/input";
import { useField } from "react-final-form";
import { cn } from "~/shared/lib/cn";
import { ValidationStatusIcon } from "./ValidationStatusIcon";
import { useFormControlStrictContext } from "./ControlProvider";
import { shouldRenderFieldError } from "./error";

export {
	Root, Label, LabelOrError,
	Description, ErrorText
} from './TextControl'

export function Input({ children, className, ...props }: Omit<TextAreaProps, 'error' | 'id'>) {
	const { id, name } = useFormControlStrictContext();
	const { meta: fieldState, input: { onChange, ...fieldProps } } = useField(name);
	const shouldRender = shouldRenderFieldError(fieldState);

	return (
		<InputGroup>
			{children}
			<TextArea
				{...props}
				{...fieldProps}
				onChange={e => {
					onChange(e);
					props?.onChange?.(e);
				}}
				id={id} error={shouldRender}
				className={cn('w-full pe-[3rem]', className)}
			/>
			<ValidationStatusIcon name={name} className='absolute h-full right-2 top-0 items-start pt-[1rem]' />
		</InputGroup>
	);
}
