'use client'

import { TagsInput } from '@ark-ui/react/tags-input'
import { type VariantProps, tv } from 'tailwind-variants'
import { createStyleContext } from '~/shared/lib/create-style-context'

const tagsInput = tv(
	{
		base: 'tagsInput',
		slots: {
			root: 'tagsInput__root',
			label: 'tagsInput__label',
			control: 'tagsInput__control bg-white/[.04] rounded-[0.625rem] transition hover:bg-white/[.06] border-0 focus-within:border-transparent focus-within:shadow-none text-white p-[0.625rem] gap-[0.75rem] min-h-[58px]',
			input: 'tagsInput__input placeholder-black-40 text-white w-[8rem]',
			clearTrigger: 'tagsInput__clearTrigger',
			item: 'tagsInput__item',
			itemPreview: 'tagsInput__itemPreview gap-[0.5rem] rounded-[0.75rem] bg-white/[.06] border-none px-[1rem] pr-[0.75rem] h-[38px]',
			itemInput: 'tagsInput__itemInput',
			itemText: 'tagsInput__itemText text-white',
			itemDeleteTrigger: 'tagsInput__itemDeleteTrigger',
		},
	},
	{ twMerge: false },
)
const { withProvider, withContext } = createStyleContext(tagsInput)

export interface RootProps extends TagsInput.RootProps, VariantProps<typeof tagsInput> {}
export const Root = withProvider(TagsInput.Root, 'root')
export const RootProdiver = withProvider(TagsInput.RootProvider, 'root')

export const ClearTrigger = withContext(
	TagsInput.ClearTrigger,
	'clearTrigger',
)

export const Control = withContext(
	TagsInput.Control,
	'control',
)

export const Input = withContext(TagsInput.Input, 'input')

export const ItemDeleteTrigger = withContext(
	TagsInput.ItemDeleteTrigger,
	'itemDeleteTrigger',
)

export const ItemInput = withContext(
	TagsInput.ItemInput,
	'itemInput',
)

export const ItemPreview = withContext(
	TagsInput.ItemPreview,
	'itemPreview',
)

export const Item = withContext(TagsInput.Item, 'item')

export const ItemText = withContext(
	TagsInput.ItemText,
	'itemText',
)

export const Label = withContext(TagsInput.Label, 'label')

export {
	TagsInputContext as Context,
	TagsInputHiddenInput as HiddenInput,
	type TagsInputContextProps as ContextProps,
	type TagsInputHiddenInputProps as HiddenInputProps,
} from '@ark-ui/react/tags-input'
