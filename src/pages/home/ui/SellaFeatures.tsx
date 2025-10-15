import { HTMLAttributes } from "react";
import { cn } from "~/shared/lib/cn";
import Image, { StaticImageData } from "next/image";

import ImageNoKyc from "../assets/features/no-kyc.png";
import ImageSellAnything from "../assets/features/sell-anything.png";
import ImageStoreLink from "../assets/features/store-link.png";
import ImageRevenueShare from "../assets/features/revenue-share.png";
import ImageSecure from "../assets/features/secure.png";
import ImageBuyerSellers from "../assets/features/for-buyers-sellers.png";
import { Heading } from "~/shared/ui/kit/heading";

interface Feature {
	title: string;
	description: string;
	image: StaticImageData;
}

const features: Feature[] = [
	{
		title: "No KYC",
		description:
			"Who likes it anyway? Connect your wallet, reserve your unique seller's handle, open your storefront & begin selling!",
		image: ImageNoKyc,
	},
	{
		title: "Sell anything*",
		description:
			"We believe in freedom of commerce, without restrictions. However, illegal or harmful items and services are not permitted!",
		image: ImageSellAnything,
	},

	{
		title: "Memorable store link",
		description:
			"Stand out with a unique, easy-to-remember storefront link. Pick something short and sweet while it’s early!",
		image: ImageStoreLink,
	},

	{
		title: "Tap into a new market",
		description:
			"Expand your business by selling on an emerging 3T market.",
		image: ImageRevenueShare,
	},
	{
		title: "Secure at its core",
		description:
			"Escrow and Dispute System ensures fair transactions, protecting all parties.",
		image: ImageSecure,
	},

	{
		title: "For sellers & buyers",
		description:
			"Our robust security and frictionless transactions benefit all parties involved.",
		image: ImageBuyerSellers,
	},
];

export function SellaFeautes() {
	return (
		<div className="py-32 px-4">
			<div className="flex flex-col flex-grow mx-auto justify-between gap-[3rem] relative w-full max-w-content m-auto pb-20">
				<div className="flex flex-col gap-[1.5rem] w-full">
					<Heading size='lg'>
						Effortless Selling
					</Heading>

					<div className="text-black-60 text-balance md:w-1/2">
						Unlike other platforms out there, we don&apos;t over
						complicate things. We strip away unnecessary complexity,
						focusing instead on what truly matters.
					</div>
				</div>
				<div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-[2.5rem]">
					{features.map((feature, index) => (
						<FeatureCard
							key={index}
							feature={feature}
							className={cn(index < 2 && "xl:col-span-2")}
						/>
					))}
				</div>
			</div>
		</div>
	);
}

interface FeatureCard extends HTMLAttributes<HTMLDivElement> {
	feature: Feature;
}

const FeatureCard = ({ feature, className, ...props }: FeatureCard) => {
	return (
		<div
			{...props}
			className={cn(
				"flex flex-col bg-white/[.04] rounded-[1.25rem] p-[0.5rem] pb-[1rem] gap-[1rem] border border-secondary",
				className
			)}
		>
			<div
				className="flex justify-center w-full h-[15rem] border border-secondary rounded-[1rem]"
				style={{
					background:
						"radial-gradient(81.4% 102.48% at 100% 0%, #FEC80528 0%, #FEC80505 100%), radial-gradient(61.72% 70.71% at 0% 100%, #DF272728 0%, #DF272705 100%)",
				}}
			>
				<Image
					src={feature.image}
					alt={`${feature.title} feature image`}
					className="w-[min(100%,15rem)]"
				/>
			</div>

			<div className="flex flex-col gap-[0.5rem] w-full px-[0.75rem]">
				<h3>{feature.title}</h3>
				<p className="text-black-60">{feature.description}</p>
			</div>
		</div>
	);
};
