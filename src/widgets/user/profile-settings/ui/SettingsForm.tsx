'use client';

import { HTMLAttributes, useMemo } from 'react';
import { Form } from 'react-final-form';
import { useAccount } from 'wagmi';
import { z } from 'zod';
import { useUserGetQuery } from '~/entities/user';
import { cn } from '~/shared/lib/cn';
import { zodValidate } from '~/shared/lib/zod-final-form';
import { Icons } from '~/shared/ui/icons';
import { DividerWithElement } from '~/shared/ui/kit/divider';
import { InputGroup } from '~/shared/ui/kit/input';
import { VImageUploader, VTextControl } from '~/shared/ui/validation-inputs';

export const schema = z.object({
	name: z.string({ required_error: 'Name is required' }).min(3, 'Min length is 3'),
	price: z.coerce.number({ message: 'Price is required' }).min(1, 'Min price is 1 USDT'),
	shortDescription: z.string({ required_error: 'Description is required' }),
	description: z.string().optional(),
	previewImage: z.instanceof(File).optional(),
	galleryImages: z.array(z.instanceof(File)).optional()
});

export type SchemaType = z.infer<typeof schema>

type SettingsFormProps = HTMLAttributes<HTMLFormElement> & {
	id: string;
	onActionFulfilled?: () => void;
};

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export function SettingsForm({ onActionFulfilled, className, ...props }: SettingsFormProps) {
	const { data: user } = useUserGetQuery();
	const { address } = useAccount();

	// eslint-disable-next-line @typescript-eslint/no-unused-vars
	const onSubmit = (values: SchemaType) => {
		onActionFulfilled?.();
	};

	const initialValues = useMemo(() => ({
		wallet: address,
		...user
	}), [address, user])

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
							label='Upload Avatar' name='avatarImage'
							className='flex-shrink-0 size-[11.625rem] rounded-full'
						/>
						<div className='flex flex-col justify-between max-md:gap-[1rem]'>
							<VTextControl.Root className='w-full' name='wallet'>
								<VTextControl.LabelOrError>
									Wallet
								</VTextControl.LabelOrError>
								<VTextControl.Input
									className='pointer-events-none truncate max-w-full'
									readOnly
								/>
							</VTextControl.Root>

							<VTextControl.Root className='w-full' name='username'>
								<VTextControl.LabelOrError>
									Username
								</VTextControl.LabelOrError>
								<VTextControl.Input
									placeholder='Your username'
								/>
							</VTextControl.Root>
						</div>
					</div>

					<DividerWithElement className='text-black-40 text-[0.875rem]'>
						2fa / Notifications
					</DividerWithElement>

					<VTextControl.Root className='w-full' name='telegram'>
						<VTextControl.Label>
							Telegram
						</VTextControl.Label>
						<InputGroup>
							<span className='flex items-center justify-center absolute h-full top-0 left-0 ps-[1rem]'>
								<Icons.Telegram className='size-[1.25rem]' />
							</span>
							<VTextControl.Input
								className='ps-[3rem]'
								placeholder="Your @telegram"
							/>
						</InputGroup>
					</VTextControl.Root>

					<VTextControl.Root className='w-full' name='email'>
						<VTextControl.Label>
							Email Address
						</VTextControl.Label>
						<VTextControl.Input
							placeholder="johnappleseed@gmail.com"
						/>
					</VTextControl.Root>
				</form>
			)}
		</Form>
	);
}
