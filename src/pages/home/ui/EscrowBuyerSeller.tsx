import { Button } from "~/shared/ui/kit/button";
import { Background } from "~/shared/ui/gradient-background";
import { Icons } from "~/shared/ui/icons";
import { PropsWithChildren } from "react";
import { Heading } from "~/shared/ui/kit/heading";
import { VideoAnimationPlayer } from "~/shared/ui/video-anim-player";

export function EscrowBuyerSeller() {
	return (
		<div className="flex flex-col relative overflow-hidden rounded-b-[3rem] pt-[7.5rem] max-xl:py-[5rem] rounded-[3rem] px-4 md:m-[1.25rem]">
			<Background />
			<div className="flex flex-grow items-center justify-between gap-[1rem] relative w-full max-w-content m-auto max-lg:justify-center">
				<div className="flex flex-col gap-[3rem] max-w-[35rem] w-full flex-shrink-0">
					<div className="flex flex-col gap-[1.5rem]">
						<Heading size='lg'>
							Escrow at the Core
						</Heading>

						<p className="text-black-60">
							Escrow refers to a neutral third party that holds
							something of value usually cash until a transaction
							between a buyer and seller is complete.
						</p>
					</div>

					<EscrowFeatures />

					<Button className="w-44 max-md:w-full" size="lg">
						Open Storefront
					</Button>
				</div>

				<VideoAnimationPlayer
					src='/videos/ecrow.webm'
					srcHevc='/videos/ecrow.mov'
					className='flex-shrink-0 w-[30rem] xl:w-[48rem] hidden lg:block'
				/>

				{/* <Image
					src={ImageEscrow}
					alt="Escrow image"
					className='flex-shrink-0 w-[30rem] xl:w-[48rem] hidden lg:block'
				/> */}
			</div>
		</div>
	);
}

function EscrowFeatures() {
	return (
		<div className="flex flex-col gap-[1.8rem] max-w-[32rem] ">
			<Feature label="As fair as it gets">
				Unlike other platforms, sella.me prioritizes the security of all
				parties involved. We don&apos;t take sides; our focus is on
				providing a safe and fair environment for everyone
			</Feature>
			<Feature label="Escrow-Protected Transactions">
				Every transaction is safeguarded by established escrow
				procedures. The funds are only released to the seller when the
				buyer confirms receipt of the good or service
			</Feature>
			<Feature label="Efficient Dispute Resolution">
				We review chat history and engage with both parties to help find
				a resolution if a dispute arises. Our approach is based on
				fairness and transparency. Trust matters
			</Feature>
		</div>
	);
}

function Feature({ label, children }: PropsWithChildren<{ label: string }>) {
	return (
		<div className="flex gap-[1rem] items-start min-w-0">
			<Icons.Tick className="text-accent-100 size-[3rem] flex-shrink-0" />
			<p className=" text-black-60 flex flex-col">
				<span className="text-white font-semibold text-lg">
					{label}
				</span>{" "}
				<span>{children}</span>
			</p>
		</div>
	);
}
