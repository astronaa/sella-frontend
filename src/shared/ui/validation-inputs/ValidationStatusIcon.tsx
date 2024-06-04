'use client';
import { HTMLAttributes } from "react";
import { useField } from "react-final-form";
import { cn } from "~/shared/lib/cn";
import { Icons } from "../icons";
import { shouldRenderFieldError } from "./error";

interface ValidationStatusIconProps extends HTMLAttributes<HTMLDivElement> {
	name: string;
}
export function ValidationStatusIcon({ className, name, ...props }: ValidationStatusIconProps) {
	const {
		meta: fieldState,
		input: fieldProps
	} = useField(name);

	const shouldRenderError = shouldRenderFieldError(fieldState);
	const isValidated = !!(fieldState.modified && fieldState.valid) && fieldProps.value.length > 0;

	return (
		<div
			{...props}
			className={cn('pe-[1rem] flex justify-center items-center', className)}
		>
			<Icons.CircleChecked
				className={cn(
					'text-green-100 opacity-0 transition-all',
					isValidated && 'opacity-100'
				)}
			/>
			<Icons.CircleError
				className={cn(
					'text-error-100 opacity-0 absolute transition-all',
					shouldRenderError && 'opacity-100'
				)}
			/>
		</div>
	);
}
