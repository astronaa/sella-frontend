'use client'

import { Clipboard } from '@ark-ui/react/clipboard'
import type { ComponentProps } from 'react'
import { createStyleContext } from '~/shared/lib/create-style-context'
import { tv } from 'tailwind-variants'

const styles = tv(
	{
		base: 'clipboard',
		slots: {
			root: 'clipboard__root',
			trigger: 'clipboard__trigger',
			control: 'clipboard__control',
			indicator: 'clipboard__indicator',
			input: 'clipboard__input',
			label: 'clipboard__label',
		},
		variants: {},
	},
	{ twMerge: false },
)
const { withProvider, withContext } = createStyleContext(styles)

export const Root = withProvider(Clipboard.Root, 'root')
export const Control = withContext(Clipboard.Control, 'control')
export const Indicator = withContext(Clipboard.Indicator, 'indicator')
export const Input = withContext(Clipboard.Input, 'input')
export const Label = withContext(Clipboard.Label, 'label')
export const Trigger = withContext(Clipboard.Trigger, 'trigger')

export type RootProps = ComponentProps<typeof Root>
export type ControlProps = ComponentProps<typeof Control>
export type IndicatorProps = ComponentProps<typeof Indicator>
export type InputProps = ComponentProps<typeof Input>
export type LabelProps = ComponentProps<typeof Label>
export type TriggerProps = ComponentProps<typeof Trigger>
