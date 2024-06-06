'use client';

import { HTMLAttributes, useMemo } from 'react';
import { Form, useField } from 'react-final-form';
import { z } from 'zod';
import { Product } from '~/shared/api/model';
import { cn } from '~/shared/lib/cn';
import { zodValidate } from '~/shared/lib/zod-final-form';

import {
	VImageUploader,
	VTextAreaControl,
	VTextControl,
	VUploader
} from '~/shared/ui/validation-inputs';
import { apiClient } from "~/shared/api/client";
import { queryClient } from "~/shared/config/query-client";
import { useMutation } from "@tanstack/react-query";
import { IconButton } from '~/shared/ui/kit/button';
import { Icons } from '~/shared/ui/icons';
import { mapMediaUrlToId } from '~/shared/api/client/shared/mappers';

export const schema = z.object({
	name: z.string({ required_error: 'Name is required' }).min(3, 'Min length is 3'),
	price: z.coerce.number({ message: 'Price is required' }).min(1, 'Min price is 1 USDT'),
	shortDescription: z.string({ required_error: 'Description is required' }),
	description: z.string().optional(),
	previewImage: z.instanceof(File).optional().nullable(),
	galleryImages: z.array(z.instanceof(File)).optional(),
	galleryImagesUrls: z.array(z.string())
});

export type SchemaType = z.infer<typeof schema>

type EditFormProps = HTMLAttributes<HTMLFormElement> & {
	id: string;
	product: Product,
	onActionFulfilled?: (product: Product) => void;
};

export function EditForm({ onActionFulfilled, product, className, ...props }: EditFormProps) {
	const { mutate: updateProduct } = useMutation({
		mutationFn: async (values: SchemaType) => {
			const { data, error } = await apiClient.products.for(product.id).update({
				name: values.name,
				description: values.description,
				price: Number(values.price),
				shortDescription: values.shortDescription
			})

			if (error)
				throw error;

			await apiClient.products.for(product.id).uploadImages(product, {
				previewImage: values.previewImage,
				galleryImages: [
					...values.galleryImagesUrls.map(mapMediaUrlToId), 
					...values.galleryImages ?? []
				]
			});

			return data
		},
		onSuccess: (data) => {
			queryClient.invalidateQueries({ queryKey: ['products'] })
			onActionFulfilled?.(data)
		}
	})

	const onSubmit = (values: SchemaType) => {
		updateProduct(values)
	};

	const initialValues = useMemo(() => {
		const {
			previewImage: previewImageUrl,
			galleryImages: galleryImagesUrls,
			...rest
		} = product;

		return { previewImageUrl, galleryImagesUrls, ...rest }
	}, [product]);

	return (
		<Form
			onSubmit={onSubmit}
			validate={zodValidate(schema)}
			initialValues={initialValues}
		>
			{({ handleSubmit }) => (
				<form
					{...props} onSubmit={handleSubmit}
					className={cn('flex flex-col w-full gap-[2rem]', className)}
				>
					<div className='flex gap-[2rem] w-full max-md:flex-col'>
						<VImageUploader
							label='Attach Preview' name='previewImage'
							className='flex-shrink-0 size-[11.625rem] rounded-[1.25rem]'
							initialImageSrc={initialValues.previewImageUrl ?? undefined}
						/>
						<div className='flex flex-col justify-between w-full max-md:gap-[2rem]'>
							<VTextControl.Root className='w-full' name='name'>
								<VTextControl.LabelOrError>
									Product Name
								</VTextControl.LabelOrError>
								<VTextControl.Input />
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

					<ImagesUploader />
				</form>
			)}
		</Form>
	);
}

function ImagesUploader() {
	const {
		input: { value: images, onChange: setImages }
	} = useField<string[]>('galleryImagesUrls')

	return (
		<VUploader.Root
			name='galleryImages' multiple
			rootProps={{ className: 'w-full' }}
		>
			<VUploader.LabelOrError>
				Product Images
			</VUploader.LabelOrError>

			<VUploader.Previews
				className='grid-cols-6'
				prevSlot={images.map(imgUrl => (
					<VUploader.FilePreview
						key={imgUrl}
						file={{ name: 'image.jpg', url: imgUrl }}
						renderActionBar={
							<IconButton
								variant='action' size='xs' type='button'
								onClick={() => setImages(images.filter(i => i !== imgUrl))}
							>
								<Icons.Close className='size-[1.25rem]' />
							</IconButton>
						}
					/>
				))}
			>
				<VUploader.AddButton />
			</VUploader.Previews>
		</VUploader.Root>
	);
}
