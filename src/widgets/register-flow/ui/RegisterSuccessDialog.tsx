"use client";

import { DotLottiePlayer } from "@dotlottie/react-player";
import { Button } from "~/shared/ui/kit/button";
import { Dialog } from "~/shared/ui/kit";

interface RegisterSuccessDialog extends Dialog.BaseDialogProps {
  onContinue: () => void;
}

export function RegisterSuccessDialog({
	onContinue,
	...props
}: RegisterSuccessDialog) {
	return (
		<Dialog.Root {...props}>
			<Dialog.Backdrop />

			<Dialog.Positioner>
				<Dialog.Content>
					<Dialog.CloseButton />

					<Dialog.ContentHeading>
						<Dialog.Title>Welcome, @username</Dialog.Title>
						<Dialog.Description>
              This could be the beginning of something special. Just a few more
              formalities, and we&apos;ll have your shop set up in no time.
						</Dialog.Description>
					</Dialog.ContentHeading>

					<DotLottiePlayer
						src="/lottie/chicken.lottie"
						className="size-[11rem]"
						autoplay
						loop
					/>

					<Dialog.ContentFooter>
						<Button className="w-full" size="lg" onClick={onContinue}>
              Continue
						</Button>
					</Dialog.ContentFooter>
				</Dialog.Content>
			</Dialog.Positioner>
		</Dialog.Root>
	);
}
