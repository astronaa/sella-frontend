'use client';

import { Dialog } from '~/shared/ui/kit';
import { CreateForm } from './CreateForm';
import { ReactNode } from 'react';
import { Button } from '~/shared/ui/kit/button';
import { Store } from "~/shared/api/client"
import { useDialogState } from '~/shared/lib/dialog';
import { VSubmitButton } from '~/shared/ui/validation-inputs';
import { SchemaType } from '../api';
import { Portal } from '@ark-ui/react';

type CreateDialogProps = Dialog.RootProps & {
	onActionFulfilled?: (store: Store) => void
	cancelButton?: ReactNode,
	triggerElement?: ReactNode,
	initialValues?: Partial<SchemaType>
};

export function CreateDialog({
	onActionFulfilled, cancelButton, triggerElement, initialValues, ...props
}: CreateDialogProps) {
	const { isOpen, handleOpenChange, close } = useDialogState(props)

	const onFormSubmit = (store: Store) => {
		onActionFulfilled?.(store);
		close();
	}

	return (
		<Dialog.Root
			{...props}
			open={isOpen}
			onOpenChange={handleOpenChange}
			unmountOnExit lazyMount
		>
			{triggerElement && (
				<Dialog.Trigger asChild>
					{triggerElement}
				</Dialog.Trigger>
			)}

			<Dialog.Backdrop />

			<Portal>
				<Dialog.Positioner>
					<Dialog.Content className='w-[38.375rem]'>
						<Dialog.CloseButton />

						<Dialog.ContentHeading>
							<Dialog.Title>Storefront Setup</Dialog.Title>
							<Dialog.Description>
								Keep the storefront description catchy and concise.
								Remember, these settings can be changed later through your Seller Dashboard.
							</Dialog.Description>
						</Dialog.ContentHeading>

						<CreateForm.Root
							onActionFulfilled={onFormSubmit}
							initialValues={initialValues}
						>
							<CreateForm.Controls />

							<Dialog.ContentFooter>
								{cancelButton ?? (
									<Dialog.CloseTrigger asChild>
										<Button className='w-full' colorPalette='gray'>
											Cancel
										</Button>
									</Dialog.CloseTrigger>
								)}
								<VSubmitButton className='w-full' size='lg'>
									Create
								</VSubmitButton>
							</Dialog.ContentFooter>
						</CreateForm.Root>
					</Dialog.Content>
				</Dialog.Positioner>
			</Portal>
		</Dialog.Root>
	);
}
