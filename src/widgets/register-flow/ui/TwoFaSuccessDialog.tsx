"use client";

import { DotLottiePlayer } from "@dotlottie/react-player";
import { Button } from "~/shared/ui/kit/button";
import { Dialog } from "~/shared/ui/kit";

interface TwoFaSuccessDialogProps extends Dialog.BaseDialogProps {
  onContinue: () => void;
}

export function TwoFaSuccessDialog({
	onContinue,
	...props
}: TwoFaSuccessDialogProps) {
	return (
		<Dialog.Root {...props}>
			<Dialog.Backdrop />

			<Dialog.Positioner>
				<Dialog.Content>
					<Dialog.CloseButton />

					<Dialog.ContentHeading>
						<Dialog.Title>Account Secured</Dialog.Title>
						<Dialog.Description>
              Your account is now securely set up! Let’s get your shop running.
						</Dialog.Description>
					</Dialog.ContentHeading>

					<DotLottiePlayer
						src="/lottie/key.lottie"
						className="size-[11rem]"
						autoplay
						loop
					/>

					<Dialog.ContentFooter>
						<Dialog.CloseTrigger asChild>
							<Button colorPalette="gray" size="lg" className="w-full">
                Go to Market
							</Button>
						</Dialog.CloseTrigger>
						<Button className="w-full" size="lg" onClick={onContinue}>
              Open Storefront
						</Button>
					</Dialog.ContentFooter>
				</Dialog.Content>
			</Dialog.Positioner>
		</Dialog.Root>
	);
}
