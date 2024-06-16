import { ComponentProps, useMemo } from "react";
import { Input as BaseInput, InputGroup } from "../kit/input";
import { Icons } from "../icons";
import { cn } from "~/shared/lib/cn";
import { useControllableState } from "~/shared/lib/use-controllable-state";
import { SearchBarContextProvider, useSearchBarContext } from "./context";

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
		<SearchBarContextProvider value={contextValue}>
			<InputGroup {...props}>
				{children}

				<RightElement />
			</InputGroup>
		</SearchBarContextProvider>
	);
}

function RightElement() {
	const { value, setValue } = useSearchBarContext();

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
				<Icons.Search className='size-[1rem] text-black-40' />
			)}
		</span>
	);
}

export function Input(
	{ className, ...props }: Omit<ComponentProps<typeof BaseInput>, 'value' | 'onChange' | 'defaultValue'>
) {
	const { value, setValue } = useSearchBarContext();

	return (
		<BaseInput
			size='sm' {...props}
			value={value} onChange={e => setValue(e.target.value)}
			className={cn('border border-secondary pe-[2.5rem] w-full', className)}
		/>
	);
}

export type InputProps = ComponentProps<typeof Input>