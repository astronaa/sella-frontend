import { ComponentProps, useMemo } from "react";
import { Input as BaseInput, InputGroup } from "../kit/input";
import { Icons } from "../icons";
import { cn } from "~/shared/lib/cn";
import { useControllableState } from "~/shared/lib/use-controllable-state";
import { SearchBarProvider, useSearchBarStrictContext } from "./context";

export interface RootProps extends Omit<
	ComponentProps<typeof InputGroup>,
	'onChange' | 'value' | 'defaultValue'
> {
	defaultValue?: string,
	value?: string,
	onChange?: (value: string) => void
}

export function Root({ children, defaultValue = '', value: v, onChange, ...props }: RootProps) {
	const [value, setValue] = useControllableState({ defaultValue, value: v, onChange });

	const contextValue = useMemo(() => ({
		value, setValue
	}), [value, setValue]);

	return (
		<SearchBarProvider value={contextValue}>
			<InputGroup {...props}>
				{children}

				<RightElement />
			</InputGroup>
		</SearchBarProvider>
	);
}

function RightElement() {
	const { value, setValue } = useSearchBarStrictContext();

	return (
		<span
			className={cn(
				'flex items-center absolute right-0 top-0 bottom-0 w-[2rem]',
				value.length && 'cursor-pointer'
			)}
			onClick={() => value.length && setValue('')}
		>
			{value.length ? (
				<Icons.Close className='size-[1.25rem] text-black-60' />
			) : (
				<Icons.Search className='size-[1rem] text-black-60' />
			)}
		</span>
	);
}

export type InputProps = Omit<
	ComponentProps<typeof BaseInput>,
	'value' | 'onChange' | 'defaultValue'
>;

export function Input({ className, ...props }: InputProps) {
	const { value, setValue } = useSearchBarStrictContext();

	return (
		<BaseInput
			size='sm' {...props}
			value={value} onChange={e => setValue(e.target.value)}
			className={cn(
				'border pe-[2.5rem] w-full',
				'border-secondary bg-white/[.06] placeholder:text-black-60',
				'focus:bg-white/[.06] filled:bg-white/[.06]',
				className
			)}
		/>
	);
}