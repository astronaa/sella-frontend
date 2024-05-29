'use client';

import { HTMLAttributes } from 'react';
import { Form } from 'react-final-form';
import { zodValidate } from '~/shared/lib/zod-final-form';
import { DividerWithElement } from '~/shared/ui/kit/divider';
import { VImageUploader, VTextControl } from '~/shared/ui/validation-inputs';
import { schema, SchemaType } from "~/features/register/api";

type RegisterFormProps = HTMLAttributes<HTMLFormElement> & {
	id: string;
	onActionFulfilled?: (values: SchemaType) => void;
};

export function RegisterForm({ onActionFulfilled, ...props }: RegisterFormProps) {
	const onSubmit = (values: SchemaType) => {
		onActionFulfilled?.(values);
	};

	return (
		<Form onSubmit={onSubmit} validate={zodValidate(schema)}>
			{({ handleSubmit }) => (
				<form
					className='flex flex-col w-full gap-[1rem]'
					{...props} onSubmit={handleSubmit}
				>
					<DividerWithElement className='gap-[1rem] mb-[1rem]'>
						<VImageUploader
							accept='image/png, image/jpeg'
							label='Upload Avatar' name='avatar'
							className='rounded-full'
						/>
					</DividerWithElement>

					<VTextControl.Root className='w-full' name='userName'>
						<VTextControl.Label>Product Description</VTextControl.Label>
						<VTextControl.Input
							className='text-center'
							size='2xl' placeholder="@username"
						/>
						<VTextControl.ErrorText />
					</VTextControl.Root>

					<p className='text-black-60 text-center'>
						Select your username. This will be your unique identifier on
						Sella — choose a name that truly represents you or your brand.
					</p>
				</form>
			)}
		</Form>
	);
}
