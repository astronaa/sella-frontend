'use client'

import { tv } from 'tailwind-variants'
import { ComponentProps } from 'react'
import { Tabs } from '@ark-ui/react/tabs'
import { createStyleContext } from '~/shared/lib/create-style-context'

const tabs = tv(
	{
		base: 'tabs',
		defaultVariants: { size: 'md', variant: 'enclosed' },
		slots: {
			root: 'tabs__root',
			list: 'tabs__list',
			trigger: '',
			content: 'tabs__content',
			indicator: 'tabs__indicator',
		},
		variants: {
			variant: {
				enclosed: {
					root: '',
					list: 'border border-secondary',
					trigger: 'text-white w-full',
					content: 'tabs__content--variant_enclosed',
					indicator: 'tabs__indicator--variant_enclosed bg-white/[.06]',
				},
			},
			size: {
				md: {
					root: 'tabs__root--size_md',
					list: 'p-[0.25rem] rounded-[1.5rem] h-[3.625rem] gap-[0.25rem]',
					trigger: 'tabs__trigger--size_md px-[1rem]',
					content: 'tabs__content--size_md',
					indicator: 'tabs__indicator--size_md rounded-[1.25rem]',
				}
			},
		},
	},
	{ twMerge: true },
)
const { withProvider, withContext } = createStyleContext(tabs)

export const Root = withProvider(Tabs.Root, 'root')
export const Content = withContext(Tabs.Content, 'content')
export const Indicator = withContext(Tabs.Indicator,'indicator')
export const List = withContext(Tabs.List, 'list')
export const Trigger = withContext(Tabs.Trigger, 'trigger')

export { 
	TabsContext as Context, 
	type TabsContextProps as ContextProps 
} from '@ark-ui/react/tabs'

export type RootProps = ComponentProps<typeof Root>
export type ContentProps = ComponentProps<typeof Content>
export type IndicatorProps = ComponentProps<typeof Indicator>
export type ListProps = ComponentProps<typeof List>
export type TriggerProps = ComponentProps<typeof Trigger>