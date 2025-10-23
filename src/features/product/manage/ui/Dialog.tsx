'use client';

import { Dialog, Tabs } from '~/shared/ui/kit';
import { ReactNode, useCallback, useRef, useState } from 'react';
import { Product, apiClient } from "~/shared/api/client"
import { DeleteButton } from './DeleteButton';
import { Portal } from '@ark-ui/react';
import { useDialogState } from '~/shared/lib/dialog';
import { VSubmitButton } from '~/shared/ui/validation-inputs';
import { EditForm } from './EditForm';
import { manageProduct, schema, SchemaType } from "~/features/product/manage/api";
import { FormError } from "~/shared/lib/errors";
import { toaster } from "~/shared/ui/toaster";
import { zodValidate } from "~/shared/lib/zod-final-form";
import { productQueries } from "~/entities/product";
import { useRouter } from 'next/navigation';

type ManageDialogProps = Dialog.RootProps & {
	product: Product,
	triggerElement?: ReactNode
};

const zValidate = zodValidate(schema);

export function ManageDialog({ product, triggerElement, ...props }: ManageDialogProps) {
	const [selectedTab, setSelectedTab] = useState('1')
	const [isDeleting, setIsDeleting] = useState(false)
	const validationErrorsRef = useRef<object>()
	const router = useRouter()
	const { isOpen, handleOpenChange, close } = useDialogState(props);

	// Confirmation dialog state
	const confirmDialog = useDialogState();

	const goToInvalidTab = (errorFields: object) => {
		const keys = Object.keys(errorFields);
		if (keys.some(k => ['price', 'name', 'tagNames'].includes(k)) && !keys.some(k => ['description', 'shortDescription'].includes(k))) {
			setSelectedTab('1')
		} else if (keys.some(k => ['description', 'shortDescription'].includes(k)) && !keys.some(k => ['price', 'name', 'tagNames'].includes(k))) {
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
			} else if (error instanceof Error) {
				toaster.error({ title: 'Error updating Product', description: error.message })
			}
		}
	}

	const validate = useCallback((values: object) => {
		const errors = zValidate(values)
		validationErrorsRef.current = errors
		return errors
	}, [validationErrorsRef]);

	const onProductDelete = () => {
		confirmDialog.open();
	}

	const confirmDelete = async () => {
		setIsDeleting(true);
		try {
			const { error } = await apiClient.products.for(product.id).delete();

			if (error) {
				toaster.error({
					title: 'Error deleting product',
					description: error.message || 'Failed to delete product'
				});
				setIsDeleting(false);
				return;
			}

			toaster.success({
				title: 'Product deleted',
				description: 'The product has been successfully removed'
			});

			productQueries.invalidateAll();
			close();
			confirmDialog.close();

			// Redirect to the store page after a short delay to allow the toast to be seen
			setTimeout(() => {
				router.push(`/${product.storeUrl}`);
			}, 500);
		} catch (err) {
			const errorMessage = err instanceof Error ? err.message : 'An unexpected error occurred';
			toaster.error({
				title: 'Error deleting product',
				description: errorMessage
			});
			setIsDeleting(false);
		}
	}

	return (
		<>
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
						<Dialog.Content className='items-start w-[40.625rem] p-[2.1875rem] gap-[2rem]'>
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
									<Tabs.Content value="1"><EditForm.General className='gap-[1rem]' /></Tabs.Content>
									<Tabs.Content value="2"><EditForm.Description className='gap-[1rem]' /></Tabs.Content>
									<Dialog.ContentFooter className="mt-[2rem]">
										<DeleteButton
											productId={product.id}
											onActionFulfilled={onProductDelete}
										/>

										<VSubmitButton className='w-full' size='lg' onClick={() => {
											if (validationErrorsRef.current) {
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

			<Dialog.Root
				open={confirmDialog.isOpen}
				onOpenChange={confirmDialog.handleOpenChange}
				unmountOnExit
				lazyMount
			>
				<Portal>
					<Dialog.Backdrop />
					<Dialog.Positioner>
						<Dialog.Content className='w-[25rem] gap-[1.5rem]'>
							<Dialog.Title>Delete Product</Dialog.Title>
							<p className='text-sm text-white/80'>
								Are you sure you want to delete this product? This action cannot be undone.
							</p>
							<Dialog.ContentFooter className='gap-[1rem] [&>*]:flex-1'>
								<button
									type='button'
									className='px-[1.5rem] py-[0.75rem] rounded-lg border border-white/20 text-white hover:bg-white/5 disabled:opacity-50 disabled:cursor-not-allowed transition'
									onClick={() => confirmDialog.close()}
									disabled={isDeleting}
								>
									Cancel
								</button>
								<button
									type='button'
									className='px-[1.5rem] py-[0.75rem] rounded-lg bg-red-600 text-white hover:bg-red-700 disabled:opacity-50 disabled:cursor-not-allowed transition'
									onClick={confirmDelete}
									disabled={isDeleting}
								>
									{isDeleting ? 'Deleting...' : 'Delete'}
								</button>
							</Dialog.ContentFooter>
						</Dialog.Content>
					</Dialog.Positioner>
				</Portal>
			</Dialog.Root>
		</>
	);
}
