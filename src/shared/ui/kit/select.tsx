"use client";

import { Select } from "@ark-ui/react/select";
import { forwardRef, type ComponentProps } from "react";
import { tv } from "tailwind-variants";
import { createStyleContext } from "~/shared/lib/create-style-context";
import { resolvedTwConfig } from "~/shared/lib/resolved-tw-config";

const styles = tv(
	{
		base: "select",
		defaultVariants: { size: "md" },
		slots: {
			label: "",
			positioner: "w-[calc(var(--reference-width)+0.25rem*2)]",
			trigger: "min-w-[8.625rem] w-full justify-between [&_svg]:size-[1rem]",
			indicator: "select__indicator",
			clearTrigger: "select__clearTrigger",
			item: [
				"flex items-center cursor-pointer px-[1rem] rounded-[1rem]",
				"hocus:bg-white/[.08]",
				"data-[state=checked]:bg-white/[.12]",
			],
			itemText: "select__itemText",
			itemIndicator: "select__itemIndicator",
			itemGroup: "select__itemGroup flex flex-col w-full gap-[0.25rem]",
			itemGroupLabel: "select__itemGroupLabel",
			content:
        "select__content bg-white/[.04] backdrop-blur-[1rem] rounded-[1rem] pt-[3.5rem]",
			root: "flex flex-col",
			control: "select__control z-dropdown",
			valueText: "select__valueText",
		},
		variants: {
			size: {
				md: {
					label: "",
					positioner: "select__positioner--size_md",
					trigger: "select__trigger--size_md",
					indicator: "select__indicator--size_md",
					clearTrigger: "select__clearTrigger--size_md",
					item: "select__item--size_md",
					itemText: "select__itemText--size_md",
					itemIndicator: "select__itemIndicator--size_md",
					itemGroup: "select__itemGroup--size_md",
					itemGroupLabel: "select__itemGroupLabel--size_md",
					content: "select__content--size_md",
					root: "select__root--size_md",
					control: "select__control--size_md",
					valueText: "select__valueText--size_md",
				},
			},
		},
	},
	{ twMerge: false }
);
const { withProvider, withContext } = createStyleContext(styles);

const BaseRoot = forwardRef<HTMLDivElement, ComponentProps<typeof Select.Root>>(
	({ positioning, ...props }, ref) => (
		<Select.Root
			ref={ref}
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
				...positioning,
			}}
		/>
	)
);

BaseRoot.displayName = "BaseSelectRoot";

const preferedZIndex = Number(resolvedTwConfig.theme.zIndex["dropdown"]) - 1;

const BasePositioner = forwardRef<
  HTMLDivElement,
  ComponentProps<typeof Select.Positioner>
>(({ style, ...props }, ref) => (
	<Select.Positioner
		ref={ref}
		{...props}
		style={{
			...style,
			zIndex: preferedZIndex,
		}}
	/>
));

BasePositioner.displayName = "BaseSelectPositioner";

const WrappedRoot = withProvider(BaseRoot, "root");
export const Root = WrappedRoot as typeof BaseRoot;
export const ClearTrigger = withContext(Select.ClearTrigger, "clearTrigger");
export const Content = withContext(Select.Content, "content");
export const Control = withContext(Select.Control, "control");
export const Indicator = withContext(Select.Indicator, "indicator");
export const Item = withContext(Select.Item, "item");
export const ItemGroup = withContext(Select.ItemGroup, "itemGroup");
export const ItemGroupLabel = withContext(
	Select.ItemGroupLabel,
	"itemGroupLabel"
);
export const ItemIndicator = withContext(Select.ItemIndicator, "itemIndicator");
export const ItemText = withContext(Select.ItemText, "itemText");
export const Label = withContext(Select.Label, "label");
export const Positioner = withContext(BasePositioner, "positioner");
export const Trigger = withContext(Select.Trigger, "trigger");
export const ValueText = withContext(Select.ValueText, "valueText");

// Base select props interface for consistent typing across components
export type BaseSelectProps = ComponentProps<typeof Select.Root>;

export type RootProps = ComponentProps<typeof Root>;
export type ClearTriggerProps = ComponentProps<typeof ClearTrigger>;
export type ContentProps = ComponentProps<typeof Content>;
export type ControlProps = ComponentProps<typeof Control>;
export type IndicatorProps = ComponentProps<typeof Indicator>;
export type ItemProps = ComponentProps<typeof Item>;
export type ItemGroupProps = ComponentProps<typeof ItemGroup>;
export type ItemGroupLabelProps = ComponentProps<typeof ItemGroupLabel>;
export type ItemIndicatorProps = ComponentProps<typeof ItemIndicator>;
export type ItemTextProps = ComponentProps<typeof ItemText>;
export type LabelProps = ComponentProps<typeof Label>;
export type PositionerProps = ComponentProps<typeof Positioner>;
export type TriggerProps = ComponentProps<typeof Trigger>;
export type ValueTextProps = ComponentProps<typeof ValueText>;
