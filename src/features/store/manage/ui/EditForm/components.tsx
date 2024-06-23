'use client';

import {
	VImageUploader, VTagsInput,
	VTextAreaControl,
	VTextControl
} from "~/shared/ui/validation-inputs";

import { zodValidate } from "~/shared/lib/zod-final-form";
import { updateStore, SchemaType, schema } from "../../api";
import { Store } from "~/shared/api/client"
import { HTMLAttributes, PropsWithChildren, useMemo } from "react";
import { Form, useField } from "react-final-form";
import { cn } from "~/shared/lib/cn";
import { DividerWithElement } from "~/shared/ui/kit/divider";
import { StoreInputAddon } from "~/entities/store";
import { FormError } from "~/shared/lib/errors";

const validate = zodValidate(schema);

export interface RootProps extends PropsWithChildren {
	store: Store
	onActionFulfilled?: (store: Store) => void;
}

export function Root({ onActionFulfilled, children, store }: RootProps) {
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
		}
	}

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
			{() => children}
		</Form>
	)
}

export function Controls({ className, ...props }: HTMLAttributes<HTMLDivElement>) {
	const { input: { value: previewImageUrl } } = useField<string>('previewImageUrl');

	return (
		<div {...props} className={cn('flex flex-col w-full gap-[2rem]', className)}>
			<DividerWithElement className='gap-[1rem]'>
				<VImageUploader
					label='Storefront Image' name='previewImage'
					className='rounded-full'
					initialImageSrc={previewImageUrl ?? undefined}
				/>
			</DividerWithElement>

			<div className='flex gap-[2rem] w-full max-md:flex-col'>
				<VTextControl.Root className='w-full' name='name'>
					<VTextControl.Label>Store Name</VTextControl.Label>
					<VTextControl.Input placeholder="Store Name" />
					<VTextControl.ErrorText />
				</VTextControl.Root>

				<VTextControl.Root className='w-full' name='url'>
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

			<VTextControl.Root name="tagNames">
				<VTextControl.Label>Categories</VTextControl.Label>
				<VTagsInput placeholder="Add category"/>
				<VTextAreaControl.ErrorText/>
			</VTextControl.Root>
		</div>
	);
}