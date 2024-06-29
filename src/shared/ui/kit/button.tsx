import { ark, type HTMLArkProps } from '@ark-ui/react/factory'
import { forwardRef } from 'react'
import { tv, type VariantProps } from 'tailwind-variants'
import { cn } from '~/shared/lib/cn'

export interface ButtonProps extends ButtonVariantProps, HTMLArkProps<'button'> {
	active?: boolean
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>((props, ref) => {
	const { size, variant, className, colorPalette, active = false, ...buttonProps } = props

	return (
		<ark.button
			className={styles({ size, variant, className, colorPalette })}
			data-selected={active ? true : undefined}
			ref={ref} {...buttonProps}
		/>
	);
})

Button.displayName = 'Button'

export const IconButton = forwardRef<HTMLButtonElement, ButtonProps>(({ className, ...props }, ref) => (
	<Button ref={ref} {...props} className={cn('px-0 border border-secondary', className)} />
));

IconButton.displayName = 'IconButton';

type ButtonVariantProps = VariantProps<typeof styles>

const styles = tv(
	{
		base: [
			'button font-medium gap-[0.25rem] transition',
			'disabled:opacity-50 disabled:cursor-not-allowed'
		],
		defaultVariants: { variant: 'solid', size: 'md', colorPalette: 'accent' },
		variants: {
			variant: {
				solid: [],
				outline: [],
				subtle: [],
				ghost: ['hocus:bg-white/5'],
				action: ['bg-black/50 text-white backdrop-blur-sm']
			},
			size: {
				xs: 'rounded-full h-[1.25rem] min-w-[1.25rem]',
				sm: 'rounded-[0.75rem] px-[1rem] h-[2.375rem] min-w-[2.375rem]',
				md: 'rounded-[0.75rem] px-[1rem] h-[2.8125rem] min-w-[2.8125rem]',
				lg: 'rounded-[1rem] px-[1.25rem] h-[3.125rem] min-w-[3.125rem]',
				xl: 'rounded-[1.25rem] px-[1.5rem] h-[3.4375rem] min-w-[3.4375rem] text-[1.125rem]'
			},
			colorPalette: {
				accent: [],
				gray: [],
				lightgray: [],
				red: [],
				green: [],
				social: []
			}
		},
		compoundVariants: [
			{
				colorPalette: 'accent',
				variant: 'solid',
				className: [
					'bg-accent-100 text-black-100',
					'hocus:bg-accent-hover'
				]
			},
			{
				colorPalette: 'gray',
				variant: 'solid',
				className: [
					'bg-white/[.08] text-white',
					'hocus:bg-white/[.10]',
					'data-[selected]:bg-accent-100 data-[selected]:hocus:bg-accent-100/80',
					'data-[selected]:text-black-100'
				]
			},
			{
				colorPalette: 'lightgray',
				variant: 'solid',
				className: [
					'bg-black-60 text-black disabled:opacity-100',
				]
			},
			{
				colorPalette: 'social',
				variant: 'solid',
				className: [
					'bg-white/10 hocus:bg-white/25'
				]
			},
			{
				colorPalette: 'accent',
				variant: 'outline',
				className: [
					'border border-accent-100 text-accent-100',
					'hocus:border-accent-hover hocus:text-accent-hover'
				]
			},
			{
				colorPalette: 'red',
				variant: 'subtle',
				className: [
					'bg-red-100/[.08] text-red-100',
					'hocus:bg-red-100/[.16]',
					'data-[selected]:bg-red-100 data-[selected]:hocus:bg-red-100/80 data-[selected]:text-white',
					'data-[state=on]:bg-red-100 data-[state=on]:hocus:bg-red-100/80 data-[state=on]:text-white'
				]
			},
			{
				colorPalette: 'green',
				variant: 'subtle',
				className: [
					'bg-green-100/[.08] text-green-100',
					'hocus:bg-green-100/[.16]',
					'data-[selected]:bg-green-100 data-[selected]:hocus:bg-green-100/80 data-[selected]:text-white',
					'data-[state=on]:bg-green-100 data-[state=on]:hocus:bg-green-100/80 data-[state=on]:text-white'
				]
			},
		]
	},
	{ twMerge: true },
)
