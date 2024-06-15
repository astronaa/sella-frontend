import { ComponentProps } from "react";
import { Input as BaseInput, InputGroup } from "../kit/input";
import { Icons } from "../icons";
import { cn } from "~/shared/lib/cn";

export function Root({ children, ...props }: ComponentProps<typeof InputGroup>) {
	return (
		<InputGroup {...props}>
			{children}

			<span className='flex items-center absolute right-0 top-0 bottom-0 w-[2rem] text-black-40'>
				<Icons.Search className='size-[1rem]' />
			</span>
		</InputGroup>
	);
}

export function Input({ className, ...props }: ComponentProps<typeof BaseInput>) {
	return (
		<BaseInput
			size='sm'
			{...props}
			className={cn('border border-secondary pe-[2.5rem] w-full', className)}
		/>
	);
}

export type RootProps = ComponentProps<typeof Root>
export type InputProps = ComponentProps<typeof Input>