'use client';

import { Dialog, Tabs } from '~/shared/ui/kit';
import { ReactNode } from 'react';
import { Button } from '~/shared/ui/kit/button';
import { Product } from "~/shared/api/client"
import { useDialogState } from '~/shared/lib/dialog';
import { Portal } from '@ark-ui/react';
import { CreateForm } from './CreateForm';
import { VSubmitButton } from '~/shared/ui/validation-inputs';
import {createProduct, SchemaType} from "~/features/product/create/api";

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

	const onSubmit = async (values: SchemaType) => {
		try {
			const result = await createProduct(storeUrl, values);
			onActionFulfilled?.(result);
			close();
		}
		catch { }
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
						<Tabs.Root defaultValue="1" className="gap-[1.5rem]">
							<Dialog.CloseButton />

							<Dialog.ContentHeading className="w-full">
								<Dialog.Title>{title ?? 'Add New Product'}</Dialog.Title>
								<Dialog.Description>
									{description}
								</Dialog.Description>
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

							<CreateForm.Root
								storeUrl={storeUrl}
								onSubmit={onSubmit}
							>
								<Tabs.Content value="1"><CreateForm.General className='gap-[1rem]'/></Tabs.Content>
								<Tabs.Content value="2"><CreateForm.Description className='gap-[1rem]'/></Tabs.Content>
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
						</Tabs.Root>
					</Dialog.Content>
				</Dialog.Positioner>
			</Portal>
		</Dialog.Root>
	);
}
