'use client';

import { HTMLAttributes } from 'react';
import { Form } from 'react-final-form';
import { z } from 'zod';
import { StoreInputAddon } from '~/entities/store';
import { zodValidate } from '~/shared/lib/zod-final-form';
import { DividerWithElement } from '~/shared/ui/kit/divider';
import { VImageUploader, VTextAreaControl, VTextControl } from '~/shared/ui/validation-inputs';
import { useMutation } from "@tanstack/react-query";
import { apiClient } from "~/shared/api/client";
import { Store } from "~/shared/api/model";

export const schema = z.object({
	name: z.string().min(3, 'Min length is 3'),
	shortName: z.string().min(3, 'Min length is 3'),
	description: z.string().min(5, 'Min length is 5'),
	previewImage: z.instanceof(File)
});

export type SchemaType = z.infer<typeof schema>

type CreateFormProps = HTMLAttributes<HTMLFormElement> & {
	id: string;
	onActionFulfilled?: (store?: Store) => void;
};

export function CreateForm({ onActionFulfilled, ...props }: CreateFormProps) {
	const { mutate: createStore, data } = useMutation<Store | undefined, any, SchemaType>({
		mutationFn: async (values: SchemaType) => {
			const { data } = await apiClient.stores.create({
				shortName: values.shortName,
				name: values.name,
				description: values.description
			})

			//TODO should be catch
			if(!data) return

			await apiClient.stores.for(data.shortName).setImage(values.previewImage)

			return {
				...data,
				previewImage: URL.createObjectURL(values.previewImage)
			}
		}
	})

	const onSubmit = (values: SchemaType) => {
		createStore(values)
		onActionFulfilled?.(data);
	};

	return (
		<Form onSubmit={onSubmit} validate={zodValidate(schema)}>
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
							<VTextControl.Input placeholder="Store Name"/>
							<VTextControl.ErrorText/>
						</VTextControl.Root>

						<VTextControl.Root className='w-full' name='shortName'>
							<VTextControl.Label>Store URL</VTextControl.Label>
							<StoreInputAddon>
								{({ Component: Addon, inputClassName }) => (
									<VTextControl.Input className={inputClassName}>
										<Addon/>
									</VTextControl.Input>
								)}
							</StoreInputAddon>
							<VTextControl.ErrorText/>
						</VTextControl.Root>
					</div>

					<VTextAreaControl.Root className='w-full' name='description'>
						<VTextAreaControl.Label>Store Description</VTextAreaControl.Label>
						<VTextAreaControl.Input
							className='h-[6.25rem]'
							placeholder="Can be one sentence, a short paragraph"
						/>
						<VTextAreaControl.ErrorText/>
					</VTextAreaControl.Root>
				</form>
			)}
		</Form>
	);
}
