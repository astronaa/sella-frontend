import { Carousel } from "@ark-ui/react/carousel";
import { type ComponentProps } from "react";
import { tv } from "tailwind-variants";
import { createStyleContext } from "~/shared/lib/create-style-context";

const styles = tv(
	{
		base: "carousel",
		defaultVariants: { size: "md" },
		slots: {
			root: "carousel__root",
			viewport: "carousel__viewport",
			itemGroup: "carousel__itemGroup",
			item: "carousel__item",
			nextTrigger: "carousel__nextTrigger",
			prevTrigger: "carousel__prevTrigger",
			indicatorGroup: "carousel__indicatorGroup",
			indicator: "carousel__indicator",
			control: "carousel__control",
		},
		variants: {
			size: {
				sm: {
					root: "carousel__root--size_md bg-red",
					viewport: "carousel__viewport--size_md",
					itemGroup: "carousel__itemGroup--size_md",
					item: "w-full h-[434px] border border-white-04 p-2 rounded-[20px]",
					nextTrigger: "hidden",
					prevTrigger: "hidden",
					indicatorGroup: "w-full flex items-center justify-between",
					indicator: "w-[145.6px] h-[80px] border-none rounded-[16px]",
					control: "bg-transparent w-full h-20 relative mt-6",
				},
				md: {
					root: "carousel__root--size_md bg-red",
					viewport: "carousel__viewport--size_md",
					itemGroup: "carousel__itemGroup--size_md",
					item: "w-full h-[434px] border border-white-04 p-2 rounded-[20px]",
					nextTrigger: "hidden",
					prevTrigger: "hidden",
					indicatorGroup: "w-full flex items-center justify-between",
					indicator: "w-[145.6px] h-[80px] border-none bg-transparent rounded-[16px]",
					control: "bg-transparent w-full h-20 relative mt-6",
				},
			},
		},
	},
	{ twMerge: false }
);
const { withProvider, withContext } = createStyleContext(styles);

export const Root = withProvider(Carousel.Root, "root");
export const Control = withContext(Carousel.Control, "control");
export const Indicator = withContext(Carousel.Indicator, "indicator");
export const IndicatorGroup = withContext(
	Carousel.IndicatorGroup,
	"indicatorGroup"
);
export const Item = withContext(Carousel.Item, "item");
export const ItemGroup = withContext(Carousel.ItemGroup, "itemGroup");
export const NextTrigger = withContext(Carousel.NextTrigger, "nextTrigger");
export const PrevTrigger = withContext(Carousel.PrevTrigger, "prevTrigger");
export const Viewport = withContext(Carousel.Viewport, "viewport");

export type RootProps = ComponentProps<typeof Root>;
export type ControlProps = ComponentProps<typeof Control>
export type IndicatorProps = ComponentProps<typeof Indicator>
export type IndicatorGroupProps = ComponentProps<typeof IndicatorGroup>
export type ItemProps = ComponentProps<typeof Item>
export type ItemGroupProps = ComponentProps<typeof ItemGroup>
export type NextTriggerProps = ComponentProps<typeof NextTrigger>
export type PrevTriggerProps = ComponentProps<typeof PrevTrigger>
export type ViewportProps = ComponentProps<typeof Viewport>
