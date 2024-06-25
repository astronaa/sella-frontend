'use client';

import {
	VImageUploader, VTagsInput,
	VTextAreaControl,
	VTextControl,
	VUploader
} from "~/shared/ui/validation-inputs";

import { zodValidate } from "~/shared/lib/zod-final-form";
import { manageProduct, SchemaType, schema } from "../../api";
import { Product } from "~/shared/api/client"
import { HTMLAttributes, PropsWithChildren, useMemo } from "react";
import {Form, useField} from "react-final-form";
import { cn } from "~/shared/lib/cn";
import {FormError} from "~/shared/lib/errors";
import {toaster} from "~/shared/ui/toaster";
import {IconButton} from "~/shared/ui/kit/button";
import { Icons } from "~/shared/ui/icons";

const validate = zodValidate(schema);

export interface RootProps extends PropsWithChildren {
	product: Product;
	onActionFulfilled?: (product: Product) => void;
}

export function Root({ product, onActionFulfilled, children }: RootProps) {
	const onSubmit = async (values: SchemaType) => {
		try {
			const result = await manageProduct(product.id, values);
			onActionFulfilled?.(result);
		}
		catch (error) {
			if (error instanceof FormError) {
				return error.fields
			}else if (error instanceof Error){
				toaster.error({title: 'Error updating Product', description: error.message})
			}
		}
	}

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
			onSubmit={onSubmit} validate={validate}
			initialValues={initialValues}
		>
			{() => children}
		</Form>
	)
}

export function General({ className, ...props }: HTMLAttributes<HTMLDivElement>) {
	const { input: { value: previewImageUrl } } = useField<string>('previewImageUrl');
	return (
		<div {...props} className={cn('flex flex-col w-full gap-[2rem]', className)}>
			<div className='flex gap-[2rem] w-full max-md:flex-col'>
				<VImageUploader
					label='Attach Preview' name='previewImage'
					className='flex-shrink-0 size-[11.625rem] rounded-[1.25rem]'
					initialImageSrc={previewImageUrl ?? undefined}
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

			<VTextControl.Root name="tagNames">
				<VTextControl.Label>Categories</VTextControl.Label>
				<VTagsInput placeholder="Add category"/>
				<VTextAreaControl.ErrorText/>
			</VTextControl.Root>
		</div>
	);
}
export function Description({ className, ...props }: HTMLAttributes<HTMLDivElement>){
	const { input: { value: galleryImagesUrls } } = useField<string>('galleryImagesUrls');
	console.log(galleryImagesUrls)
	return (
		<div {...props} className={cn('flex flex-col w-full gap-[2rem]', className)}>
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

			<ImagesUploader/>
		</div>
	)
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
	)
}
