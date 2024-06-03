'use client';

import { HTMLAttributes } from 'react';
import { Form } from 'react-final-form';
import { z } from 'zod';
import { StoreInputAddon } from '~/entities/store';
import { Store } from '~/shared/api/model';
import { cn } from '~/shared/lib/cn';
import { zodValidate } from '~/shared/lib/zod-final-form';
import { DividerWithElement } from '~/shared/ui/kit/divider';

import {
	VImageUploader,
	VTextAreaControl,
	VTextControl,
} from '~/shared/ui/validation-inputs';
import { apiClient } from "~/shared/api/client";
import { queryClient } from "~/shared/config/query-client";
import { useMutation } from "@tanstack/react-query";

export const schema = z.object({
	name: z.string().min(3, 'Min length is 3'),
	shortName: z.string().min(3, 'Min length is 3'),
	description: z.string(),
	previewImage: z.instanceof(File)
});

export type SchemaType = z.infer<typeof schema>

type EditFormProps = HTMLAttributes<HTMLFormElement> & {
	id: string;
	store: Store,
	onActionFulfilled?: (store: SchemaType) => void;
};

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export function EditForm({ onActionFulfilled, store, className, ...props }: EditFormProps) {
	const { mutate: updateStore } = useMutation({
		mutationFn: async (data: SchemaType) => {
			await apiClient.stores.for(store.shortName).update({
				shortName: data.shortName,
				name: data.name,
				description: data.description
			})
			await apiClient.stores.for(store.shortName).setImage(data.previewImage)
		},
		onSuccess: () => queryClient.invalidateQueries({ queryKey: ['stores'] })
	})

	const onSubmit = (values: SchemaType) => {
		const result: SchemaType = {
			...store,
			...values,
			previewImage: values.previewImage,
		}
		updateStore(result)
		onActionFulfilled?.(result);
	};

	return (
		<Form
			onSubmit={onSubmit}
			validate={zodValidate(schema)}
			initialValues={store}
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
