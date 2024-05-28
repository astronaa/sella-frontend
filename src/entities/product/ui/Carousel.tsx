"use client";

import { HTMLArkProps, ark } from "@ark-ui/react";
import { ProductCarouseProps } from "./Prop";
import { createContext, useContext } from "react";
import { ProductCarousel } from "~/shared/api/model";
import { cn } from "~/shared/lib/cn";
import { invariant } from "~/shared/lib/asserts";
import * as CarouselKit from "~/shared/ui/kit/carousel";
import { IconButton } from "~/shared/ui/kit/button";
import Image from "next/image";

const context = createContext<ProductCarousel | null>(null);

function useComponentContext() {
	const value = useContext(context);
	invariant(value, "Usage useComponentContext outside context");

	return value;
}

export type RootProps = HTMLArkProps<"div"> & ProductCarouseProps;

export function Root({ images, description, className, ...props }: RootProps) {
	return (
		<context.Provider value={{ images, description }}>
			<ark.div
				{...props}
				className={cn(
					"flex flex-col gap-4 lg:gap-6 pb-8 border-b border-white-80",
					className
				)}
			/>
		</context.Provider>
	);
}

export function Carousel(props: CarouselKit.RootProps) {
	const { images } = useComponentContext();
	return (
		<CarouselKit.Root {...props}>
			<CarouselKit.Viewport>
				<CarouselKit.ItemGroup>
					{images.map((image, index) => (
						<CarouselKit.Item key={index} index={index}>
							<Image
								src={image}
								alt={`Slide ${index}`}
								width={0}
								height={0}
								style={{
									height: "100%",
									width: "100%",
									objectFit: "cover",
									borderRadius: "18px",
									border: "1px solid #FFFFFF0A",
								}}
							/>
						</CarouselKit.Item>
					))}
				</CarouselKit.ItemGroup>
				<CarouselKit.Control>
					<CarouselKit.PrevTrigger asChild>
						<IconButton size="sm" variant="ghost" aria-label="Previous Slide">
							<ChevronLeftIcon />
						</IconButton>
					</CarouselKit.PrevTrigger>
					<CarouselKit.IndicatorGroup>
						{images.map((image, index) => (
							<CarouselKit.Indicator
								key={index}
								index={index}
								aria-label={`Goto slide ${index + 1}`}
							>
								<Image
									src={image}
									alt={`Indicator ${index}`}
									width={0}
									height={0}
									style={{
										width: "100%",
										height: "100%",
										borderRadius: "16px",
										objectFit: "cover",
										border: "1px solid #FFFFFF0A",
									}}
								/>
							</CarouselKit.Indicator>
						))}
					</CarouselKit.IndicatorGroup>
					<CarouselKit.NextTrigger asChild>
						<IconButton size="sm" variant="ghost" aria-label="Next Slide">
							<ChevronRightIcon />
						</IconButton>
					</CarouselKit.NextTrigger>
				</CarouselKit.Control>
			</CarouselKit.Viewport>
		</CarouselKit.Root>
	);
}

export const Description = () => {
	const { description } = useComponentContext();
	return (
		<ark.div className="text-[16px]/[24px] font-normal text-black-74 flex flex-col gap-4">
			<span className="line-clamp-5 lg:line-clamp-none">{description}</span>
			<ark.div className="text-[16px]/[20.8px] text-white-100 font-semibold block lg:hidden">Show more...</ark.div>
		</ark.div>
	);
};

const ChevronLeftIcon = () => (
	<svg
		className="size-[1.5rem]"
		xmlns="http://www.w3.org/2000/svg"
		viewBox="0 0 24 24"
	>
		<title>Chevron Left</title>
		<path
			fill="none"
			stroke="currentColor"
			strokeLinecap="round"
			strokeLinejoin="round"
			strokeWidth="2"
			d="m15 18l-6-6l6-6"
		/>
	</svg>
);

const ChevronRightIcon = () => (
	<svg
		className="size-[1.5rem]"
		xmlns="http://www.w3.org/2000/svg"
		viewBox="0 0 24 24"
	>
		<title>Chevron Right</title>
		<path
			fill="none"
			stroke="currentColor"
			strokeLinecap="round"
			strokeLinejoin="round"
			strokeWidth="2"
			d="m9 18l6-6l-6-6"
		/>
	</svg>
);
