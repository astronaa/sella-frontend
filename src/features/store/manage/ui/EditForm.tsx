'use client';

import {
	VImageUploader,
	VTextAreaControl,
	VTextControl,
} from '~/shared/ui/validation-inputs';

import { HTMLAttributes, useMemo } from 'react';
import { Form } from 'react-final-form';
import { z } from 'zod';
import { StoreInputAddon } from '~/entities/store';
import { Store } from '~/shared/api/model';
import { cn } from '~/shared/lib/cn';
import { zodValidate } from '~/shared/lib/zod-final-form';
import { DividerWithElement } from '~/shared/ui/kit/divider';
import { apiClient } from "~/shared/api/client";
import { queryClient } from "~/shared/config/query-client";
import { useMutation } from "@tanstack/react-query";

const schema = apiClient.stores.schemaCreate.merge(
	z.object({
		previewImage: z.instanceof(File).optional()
	})
);

export type SchemaType = z.infer<typeof schema>

type EditFormProps = HTMLAttributes<HTMLFormElement> & {
	id: string;
	store: Store,
	onActionFulfilled?: (store: Store) => void;
};

const validate = zodValidate(schema)

export function EditForm({ onActionFulfilled, store, className, ...props }: EditFormProps) {
	const { mutateAsync: updateStore } = useMutation({
		mutationFn: async ({ previewImage, ...data }: SchemaType) => {
			const { error } = await apiClient.stores.for(store.shortName)
				.update({
					shortName: data.shortName,
					name: data.name,
					description: data.description
				})

			if (error)
				throw error;

			if (previewImage)
				await apiClient.stores.for(store.shortName).setImage(previewImage)

			return { ...store, ...data }
		},
		onSuccess: () => queryClient.invalidateQueries({ queryKey: ['stores'] })
	})

	const onSubmit = async (values: SchemaType) => {
		const result: SchemaType = {
			...store,
			...values,
			previewImage: values.previewImage,
		}

		try {
			const store = await updateStore(result)
			onActionFulfilled?.(store);
		}
		catch { };
	};

	const initialValues = useMemo(() => {
		const { previewImage: previewImageUrl, ...rest } = store;
		return { previewImageUrl, ...rest }
	}, [store]);

	return (
		<Form
			onSubmit={onSubmit}
			validate={validate}
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
