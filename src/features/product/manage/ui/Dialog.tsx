'use client';

import { Dialog } from '~/shared/ui/kit';
import { EditForm } from './EditForm';
import { ReactNode, useId } from 'react';
import { Button } from '~/shared/ui/kit/button';
import { Product } from '~/shared/api/model';
import { DeleteButton } from './DeleteButton';
import { Portal } from '@ark-ui/react';

type ManageDialogProps = Dialog.RootProps & {
	product: Product,
	triggerElement?: ReactNode
};

export function ManageDialog({ product, triggerElement, ...props }: ManageDialogProps) {
	const formId = useId();

	const onProductEdit = () => {
		props?.onOpenChange?.({ open: false })
	}

	const onProductDelete = () => {
		props?.onOpenChange?.({ open: false })
	}

	return (
		<Dialog.Root {...props}>
			{triggerElement && (
				<Dialog.Trigger asChild>
					{triggerElement}
				</Dialog.Trigger>
			)}

			<Portal>
				<Dialog.Backdrop />

				<Dialog.Positioner>
					<Dialog.Content className='items-start w-[37.5rem] p-[2.1875rem] gap-[2rem]'>
						<Dialog.CloseButton />

						<Dialog.ContentHeading>
							<Dialog.Title>Product Settings</Dialog.Title>
						</Dialog.ContentHeading>

						<EditForm
							className='gap-[2rem]'
							id={formId} product={product}
							onActionFulfilled={onProductEdit}
						/>

						<Dialog.ContentFooter>
							<DeleteButton
								productId={product.id}
								onActionFulfilled={onProductDelete}
							/>

							<Button form={formId} className='w-full' size='lg'>
								Save and Close
							</Button>
						</Dialog.ContentFooter>
					</Dialog.Content>
				</Dialog.Positioner>
			</Portal>
		</Dialog.Root>
	);
}
