'use client';

import {
	VImageUploader,
	VTextAreaControl,
	VTextControl
} from "~/shared/ui/validation-inputs";

import { zodValidate } from "~/shared/lib/zod-final-form";
import { createStore, SchemaType, schema } from "../../api";
import { Store } from "~/shared/api/client"
import { HTMLAttributes, PropsWithChildren } from "react";
import { Form } from "react-final-form";
import { cn } from "~/shared/lib/cn";
import { DividerWithElement } from "~/shared/ui/kit/divider";
import { StoreInputAddon } from "~/entities/store";
import { FormError } from "~/shared/lib/errors";
import { toaster } from "~/shared/ui/toaster";
import { CategoryVTagsInput } from "~/entities/category";

const validate = zodValidate(schema);

export interface RootProps extends PropsWithChildren {
	onActionFulfilled?: (store: Store) => void;
	initialValues?: Partial<SchemaType>
}

export function Root({ onActionFulfilled, children, initialValues }: RootProps) {
	const onSubmit = async (values: SchemaType) => {
		try {
			const result = await createStore(values);
			onActionFulfilled?.(result);
		}
		catch (error) {
			if (error instanceof FormError) {
				return error.fields
			} else if (error instanceof Error) {
				toaster.error({ title: 'Error creating Store', description: error.message })
			}
		}
	}

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
	return (
		<div {...props} className={cn('flex flex-col w-full gap-[1.5rem]', className)}>
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
				<CategoryVTagsInput placeholder="Add category" />
				<VTextAreaControl.ErrorText />
			</VTextControl.Root>
		</div>
	);
}