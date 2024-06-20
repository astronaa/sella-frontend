'use client';

export { Input as TextAreaControl } from './TextAreaControl'

import { cn } from "~/shared/lib/cn";
import { HTMLAttributes } from "react";
import { useField } from "react-final-form";
import { Input as BaseInput, InputGroup, InputProps } from "../kit/input";
import { ValidationStatusIcon } from "./ValidationStatusIcon";
import { FormControlProvider, useFormControlStrictContext, ControlProps } from "./ControlProvider";
import { extractErrorFromFieldState, shouldRenderFieldError } from './error';

export function Root({ name, id, children, className, ...props }: HTMLAttributes<HTMLDivElement> & ControlProps) {
	return (
		<FormControlProvider id={id} name={name}>
			<div {...props} className={cn('flex flex-col gap-[0.5rem]', className)}>
				{children}
			</div>
		</FormControlProvider>
	);
}

export type LabelProps = Omit<HTMLAttributes<HTMLLabelElement>, 'htmlFor'>;

export function Label({ children, ...props }: LabelProps) {
	const { id } = useFormControlStrictContext();

	return (
		<label htmlFor={id} {...props}>
			{children}
		</label>
	);
}

export function LabelOrError({ children, className, ...props }: LabelProps) {
	const { id, name } = useFormControlStrictContext();
	const { meta: fieldState } = useField(name);
	const error = extractErrorFromFieldState(fieldState);
	const shouldRender = shouldRenderFieldError(fieldState);

	return (
		<label htmlFor={id} {...props} className={cn(shouldRender && 'text-error-100', className)}>
			{shouldRender ? error : children}
		</label>
	);
}

export function ErrorText({ className, ...props }: Omit<HTMLAttributes<HTMLSpanElement>, 'children'>) {
	const { name } = useFormControlStrictContext();
	const { meta: fieldState } = useField(name);
	const error = extractErrorFromFieldState(fieldState);
	const shouldRender = shouldRenderFieldError(fieldState);

	return shouldRender && (
		<span {...props} className={cn('text-error-100', className)}>
			{error}
		</span>
	)
}

export function Description({ className, children, ...props }: HTMLAttributes<HTMLSpanElement>) {
	return (
		<span {...props} className={cn('text-black-40', className)}>
			{children}
		</span>
	)
}

export function Input({ children, className, ...props }: Omit<InputProps, 'error' | 'id'>) {
	const { id, name } = useFormControlStrictContext();
	const { meta: fieldState, input: { onChange, ...fieldProps } } = useField(name);
	const shouldRender = shouldRenderFieldError(fieldState);

	return (
		<InputGroup>
			{children}
			<BaseInput
				{...props}
				{...fieldProps}
				onChange={e => {
					onChange(e);
					props?.onChange?.(e);
				}}
				id={id} error={shouldRender}
				className={cn('w-full pe-[3rem]', className)}
			/>
			<ValidationStatusIcon name={name} className='absolute h-full right-2 top-0' />
		</InputGroup>
	);
}
