'use client';

import {Dialog, Tabs} from '~/shared/ui/kit';
import {ReactNode, useRef, useState} from 'react';
import { Product } from "~/shared/api/client"
import { DeleteButton } from './DeleteButton';
import { Portal } from '@ark-ui/react';
import { useDialogState } from '~/shared/lib/dialog';
import { VSubmitButton } from '~/shared/ui/validation-inputs';
import { EditForm } from './EditForm';
import {manageProduct, schema, SchemaType} from "~/features/product/manage/api";
import {FormError} from "~/shared/lib/errors";
import {toaster} from "~/shared/ui/toaster";
import {zodValidate} from "~/shared/lib/zod-final-form";

type ManageDialogProps = Dialog.RootProps & {
	product: Product,
	triggerElement?: ReactNode
};

const zValidate = zodValidate(schema);


export function ManageDialog({ product, triggerElement, ...props }: ManageDialogProps) {
	const [selectedTab, setSelectedTab] = useState('1')
	const validationErrorsRef = useRef<object>()
	const { isOpen, handleOpenChange, close } = useDialogState(props);

	const goToInvalidTab = (errorFields: object) => {
		const keys = Object.keys(errorFields);
		if(keys.some(k => ['price', 'name', 'tagNames'].includes(k)) && !keys.some(k => ['description', 'shortDescription'].includes(k))){
			setSelectedTab('1')
		}else if(keys.some(k => ['description', 'shortDescription'].includes(k)) && !keys.some(k => ['price', 'name', 'tagNames'].includes(k))){
			setSelectedTab('2')
		}
	}
	const onSubmit = async (values: SchemaType) => {
		try {
			await manageProduct(product.id, values);
			close();
		}
		catch (error) {
			if (error instanceof FormError) {
				goToInvalidTab(error.fields)
				return error.fields
			}else if (error instanceof Error){
				toaster.error({title: 'Error updating Product', description: error.message})
			}
		}
	}
	const validate = (values: object) => {
		const errors = zValidate(values)
		validationErrorsRef.current = errors
		return errors
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
						<Tabs.Root defaultValue="1" className="gap-[1.5rem]" value={selectedTab} onValueChange={(e) => {
							setSelectedTab(e.value)
						}}>
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
								onSubmit={onSubmit}
								validate={validate}
							>
								<Tabs.Content value="1"><EditForm.General className='gap-[1rem]'/></Tabs.Content>
								<Tabs.Content value="2"><EditForm.Description className='gap-[1rem]'/></Tabs.Content>
								<Dialog.ContentFooter className="mt-[2rem]">
									<DeleteButton
										productId={product.id}
										onActionFulfilled={onProductDelete}
									/>

									<VSubmitButton className='w-full' size='lg' onClick={() => {
										if(validationErrorsRef.current) {
											goToInvalidTab(validationErrorsRef.current)
										}
									}}>
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
