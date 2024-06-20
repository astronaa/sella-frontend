'use client'

import { Popover } from '@ark-ui/react/popover'
import { tv } from 'tailwind-variants'
import { createStyleContext } from '~/shared/lib/create-style-context'

const popover = tv(
	{
		base: 'popover',
		slots: {
			arrow: 'popover__arrow',
			arrowTip: 'popover__arrowTip',
			anchor: 'popover__anchor',
			trigger: 'popover__trigger',
			indicator: 'popover__indicator',
			positioner: 'popover__positioner',
			content: 'popover__content outline-none',
			title: 'popover__title',
			description: 'popover__description',
			closeTrigger: 'popover__closeTrigger',
		},
		variants: {},
	},
	{ twMerge: false },
)
const { withRootProvider, withContext } = createStyleContext(popover)

export const Root = withRootProvider(Popover.Root)
export const Anchor = withContext(Popover.Anchor, 'anchor')
export const Arrow = withContext(Popover.Arrow, 'arrow')
export const ArrowTip = withContext(Popover.ArrowTip, 'arrowTip')
export const CloseTrigger = withContext(Popover.CloseTrigger, 'closeTrigger')
export const Content = withContext(Popover.Content, 'content')
export const Description = withContext(Popover.Description, 'description')
export const Indicator = withContext(Popover.Indicator, 'indicator')
export const Positioner = withContext(Popover.Positioner, 'positioner')
export const Title = withContext(Popover.Title, 'title')
export const Trigger = withContext(Popover.Trigger, 'trigger')

export {
	PopoverContext as Context,
	type PopoverContextProps as ContextProps,
} from '@ark-ui/react/popover'
