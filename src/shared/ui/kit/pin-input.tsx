import { PinInput as ArkPinInput, type PinInputRootProps } from '@ark-ui/react/pin-input'
import { forwardRef, type ReactNode } from 'react'
import { tv, type VariantProps } from 'tailwind-variants'
import { Input } from '~/shared/ui/kit/input'

export interface PinInputProps extends PinInputRootProps, PinInputVariantProps {
	children?: ReactNode
	/**
	 * The number of inputs to render.
	 * @default 4
	 */
	length?: number,
	error?: boolean
}

export const PinInput = forwardRef<HTMLDivElement, PinInputProps>((props, ref) => {
	const { children, className, size = 'xl', length = 4, error = false, placeholder = '', ...rootProps } = props
	const { root, control, input, label } = styles({ size })

	return (
		<ArkPinInput.Root ref={ref} className={root({ className })} {...rootProps}>
			{children && <ArkPinInput.Label className={label()}>{children}</ArkPinInput.Label>}
			<ArkPinInput.Control className={control()}>
				{Array.from({ length }, (_, index) => index).map((id, index) => (
					<ArkPinInput.Input
						asChild className={input()}
						key={id} index={index}
						placeholder={placeholder}
					>
						<Input size={size} error={error} />
					</ArkPinInput.Input>
				))}
			</ArkPinInput.Control>
		</ArkPinInput.Root>
	)
})

PinInput.displayName = 'PinInput'

type PinInputVariantProps = VariantProps<typeof styles>

const styles = tv(
	{
		base: 'pinInput',
		defaultVariants: { size: 'xl' },
		slots: {
			root: 'pinInput__root',
			label: 'pinInput__label',
			input: 'pinInput__input',
			control: 'pinInput__control',
		},
		variants: {
			size: {
				md: {
					root: 'pinInput__root--size_md',
					label: 'pinInput__label--size_md',
					input: 'pinInput__input--size_md',
					control: 'pinInput__control--size_md',
				},
				xl: {
					root: 'pinInput__root--size_xl',
					label: 'pinInput__label--size_xl',
					input: 'pinInput__input--size_xl',
					control: 'pinInput__control--size_xl',
				},
				'2xl': {
					root: 'pinInput__root--size_xl',
					label: 'pinInput__label--size_xl',
					input: 'pinInput__input--size_xl',
					control: 'pinInput__control--size_xl',
				}
			},
		},
	},
	{ twMerge: false },
)
