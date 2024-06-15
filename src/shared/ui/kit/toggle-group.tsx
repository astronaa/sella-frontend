'use client'

import { ToggleGroup } from '@ark-ui/react/toggle-group'
import type { ComponentProps } from 'react'
import { tv } from 'tailwind-variants'
import { createStyleContext } from '~/shared/lib/create-style-context'

const styles = tv(
	{
		base: 'toggleGroup',
		defaultVariants: { size: 'md', variant: 'solid' },
		slots: {
			root: 'flex',
			item: 'transition'
		},
		variants: {
			variant: {
				solid: {
					item: [
						'border border-transparent rounded-[1.25rem] bg-white/[.08] text-white',
						'hocus:bg-white/[.10] hocus:text-white',
						'data-[state=on]:bg-red-100/[.08] data-[state=on]:text-red-100',
						'data-[state=on]:hocus:bg-red-100/[.16] data-[state=on]:hocus:text-red-100',
						'data-[state=on]:border data-[state=on]:border-red-100'
					]
				},
				unstyled: {}
			},
			size: {
				md: {
					root: 'gap-[0.5rem]',
					item: 'px-[1rem] py-[0.625rem]'
				},
			},
		},
	},
	{ twMerge: false },
)
const { withProvider, withContext } = createStyleContext(styles)

export const Root = withProvider(ToggleGroup.Root, 'root')
export const Item = withContext(ToggleGroup.Item, 'item')

export {
	ToggleGroupContext as Context,
	type ToggleGroupContextProps as ContextProps,
} from '@ark-ui/react/toggle-group'

export type RootProps = ComponentProps<typeof Root>
export type ItemProps = ComponentProps<typeof Item>
