'use client';

import { Dialog, Tabs } from '~/shared/ui/kit';
import {ReactNode, useRef, useState} from 'react';
import { Button } from '~/shared/ui/kit/button';
import { Product } from "~/shared/api/client"
import { useDialogState } from '~/shared/lib/dialog';
import { Portal } from '@ark-ui/react';
import { CreateForm } from './CreateForm';
import { VSubmitButton } from '~/shared/ui/validation-inputs';
import {createProduct, schema, SchemaType} from "~/features/product/create/api";
import {FormError} from "~/shared/lib/errors";
import {toaster} from "~/shared/ui/toaster";
import {zodValidate} from "~/shared/lib/zod-final-form";

const zValidate = zodValidate(schema);

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
	const [selectedTab, setSelectedTab] = useState('1')
	const validationErrorsRef = useRef<object>()

	const { isOpen, handleOpenChange, close } = useDialogState(props)


	const goToInvalidTab = (errorFields: object) => {
		if(('price' in errorFields || 'name' in errorFields || 'tagNames' in errorFields) && !('shortDescription' in errorFields || 'description' in errorFields)){
			setSelectedTab('1')
		}else if(('shortDescription' in errorFields || 'description' in errorFields) && !('price' in errorFields || 'name' in errorFields || 'tagNames' in errorFields)){
			setSelectedTab('2')
		}
	}

	const onSubmit = async (values: SchemaType) => {
		try {
			const result = await createProduct(storeUrl, values);
			onActionFulfilled?.(result);
			close();
		} catch(error) {
			if (error instanceof FormError) {
				goToInvalidTab(error.fields)
				return error.fields
			}else if (error instanceof Error){
				toaster.error({title: 'Error creating Product', description: error.message})
			}
		}
	}

	const validate = (values: object) => {
		const errors = zValidate(values)
		validationErrorsRef.current = errors
		return errors
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
						<Tabs.Root defaultValue="1" className="gap-[1.5rem]" value={selectedTab} onValueChange={(e) => {
							setSelectedTab(e.value)
						}}>
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
								validate={validate}
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
									<VSubmitButton className='w-full' size='lg' onClick={() => {
										if(validationErrorsRef.current) {
											goToInvalidTab(validationErrorsRef.current)
										}
									}}>
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
