'use client';

import { HTMLAttributes } from 'react';
import { Form } from 'react-final-form';
import { StoreInputAddon } from '~/entities/store';
import { DividerWithElement } from '~/shared/ui/kit/divider';
import { VImageUploader, VTextAreaControl, VTextControl } from '~/shared/ui/validation-inputs';
import { Store } from "~/shared/api/model";
import { FormError } from '~/shared/lib/errors';
import { SchemaType, createStore, validateForm } from '../api';

type CreateFormProps = HTMLAttributes<HTMLFormElement> & {
	id: string;
	onActionFulfilled?: (store?: Store) => void;
};

export function CreateForm({ onActionFulfilled, ...props }: CreateFormProps) {
	const onSubmit = async (values: SchemaType) => {
		try {
			const result = await createStore(values);
			onActionFulfilled?.(result);
		}
		catch (error) {
			if (error instanceof FormError && error.field) {
				return { [error.field]: error.message }
			}
		};
	};

	return (
		<Form onSubmit={onSubmit} validate={validateForm}>
			{({ handleSubmit }) => (
				<form
					className='flex flex-col w-full gap-[2rem]'
					{...props}
					onSubmit={handleSubmit}
				>
					<DividerWithElement className='gap-[1rem] mb-[1rem]'>
						<VImageUploader
							label='Storefront Image' name='previewImage'
							className='rounded-full'
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
