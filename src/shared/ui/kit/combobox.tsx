'use client'

import { Combobox } from '@ark-ui/react/combobox'
import { type VariantProps, tv } from 'tailwind-variants'
import { createStyleContext } from '~/shared/lib/create-style-context'

const combobox = tv(
	{
		base: 'combobox',
		defaultVariants: { size: 'md' },
		slots: {
			root: 'combobox__root',
			label: 'combobox__label',
			input: 'combobox__input',
			positioner: 'combobox__positioner',
			control: 'combobox__control',
			trigger: 'combobox__trigger',
			content: 'combobox__content bg-[#1D1D1D]',
			clearTrigger: 'combobox__clearTrigger',
			item: [
				'combobox__item border border-transparent',
				'data-[highlighted]:border-accent-100 data-[highlighted]:bg-transparent',
			],
			itemText: 'combobox__itemText',
			itemIndicator: 'combobox__itemIndicator',
			itemGroup: 'combobox__itemGroup',
			itemGroupLabel: 'combobox__itemGroupLabel',
		},
		variants: {
			size: {
				md: {
					root: 'combobox__root--size_md',
					label: 'combobox__label--size_md',
					input: 'combobox__input--size_md',
					positioner: 'combobox__positioner--size_md',
					control: 'combobox__control--size_md',
					trigger: 'combobox__trigger--size_md',
					content: 'combobox__content--size_md p-[0.625rem]',
					clearTrigger: 'combobox__clearTrigger--size_md',
					item: 'combobox__item--size_md',
					itemText: 'combobox__itemText--size_md',
					itemIndicator: 'combobox__itemIndicator--size_md',
					itemGroup: 'combobox__itemGroup--size_md',
					itemGroupLabel: 'combobox__itemGroupLabel--size_md',
				}
			},
		},
	},
	{ twMerge: false },
)

const { withProvider, withContext, withRootProvider } = createStyleContext(combobox)

export interface RootProps extends Combobox.RootProps<Combobox.CollectionItem>,
	VariantProps<typeof combobox> { }

export const RootProvider = withRootProvider(Combobox.RootProvider)	
export const Root = withProvider(Combobox.Root, 'root')
export const ClearTrigger = withContext(Combobox.ClearTrigger, 'clearTrigger')
export const Content = withContext(Combobox.Content, 'content')
export const Control = withContext(Combobox.Control, 'control')
export const Input = withContext(Combobox.Input, 'input')
export const ItemGroupLabel = withContext(Combobox.ItemGroupLabel, 'itemGroupLabel')
export const ItemGroup = withContext(Combobox.ItemGroup, 'itemGroup')
export const ItemIndicator = withContext(Combobox.ItemIndicator, 'itemIndicator')
export const Item = withContext(Combobox.Item, 'item')
export const ItemText = withContext(Combobox.ItemText, 'itemText')
export const Label = withContext(Combobox.Label, 'label')
export const Positioner = withContext(Combobox.Positioner, 'positioner')
export const Trigger = withContext(Combobox.Trigger, 'trigger')

export {
	ComboboxContext as Context,
	type ComboboxContextProps as ContextProps,
} from '@ark-ui/react/combobox'

export type {
	ComboboxHighlightChangeDetails as HighlightChangeDetails,
	ComboboxInputValueChangeDetails as InputValueChangeDetails,
	ComboboxOpenChangeDetails as OpenChangeDetails,
	ComboboxValueChangeDetails as ValueChangeDetails,
} from '@ark-ui/react/combobox'
