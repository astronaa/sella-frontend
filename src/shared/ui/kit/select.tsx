'use client'

import { Select, SelectCollectionItem } from '@ark-ui/react/select'
import { forwardRef, type ComponentProps } from 'react'
import { tv } from 'tailwind-variants'
import { createStyleContext } from '~/shared/lib/create-style-context'
import { resolvedTwConfig } from '~/shared/lib/resolved-tw-config'

const styles = tv(
	{
		base: 'select',
		defaultVariants: { size: 'md', variant: 'noBorder' },
		slots: {
			label: '',
			positioner: 'select__positioner w-[calc(var(--reference-width)+0.25rem*2)]',
			trigger: 'select__trigger',
			indicator: 'select__indicator',
			clearTrigger: 'select__clearTrigger',
			item: [
				'flex items-center cursor-pointer px-[1rem] rounded-[1rem]',
				'hocus:bg-white/[.08]',
				'data-[state=checked]:bg-white/[.12]'
			],
			itemText: 'select__itemText',
			itemIndicator: 'select__itemIndicator',
			itemGroup: 'select__itemGroup flex flex-col w-full gap-[0.25rem]',
			itemGroupLabel: 'select__itemGroupLabel',
			content: 'select__content',
			root: 'select__root flex flex-col',
			control: 'select__control z-dropdown',
			valueText: 'select__valueText',
		},
		variants: {
			variant: {
				border: {
					label: 'text-black-60 font-inter font-semibold text-[1rem]',
					trigger: "border border-white/[.04] bg-white/[.04] rounded-[0.75rem] pl-[1rem] pr-[0.75rem] h-[2.4rem] font-medium",
					content: 'bg-white/[.04] backdrop-blur-[1rem] rounded-[1rem] pt-[3.5rem]',
				},
				noBorder: {
					label: '',
					trigger: 'min-w-[8.625rem] w-full justify-between [&_svg]:size-[1rem]',
					content: 'bg-white/[.04] backdrop-blur-[1rem] rounded-[1rem] pt-[3.5rem]',
				}
			},
			size: {
				md: {
					label: '',
					positioner: 'select__positioner--size_md',
					trigger: 'select__trigger--size_md',
					indicator: 'select__indicator--size_md',
					clearTrigger: 'select__clearTrigger--size_md',
					item: 'select__item--size_md',
					itemText: 'select__itemText--size_md',
					itemIndicator: 'select__itemIndicator--size_md',
					itemGroup: 'select__itemGroup--size_md',
					itemGroupLabel: 'select__itemGroupLabel--size_md',
					content: 'select__content--size_md',
					root: 'select__root--size_md',
					control: 'select__control--size_md',
					valueText: 'select__valueText--size_md',
				},
			},
		},
	},
	{ twMerge: false },
)
const { withProvider, withContext } = createStyleContext(styles)

function BaseRoot<T extends SelectCollectionItem>({
	positioning, ...props }: ComponentProps<typeof Select.Root<T>>
) {
	return (
		<Select.Root<T>
			{...props}
			positioning={{
				gutter: 0,
				getAnchorRect(element) {
					const rect = element?.getBoundingClientRect() ?? null;
					if (rect) {
						rect.height = 0;
						rect.x -= 4;
						rect.y -= 4;
					}
					return rect;
				},
				...positioning
			}}
		/>
	)
}

const preferedZIndex = Number(resolvedTwConfig.theme.zIndex['dropdown']) - 1;

const BasePositioner = forwardRef<
	HTMLDivElement,
	ComponentProps<typeof Select.Positioner>
>(({ style, ...props }, ref) => (
	<Select.Positioner
		ref={ref} {...props}
		style={{
			...style,
			zIndex: preferedZIndex
		}}
	/>
))

BasePositioner.displayName = 'BaseSelectPositioner';

export const Root = withProvider(BaseRoot, 'root')
export const ClearTrigger = withContext(Select.ClearTrigger, 'clearTrigger')
export const Content = withContext(Select.Content, 'content')
export const Control = withContext(Select.Control, 'control')
export const Indicator = withContext(Select.Indicator, 'indicator')
export const Item = withContext(Select.Item, 'item')
export const ItemGroup = withContext(Select.ItemGroup, 'itemGroup')
export const ItemGroupLabel = withContext(Select.ItemGroupLabel, 'itemGroupLabel')
export const ItemIndicator = withContext(Select.ItemIndicator, 'itemIndicator')
export const ItemText = withContext(Select.ItemText, 'itemText')
export const Label = withContext(Select.Label, 'label')
export const Positioner = withContext(BasePositioner, 'positioner')
export const Trigger = withContext(Select.Trigger, 'trigger')
export const ValueText = withContext(Select.ValueText, 'valueText')

export {
	SelectContext as Context,
	SelectHiddenSelect as HiddenSelect,
	type SelectContextProps as ContextProps,
	type SelectHiddenSelectProps as HiddenSelectProps,
} from '@ark-ui/react/select'

export type RootProps = ComponentProps<typeof Root>
export type ClearTriggerProps = ComponentProps<typeof ClearTrigger>
export type ContentProps = ComponentProps<typeof Content>
export type ControlProps = ComponentProps<typeof Control>
export type IndicatorProps = ComponentProps<typeof Indicator>
export type ItemProps = ComponentProps<typeof Item>
export type ItemGroupProps = ComponentProps<typeof ItemGroup>
export type ItemGroupLabelProps = ComponentProps<typeof ItemGroupLabel>
export type ItemIndicatorProps = ComponentProps<typeof ItemIndicator>
export type ItemTextProps = ComponentProps<typeof ItemText>
export type LabelProps = ComponentProps<typeof Label>
export type PositionerProps = ComponentProps<typeof Positioner>
export type TriggerProps = ComponentProps<typeof Trigger>
export type ValueTextProps = ComponentProps<typeof ValueText>
