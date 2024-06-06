'use client';

import { Dialog } from '~/shared/ui/kit';
import { CreateForm } from './CreateForm';
import { ReactNode, useId } from 'react';
import { Button } from '~/shared/ui/kit/button';
import { Store } from "~/shared/api/model";

type CreateDialogProps = Dialog.RootProps & {
	onActionFulfilled?: (store?: Store) => void
	cancelButton?: ReactNode,
	triggerElement?: ReactNode
};

export function CreateDialog({ onActionFulfilled, cancelButton, triggerElement, ...props }: CreateDialogProps) {
	const formId = useId();

	return (
		<Dialog.Root {...props}>
			{triggerElement && (
				<Dialog.Trigger asChild>
					{triggerElement}
				</Dialog.Trigger>
			)}

			<Dialog.Backdrop />

			<Dialog.Positioner>
				<Dialog.Content className='w-[34.375rem]'>
					<Dialog.CloseButton />

					<Dialog.ContentHeading>
						<Dialog.Title>Storefront Setup</Dialog.Title>
						<Dialog.Description>
							Keep the storefront description catchy and concise.
							Remember, these settings can be changed later through your Seller Dashboard.
						</Dialog.Description>
					</Dialog.ContentHeading>

					<CreateForm
						id={formId}
						onActionFulfilled={onActionFulfilled}
					/>

					<Dialog.ContentFooter>
						{cancelButton ?? (
							<Dialog.CloseTrigger asChild>
								<Button id={formId} className='w-full' colorPalette='gray'>
									Cancel
								</Button>
							</Dialog.CloseTrigger>
						)}
						<Button form={formId} className='w-full' size='lg'>
							Continue
						</Button>
					</Dialog.ContentFooter>
				</Dialog.Content>
			</Dialog.Positioner>
		</Dialog.Root>
	);
}
