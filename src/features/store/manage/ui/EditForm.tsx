'use client';

import {
	VImageUploader,
	VTextAreaControl,
	VTextControl,
} from '~/shared/ui/validation-inputs';

import { HTMLAttributes, useMemo } from 'react';
import { Form } from 'react-final-form';
import { StoreInputAddon } from '~/entities/store';
import { Store } from '~/shared/api/model';
import { cn } from '~/shared/lib/cn';
import { DividerWithElement } from '~/shared/ui/kit/divider';
import { FormError } from '~/shared/lib/errors';
import { SchemaType, updateStore, validateForm } from '../api';

type EditFormProps = HTMLAttributes<HTMLFormElement> & {
	id: string;
	store: Store,
	onActionFulfilled?: (store: Store) => void;
};

export function EditForm({ onActionFulfilled, store, className, ...props }: EditFormProps) {
	const onSubmit = async (values: SchemaType) => {
		try {
			const result = await updateStore(store, {
				...store,
				...values,
				previewImage: values.previewImage,
			})

			onActionFulfilled?.(result);
		}
		catch (error) {
			if (error instanceof FormError && error.field) {
				return { [error.field]: error.message }
			}
		};
	};

	const initialValues = useMemo(() => {
		const { previewImage: previewImageUrl, ...rest } = store;
		return { previewImageUrl, ...rest }
	}, [store]);

	return (
		<Form
			onSubmit={onSubmit}
			validate={validateForm}
			initialValues={initialValues}
		>
			{({ handleSubmit }) => (
				<form
					{...props} onSubmit={handleSubmit}
					className={cn('flex flex-col w-full gap-[2rem]', className)}
				>
					<DividerWithElement className='gap-[1rem]'>
						<VImageUploader
							label='Storefront Image' name='previewImage'
							className='rounded-full'
							initialImageSrc={initialValues.previewImageUrl ?? undefined}
						/>
					</DividerWithElement>

					<div className='flex gap-[2rem] w-full max-md:flex-col'>
						<VTextControl.Root className='w-full' name='name'>
							<VTextControl.Label>Store Name</VTextControl.Label>
							<VTextControl.Input placeholder="Store Name" />
							<VTextControl.ErrorText />
						</VTextControl.Root>

						<VTextControl.Root className='w-full' name='shortName'>
							<VTextControl.Label>Store URL</VTextControl.Label>
							<StoreInputAddon>
								{({ Component: Addon, inputClassName }) => (
									<VTextControl.Input className={inputClassName}>
										<Addon />
									</VTextControl.Input>
								)}
							</StoreInputAddon>
							<VTextControl.ErrorText />
						</VTextControl.Root>
					</div>

					<VTextAreaControl.Root className='w-full' name='description'>
						<VTextAreaControl.Label>Store Description</VTextAreaControl.Label>
						<VTextAreaControl.Input
							className='h-[6.25rem]'
							placeholder="Can be one sentence, a short paragraph"
						/>
						<VTextAreaControl.ErrorText />
					</VTextAreaControl.Root>
				</form>
			)}
		</Form>
	);
}
