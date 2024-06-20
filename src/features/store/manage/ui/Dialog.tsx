'use client';

import { Dialog } from '~/shared/ui/kit';
import { EditForm } from './EditForm';
import { ReactNode } from 'react';
import { Store } from "~/shared/api/client"
import { DeleteButton } from './DeleteButton';
import { useDialogState } from '~/shared/lib/dialog';
import { VSubmitButton } from '~/shared/ui/validation-inputs';

type ManageDialogProps = Dialog.RootProps & {
	store: Store,
	triggerElement?: ReactNode,
	onActionDeleteFulfilled?: () => void,
	onActionEditFulfilled?: (store: Store) => void
};

export function ManageDialog({
	store, triggerElement,
	onActionDeleteFulfilled,
	onActionEditFulfilled,
	...props
}: ManageDialogProps) {
	const { isOpen, handleOpenChange, close } = useDialogState(props)

	const onStoreEdit = (store: Store) => {
		onActionEditFulfilled?.(store);
		close();
	}

	const onStoreDelete = () => {
		onActionDeleteFulfilled?.();
		close();
	}

	return (
		<Dialog.Root
			{...props} unmountOnExit lazyMount
			open={isOpen} onOpenChange={handleOpenChange}
		>
			{triggerElement && (
				<Dialog.Trigger asChild>
					{triggerElement}
				</Dialog.Trigger>
			)}

			<Dialog.Backdrop />

			<Dialog.Positioner>
				<Dialog.Content className='items-start w-[37.5rem] p-[2.1875rem] gap-[2rem]'>
					<Dialog.CloseButton />

					<Dialog.ContentHeading>
						<Dialog.Title>Storefront Settings</Dialog.Title>
					</Dialog.ContentHeading>

					<EditForm.Root
						store={store}
						onActionFulfilled={onStoreEdit}
					>
						<EditForm.Controls
							className='gap-[2rem]'
						/>

						<Dialog.ContentFooter>
							<DeleteButton
								storeUrl={store.shortName}
								onActionFulfilled={onStoreDelete}
							/>

							<VSubmitButton className='w-full' size='lg'>
								Save and Close
							</VSubmitButton>
						</Dialog.ContentFooter>
					</EditForm.Root>
				</Dialog.Content>
			</Dialog.Positioner>
		</Dialog.Root>
	);
}
