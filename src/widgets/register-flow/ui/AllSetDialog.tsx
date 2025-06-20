"use client";

import { DotLottiePlayer } from "@dotlottie/react-player";
import { Button } from "~/shared/ui/kit/button";
import { Dialog } from "~/shared/ui/kit";

export function AllSetDialog(props: Dialog.BaseDialogProps) {
	return (
		<Dialog.Root {...props}>
			<Dialog.Backdrop />

			<Dialog.Positioner>
				<Dialog.Content>
					<Dialog.CloseButton />

					<Dialog.ContentHeading>
						<Dialog.Title>All set!</Dialog.Title>
						<Dialog.Description>
              We hope Sella.me will be the start of something great for you!
              Good luck! Head to your dashboard to continue adding more products
              to your storefront.
						</Dialog.Description>
					</Dialog.ContentHeading>

					<DotLottiePlayer
						src="/lottie/money.lottie"
						className="size-[11rem]"
						autoplay
						loop
					/>

					<Dialog.ContentFooter>
						<Dialog.CloseTrigger asChild>
							<Button className="w-full" size="lg">
                Continue
							</Button>
						</Dialog.CloseTrigger>
					</Dialog.ContentFooter>
				</Dialog.Content>
			</Dialog.Positioner>
		</Dialog.Root>
	);
}
