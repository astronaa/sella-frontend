'use client'

import { Portal } from '@ark-ui/react'
import { Tooltip } from '@ark-ui/react/tooltip'
import { Fragment } from 'react'
import { type VariantProps, tv } from 'tailwind-variants'
import { createStyleContext } from '~/shared/lib/create-style-context'
import './tooltip.css';

const tooltip = tv(
	{
		base: 'tooltip',
		slots: {
			trigger: 'tooltip__trigger',
			arrow: 'tooltip__arrow',
			arrowTip: 'tooltip__arrowTip border border-transparent border-l-secondary border-t-secondary',
			positioner: 'tooltip__positioner',
			content: 'tooltip__content bg-[#1f1f1f] rounded-[0.75rem] border border-secondary text-[0.90rem] font-normal',
		},
		variants: {},
	},
	{ twMerge: false },
)
const { withRootProvider, withContext } = createStyleContext(tooltip)

export interface RootProps extends Tooltip.RootProps, VariantProps<typeof tooltip> { }

export const Root = withRootProvider(Tooltip.Root)
export const Arrow = withContext(Tooltip.Arrow, 'arrow')
export const ArrowTip = withContext(Tooltip.ArrowTip, 'arrowTip')
export const Content = withContext(Tooltip.Content, 'content')
export const Positioner = withContext(Tooltip.Positioner, 'positioner')
export const Trigger = withContext(Tooltip.Trigger, 'trigger')

export interface ComposedProps extends RootProps {
	label: React.ReactNode,
	usePortal?: boolean
}

export function Composed({ label, children, usePortal = false, ...props }: ComposedProps) {
	const PortalOrFragment = usePortal ? Portal : Fragment;

	return (
		<Root openDelay={50} closeDelay={500} {...props}>
			<Trigger asChild>
				<div>
					{children}
				</div>
			</Trigger>
			<PortalOrFragment>
				<Positioner className='pointer-events-none'>
					<Content>
						<Arrow>
							<ArrowTip />
						</Arrow>

						{label}
					</Content>
				</Positioner>
			</PortalOrFragment>
		</Root>
	);
}

export {
	TooltipContext as Context,
	type TooltipContextProps as ContextProps,
} from '@ark-ui/react/tooltip'
