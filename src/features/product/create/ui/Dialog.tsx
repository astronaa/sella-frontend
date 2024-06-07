'use client';

import { Dialog } from '~/shared/ui/kit';
import { CreateForm } from './CreateForm';
import { ReactNode, useId } from 'react';
import { Button } from '~/shared/ui/kit/button';
import { Product } from '~/shared/api/model';
import { useDialogState } from '~/shared/lib/dialog';
import { Portal } from '@ark-ui/react';

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
	const formId = useId();
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

						<CreateForm
							className='gap-[1rem]'
							id={formId} storeUrl={storeUrl}
							onActionFulfilled={onFormSubmit}
						/>

						<Dialog.ContentFooter>
							{cancelButton ?? (
								<Dialog.CloseTrigger asChild>
									<Button className='w-full' colorPalette='gray'>
										Close
									</Button>
								</Dialog.CloseTrigger>
							)}
							<Button form={formId} className='w-full' size='lg'>
								Continue
							</Button>
						</Dialog.ContentFooter>
					</Dialog.Content>
				</Dialog.Positioner>
			</Portal>
		</Dialog.Root>
	);
}
