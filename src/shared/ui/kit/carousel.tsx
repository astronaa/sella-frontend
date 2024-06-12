'use client';

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
			indicator: [
				"carousel__indicator transform transition-transform",
				"overflow-hidden border-transparent bg-transparent",
				"data-[current]:border-accent-100"
			],
			control: "carousel__control bg-transparent",
		},
		variants: {
			size: {
				md: {
					root: "carousel__root--size_md bg-red",
					viewport: "carousel__viewport--size_md border border-white/[.04] rounded-[1.25rem]",
					itemGroup: "carousel__itemGroup--size_md",
					item: "p-0 lg:p-2",
					nextTrigger: 'carousel__nextTrigger--size_md',
					prevTrigger: 'carousel__prevTrigger--size_md',
					indicatorGroup: "w-full h-full flex gap-[0.75rem]",
					indicator: [
						"border w-full max-w-[9rem] h-full rounded-[0.75rem] lg:rounded-[1rem]",
						"data-[current]:scale-105",
						"hover:scale-105"
					],
					control: "w-full h-[5rem] relative mt-6",
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
export const IndicatorGroup = withContext(Carousel.IndicatorGroup, "indicatorGroup");
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
