"use client";

import { useId, useState } from "react";
import { Button } from "~/shared/ui/kit/button";
import { Dialog } from "~/shared/ui/kit";
import { ConnectAccountDialog } from "./ConnectAccountDialog";
import { RegisterForm } from "./RegisterForm";

interface RegisterDialogProps extends Dialog.BaseDialogProps {
  onActionFulfilled?: () => void;
}

export function RegisterDialog(props: RegisterDialogProps) {
	const [isAuthorized, setIsAuthorized] = useState(false);
	const open = !!props?.open;

	const onActionFulfilled = () => {
		props?.onActionFulfilled?.();
	};

	const formId = useId();

	return (
		<>
			<ConnectAccountDialog
				{...props}
				open={open && !isAuthorized}
				onConnectClick={() => setIsAuthorized(true)}
			/>
			<Dialog.Root {...props} open={open && isAuthorized}>
				<Dialog.Backdrop />

				<Dialog.Positioner>
					<Dialog.Content>
						<Dialog.CloseButton />

						<Dialog.ContentHeading>
							<Dialog.Title>First things first</Dialog.Title>
							<Dialog.Description>
                Let&apos;s get you authenticated via Twitter, so we can get the
                ball rolling.
							</Dialog.Description>
						</Dialog.ContentHeading>

						<RegisterForm id={formId} onActionFulfilled={onActionFulfilled} />

						<Dialog.ContentFooter>
							<Button form={formId} className="w-full" size="lg">
                Continue
							</Button>
						</Dialog.ContentFooter>
					</Dialog.Content>
				</Dialog.Positioner>
			</Dialog.Root>
		</>
	);
}
