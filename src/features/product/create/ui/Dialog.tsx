'use client';

import { Dialog } from '~/shared/ui/kit';
import { ReactNode } from 'react';
import { Button } from '~/shared/ui/kit/button';
import { Product } from "~/shared/api/client"
import { useDialogState } from '~/shared/lib/dialog';
import { Portal } from '@ark-ui/react';
import { CreateForm } from './CreateForm';
import { VSubmitButton } from '~/shared/ui/validation-inputs';

type CreateDialogProps = Dialog.RootProps & {
	storeUrl: string,
	onActionFulfilled?: (product: Product) => void
	cancelButton?: ReactNode
	triggerElement?: ReactNode,
	title?: string,
	description?: string
};

export function CreateDialog({
	onActionFulfilled, triggerElement, cancelButton, storeUrl, title, description, ...props
}: CreateDialogProps) {
	const { isOpen, handleOpenChange, close } = useDialogState(props)

	const onFormSubmit = (product: Product) => {
		onActionFulfilled?.(product);
		close();
	}

	return (
		<Dialog.Root
			{...props}
			unmountOnExit lazyMount
			open={isOpen} onOpenChange={handleOpenChange}
		>
			{triggerElement && (
				<Dialog.Trigger asChild>
					{triggerElement}
				</Dialog.Trigger>
			)}

			<Dialog.Backdrop />

			<Portal>
				<Dialog.Positioner>
					<Dialog.Content className='w-[34.375rem] gap-[1.5rem]'>
						<Dialog.CloseButton />

						<Dialog.ContentHeading>
							<Dialog.Title>{title ?? 'Add New Product'}</Dialog.Title>
							<Dialog.Description>
								{description}
							</Dialog.Description>
						</Dialog.ContentHeading>

						<CreateForm.Root
							storeUrl={storeUrl}
							onActionFulfilled={onFormSubmit}
						>
							<CreateForm.Controls
								className='gap-[1rem]'
							/>
							
							<Dialog.ContentFooter>
								{cancelButton ?? (
									<Dialog.CloseTrigger asChild>
										<Button className='w-full' colorPalette='gray'>
											Close
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
