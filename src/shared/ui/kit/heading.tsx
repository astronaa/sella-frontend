import { createElement } from 'react'
import { tv, type VariantProps } from 'tailwind-variants'

type As = 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6'

export type HeadingProps = {
	as?: As
} & TextVariantProps & JSX.IntrinsicElements[As]

export const Heading = (props: HeadingProps) => {
	const { as = 'h1', size, className, ...elementProps } = props
	const classes = styles({ size, className })

	return createElement(as, {
		className: classes,
		...elementProps,
	})
}

type TextVariantProps = VariantProps<typeof styles>

const styles = tv(
	{
		base: 'font-semibold font-manrope leading-[1.1]',
		variants: {
			size: {
				xs: 'text-[1.125rem]/[1.3]',
				sm: 'text-[2rem]/[1.1] max-md:text-[1.5rem]/[1.1]',
				md: 'text-[3rem]/[1.1] max-md:text-[2.25rem]/[1.1]',
				lg: 'text-[3.375rem]/[1.1] max-md:text-[2.625rem]/[1.1]',
				xl: 'text-[4.5rem]/[1.1] max-md:text-[3rem]/[1.1]'
			},
		},
		defaultVariants: {
			size: 'md'
		}
	},
	{ twMerge: false },
)
