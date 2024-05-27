import Image from "next/image";
import ImageHero from "../assets/hero.webp";
import { Background } from "./SectionBackground";
import { Icons } from "~/shared/ui/icons";
import { PropsWithChildren } from "react";
import { VideoAnimationPlayer } from "~/shared/ui/video-anim-player";
import { Heading } from "~/shared/ui/kit/heading";
import { StorefrontOpenControls } from "~/widgets/storefront-open";

export function CreateStore() {
	return (
		<div className="flex flex-col relative overflow-hidden rounded-b-[3rem] pt-[7.5rem] max-xl:pt-[5rem] rounded-[3rem] px-4 md:mx-[1.25rem]">
			<Background />
			<div className="flex justify-between items-end gap-[1rem] relative w-full max-w-content mx-auto max-lg:justify-center">
				<div className="flex flex-col gap-[3rem] max-w-[35rem] w-full mb-[6.25rem] max-xl:mb-[5rem] flex-shrink-0">
					<div className="flex flex-col gap-[1.5rem]">
						<Heading size='lg'>
							Open your web3 storefront in seconds
						</Heading>

						<p className="text-black-60">
							Become a globally accessible seller, and start your digital
							business today!
						</p>
					</div>

					<CreateStoreFeatures />

					<StorefrontOpenControls />
				</div>

				<VideoAnimationPlayer
					className='flex-shrink-0 w-[26rem] xl:w-[48rem] hidden lg:block'
					src='/videos/hero-anim.webm'
					srcHevc='/videos/hero-anim.mp4'
				>
					<Image
						src={ImageHero}
						alt="Hero image"
						className="size-full"
						quality={100}
					/>
				</VideoAnimationPlayer>
			</div>
		</div>
	);
}

function CreateStoreFeatures() {
	return (
		<div className="flex flex-col gap-[1.8rem] max-w-[25rem]">
			<Feature label="Hassle Free">
				It takes about 30 seconds to get your storefront running
			</Feature>
			<Feature label="Sell Anything">
				From digital goods, to physical items, services and anything else in
				between
			</Feature>
			<Feature label="100% Free">
				Enjoy free usage with no hidden fees — only 1% deducted from each
				successful trade
			</Feature>
		</div>
	);
}

function Feature({ label, children }: PropsWithChildren<{ label: string }>) {
	return (
		<div className="flex gap-[0.75rem] items-center min-w-0">
			<Icons.CircleChecked className="text-accent-100 size-[1.75rem] flex-shrink-0" />
			<p className=" text-black-60 flex flex-col">
				<span className="text-white font-semibold text-lg">{label}</span>{" "}
				<span>{children}</span>
			</p>
		</div>
	)
}
