"use client";

import { Dialog } from "~/shared/ui/kit";
import { EditForm } from "./EditForm";
import { ReactNode, useId } from "react";
import { Button } from "~/shared/ui/kit/button";
import { Store } from "~/shared/api/model";
import { DeleteButton } from "./DeleteButton";

interface ManageDialogProps extends Dialog.BaseDialogProps {
  store: Store;
  triggerElement?: ReactNode;
}

export function ManageDialog({
	store,
	triggerElement,
	...props
}: ManageDialogProps) {
	const formId = useId();

	const onStoreEdit = () => {
		props?.onOpenChange?.({ open: false });
	};

	const onStoreDelete = () => {
		props?.onOpenChange?.({ open: false });
	};

	return (
		<Dialog.Root {...props}>
			{triggerElement && (
				<Dialog.Trigger asChild>{triggerElement}</Dialog.Trigger>
			)}

			<Dialog.Backdrop />

			<Dialog.Positioner>
				<Dialog.Content className="items-start w-[37.5rem] p-[2.1875rem] gap-[2rem]">
					<Dialog.CloseButton />

					<Dialog.ContentHeading>
						<Dialog.Title>Storefront Settings</Dialog.Title>
					</Dialog.ContentHeading>

					<EditForm
						className="gap-[2rem]"
						id={formId}
						store={store}
						onActionFulfilled={onStoreEdit}
					/>

					<Dialog.ContentFooter>
						<DeleteButton
							storeId={store.id}
							onActionFulfilled={onStoreDelete}
						/>

						<Button form={formId} className="w-full" size="lg">
              Save and Close
						</Button>
					</Dialog.ContentFooter>
				</Dialog.Content>
			</Dialog.Positioner>
		</Dialog.Root>
	);
}
