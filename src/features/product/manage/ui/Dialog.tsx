'use client';

import {Dialog, Tabs} from '~/shared/ui/kit';
import { ReactNode } from 'react';
import { Product } from "~/shared/api/client"
import { DeleteButton } from './DeleteButton';
import { Portal } from '@ark-ui/react';
import { useDialogState } from '~/shared/lib/dialog';
import { VSubmitButton } from '~/shared/ui/validation-inputs';
import { EditForm } from './EditForm';

type ManageDialogProps = Dialog.RootProps & {
	product: Product,
	triggerElement?: ReactNode
};

export function ManageDialog({ product, triggerElement, ...props }: ManageDialogProps) {
	const { isOpen, handleOpenChange, close } = useDialogState(props);

	// eslint-disable-next-line @typescript-eslint/no-unused-vars
	const onProductEdit = (data: Product) => {
		close();
	}

	const onProductDelete = () => {
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

			<Portal>
				<Dialog.Backdrop />

				<Dialog.Positioner>
					<Dialog.Content className='items-start w-[37.5rem] p-[2.1875rem] gap-[2rem]'>
						<Tabs.Root defaultValue="1" className="gap-[1.5rem]">
							<Dialog.CloseButton />

							<Dialog.ContentHeading>
								<Dialog.Title>Product Settings</Dialog.Title>
								<Tabs.List className="w-full">
									<Tabs.Trigger value='1'>
									General Settings
									</Tabs.Trigger>
									<Tabs.Trigger value='2'>
									Images & Description
									</Tabs.Trigger>
									<Tabs.Indicator />
								</Tabs.List>
							</Dialog.ContentHeading>

							<EditForm.Root
								product={product}
								onActionFulfilled={onProductEdit}
							>
								<Tabs.Content value="1"><EditForm.General className='gap-[1rem]'/></Tabs.Content>
								<Tabs.Content value="2"><EditForm.Description className='gap-[1rem]'/></Tabs.Content>
								<Dialog.ContentFooter>
									<DeleteButton
										productId={product.id}
										onActionFulfilled={onProductDelete}
									/>

									<VSubmitButton className='w-full' size='lg'>
									Save and Close
									</VSubmitButton>
								</Dialog.ContentFooter>
							</EditForm.Root>
						</Tabs.Root>
					</Dialog.Content>
				</Dialog.Positioner>
			</Portal>
		</Dialog.Root>
	);
}
