'use client';

import { HTMLAttributes } from 'react';
import { Form } from 'react-final-form';
import { z } from 'zod';
import { Product, Store } from '~/shared/api/model';
import { cn } from '~/shared/lib/cn';
import { zodValidate } from '~/shared/lib/zod-final-form';

import {
	VImageUploader,
	VTextAreaControl,
	VTextControl,
	VUploader
} from '~/shared/ui/validation-inputs';
import { useMutation } from "@tanstack/react-query";
import { apiClient } from "~/shared/api/client";

export const schema = z.object({
	name: z.string({ required_error: 'Name is required' }).min(3, 'Min length is 3'),
	price: z.coerce.number({ message: 'Price is required' }).min(1, 'Min price is 1 USDT'),
	shortDescription: z.string({ required_error: 'Description is required' }),
	description: z.string().optional(),
	previewImage: z.instanceof(File).optional(),
	galleryImages: z.array(z.instanceof(File)).optional()
});

export type SchemaType = z.infer<typeof schema>

type CreateFormProps = HTMLAttributes<HTMLFormElement> & {
	id: string;
	store: Store,
	onActionFulfilled?: (product: Product) => void;
};

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export function CreateForm({ onActionFulfilled, store, className, ...props }: CreateFormProps) {
	const { mutate: createProduct } = useMutation({
		mutationFn: async (values: SchemaType) => {
			const { data, error } = await apiClient.products.create(store.shortName, {
				name: values.name,
				description: values.description,
				price: Number(values.price),
				shortDescription: values.shortDescription
			})

			if(error) 
				throw error;

			await apiClient.products.for(data.id).uploadImages(data, values);

			return data;
		},
		onSuccess: (data) => data && onActionFulfilled?.(data)
	})

	const onSubmit = (values: SchemaType) => {
		createProduct(values)
	};

	return (
		<Form onSubmit={onSubmit} validate={zodValidate(schema)}>
			{({ handleSubmit }) => (
				<form
					{...props} onSubmit={handleSubmit}
					className={cn('flex flex-col w-full gap-[2rem]', className)}
				>
					<div className='flex gap-[2rem] w-full max-md:flex-col'>
						<VImageUploader
							label='Attach Preview' name='previewImage'
							className='flex-shrink-0 size-[11.625rem] rounded-[1.25rem]'
						/>
						<div className='flex flex-col justify-between max-md:gap-[1rem]'>
							<VTextControl.Root className='w-full' name='name'>
								<VTextControl.LabelOrError>
									Product Name
								</VTextControl.LabelOrError>
								<VTextControl.Input placeholder='Enter product name' />
							</VTextControl.Root>

							<VTextControl.Root className='w-full' name='price'>
								<VTextControl.LabelOrError>
									Product Price
								</VTextControl.LabelOrError>
								<VTextControl.Input
									type='number' min={1} step={0.01}
									placeholder='0 USDT'
								/>
							</VTextControl.Root>
						</div>
					</div>

					<VTextControl.Root className='w-full' name='shortDescription'>
						<VTextControl.LabelOrError>
							Product Description
						</VTextControl.LabelOrError>
						<VTextControl.Input placeholder="Let's make it short and sweet!" />
					</VTextControl.Root>

					<VTextAreaControl.Root className='w-full' name='description'>
						<VTextAreaControl.LabelOrError>
							Full Description
						</VTextAreaControl.LabelOrError>
						<VTextAreaControl.Input
							className='h-[5rem]'
							placeholder="Can be one sentence, a short paragraph"
						/>
					</VTextAreaControl.Root>

					<VUploader.Root
						name='galleryImages' multiple
						rootProps={{ className: 'w-full' }}
					>
						<VUploader.LabelOrError>
							Product Images
						</VUploader.LabelOrError>

						<VUploader.Previews>
							<VUploader.AddButton />
						</VUploader.Previews>
					</VUploader.Root>
				</form>
			)}
		</Form>
	);
}
