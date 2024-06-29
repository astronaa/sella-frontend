'use client'

import { Collapsible } from '@ark-ui/react/collapsible'
import type { ComponentProps } from 'react'
import { tv } from 'tailwind-variants'
import { createStyleContext } from '~/shared/lib/create-style-context'

const styles = tv(
	{
		base: 'collapsible',
		slots: {
			root: 'collapsible__root',
			trigger: 'collapsible__trigger',
			content: 'collapsible__content',
		},
		variants: {},
	},
	{ twMerge: false },
)
const { withProvider, withContext } = createStyleContext(styles)

export const Root = withProvider(Collapsible.Root, 'root')
export const Content = withContext(Collapsible.Content, 'content')
export const Trigger = withContext(Collapsible.Trigger, 'trigger')

export {
	CollapsibleContext as Context,
	type CollapsibleContextProps as ContextProps,
} from '@ark-ui/react/collapsible'

export type RootProps = ComponentProps<typeof Root>
export type ContentProps = ComponentProps<typeof Content>
export type TriggerProps = ComponentProps<typeof Trigger>
