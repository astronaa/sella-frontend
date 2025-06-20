"use client";

import { useEffect, useState } from "react";
import { dayJs } from "~/shared/lib/dayjs";
import { Button } from "~/shared/ui/kit/button";
import { Dialog } from "~/shared/ui/kit";
import { PinInput } from "~/shared/ui/kit/pin-input";

interface ConnectAccountDialogProps extends Dialog.BaseDialogProps {
  onActionFulfilled?: () => void;
}

export function VerifyEmailDialogContent({
	onActionFulfilled,
	...props
}: ConnectAccountDialogProps) {
	return (
		<Dialog.Root {...props}>
			<Dialog.Backdrop />

			<Dialog.Positioner>
				<Dialog.Content>
					<Dialog.CloseButton />
					<Dialog.ContentHeading>
						<Dialog.Title>Verify Email</Dialog.Title>
						<Dialog.Description>
              Please check your inbox to continue securing your account.
						</Dialog.Description>
					</Dialog.ContentHeading>

					<div className="flex flex-col items-center gap-[1rem] w-full">
						<PinInput size="2xl" />
						<RepeatCounter />
					</div>

					<Dialog.ContentFooter>
						<Button className="w-full" size="lg" onClick={onActionFulfilled}>
              Continue
						</Button>
					</Dialog.ContentFooter>
				</Dialog.Content>
			</Dialog.Positioner>
		</Dialog.Root>
	);
}

function RepeatCounter() {
	const [timer, setTimer] = useState(60);

	useEffect(() => {
		const timeout = setInterval(() => {
			setTimer((t) => (t > 0 ? t - 1 : 0));
		}, 1000);

		return () => {
			clearInterval(timeout);
		};
	}, []);

	return (
		<p className="text-black-60">
      Didn’t received the code?{" "}
			<span className="text-cyan-100 cursor-pointer">
				{timer
					? `Resend in ${dayJs(timer * 1000).format("mm:ss")}`
					: "Resend now"}
			</span>
		</p>
	);
}
