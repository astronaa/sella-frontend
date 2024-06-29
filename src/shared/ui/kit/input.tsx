import { ark, type HTMLArkProps } from '@ark-ui/react/factory'
import { forwardRef } from 'react'
import { tv, type VariantProps } from 'tailwind-variants'
import { cn } from '~/shared/lib/cn'

export interface InputProps extends InputVariantProps, Omit<HTMLArkProps<'input'>, 'size'> {
	error?: boolean,
}

export const Input = forwardRef<HTMLInputElement, InputProps>((props, ref) => {
	const { size, className, variant, placeholder = '', error = false, ...rest } = props

	return (
		<ark.input
			className={styles({ size, className, variant })}
			placeholder={placeholder}
			data-error={error ? true : undefined}
			ref={ref} {...rest}
		/>
	);
})

Input.displayName = 'Input'

export interface TextAreaProps extends InputVariantProps, Omit<HTMLArkProps<'textarea'>, 'size'> {
	error?: boolean
}

export const TextArea = forwardRef<HTMLTextAreaElement, TextAreaProps>((props, ref) => {
	const { size, className, placeholder = '', error = false, ...rest } = props

	return (
		<ark.textarea
			className={styles({ size, className })}
			placeholder={placeholder}
			data-error={error ? true : undefined}
			ref={ref} {...rest}
		/>
	);
})

TextArea.displayName = 'TextArea'

type InputVariantProps = VariantProps<typeof styles>

const styles = tv(
	{
		base: [
			'text-white outline-none transition leading-[normal] placeholder-black-40 truncate bg-transparent'
		],
		defaultVariants: { 
			variant: 'filled', 
			size: 'md' 
		},
		variants: {
			variant: {
				filled: [
					'bg-white/[.04] text-white border border-transparent outline-none transition leading-[normal] placeholder-black-40',
					'hover:bg-white/[.06]',
					'filled:bg-[#141414] filled:border-secondary',
					'data-[error]:text-error-100 data-[error]:border-error-100 filled:data-[error]:border-error-100 data-[error]:placeholder-error-100',
					'data-[error]:selection:text-white data-[error]:selection:bg-error-100',
					'leading-[1.1]'
				],
				unstyled: []
			},
			size: {
				sm: 'rounded-[0.75rem] min-h-[2.375rem] min-w-[2.375rem] px-[1rem] py-[0.5313rem]',
				md: 'rounded-[0.625rem] min-h-[3.125rem] min-w-[3.125rem] px-[1rem] py-[0.85rem]',
				xl: 'rounded-[0.625rem] min-h-[4.375rem] min-w-[4.375rem] px-[1.625rem] text-[2rem]',
				'2xl': 'rounded-[0.625rem] min-h-[6.25rem] min-w-[4.75rem] px-[1.625rem] text-[2rem]'
			}
		},
	},
	{ twMerge: true },
)

export function InputGroup({ className, ...props }: HTMLArkProps<'div'>) {
	return (
		<ark.div {...props} className={cn('relative', className)} />
	);
}

export function InputAddon({ className, ...props }: HTMLArkProps<'span'>) {
	return (
		<ark.span 
			{...props} 
			className={cn('flex items-center absolute h-full top-0', className)} 
		/>
	);
}