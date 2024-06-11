'use client';

import { ReactNode, useState } from 'react';
import { Form } from 'react-final-form';
import { z } from 'zod';
import { zodValidate } from '~/shared/lib/zod-final-form';
import { Button } from '~/shared/ui/kit/button';
import { Dialog } from '~/shared/ui/kit';
import { VTextAreaControl, VTextControl } from '~/shared/ui/validation-inputs';
import { Collapsible } from "~/shared/ui/kit";
import { FormApi } from "final-form";
import { ToggleGroupField } from './ToggleGroupField';
import {apiClient} from "~/shared/api/client";
import {components} from "~/shared/api/openapi";

type ReportStoreDialogProps = Dialog.RootProps & {
	onActionFulfilled?: () => void,
	cancelButton?: ReactNode
	storeUrl: string
};

const ANOTHER_REASON = 'SomethingElse'

type Reasons = components["schemas"]["ReportStoreDto"]["tag"]

const options: { id: Reasons[number], label: string }[] = [
	{ id: 'Spam', label: 'Spam' },
	{ id: 'Nudity', label: 'Nudity' },
	{ id: 'Scam', label: 'Scam' },
	{ id: 'Illegal', label: 'Illegal' },
	{ id: 'Violence', label: 'Violence' },
	{ id: 'HateSpeech', label: 'Hate Speech' },
	{ id: ANOTHER_REASON, label: 'Something Else' },
]

const initialValues = {
	reason: [],
	description: ''
}

const schema = z.object({
	description: z.string().optional(),
	reason: z.array(z.custom<Reasons[number]>()).nonempty({ message: 'Reason required' })
}).superRefine(({ description, reason }, refinementContext) => {
	if (reason.includes(ANOTHER_REASON) && !description) {
		return refinementContext.addIssue({
			code: z.ZodIssueCode.custom,
			message: 'Description required',
			path: ['description'],
		});
	}
});

type SchemeType = z.infer<typeof schema>

export function ReportStoreDialog({ onActionFulfilled, cancelButton, storeUrl, ...props }: ReportStoreDialogProps) {
	const open = !!props?.open;

	const [isDescriptionShow, setIsDescriptionShow] = useState(false)

	const onSubmit = async (values: SchemeType, form: FormApi<SchemeType, typeof initialValues>) => {
		await apiClient.stores.for(storeUrl).report({
			reasons: values.reason,
			description: values.description
		})
		form.reset()
		onActionFulfilled?.()
		props.onOpenChange?.({ open: false })
	}

	return (
		<>
			<Dialog.Root
				{...props}
				open={open}
			>
				<Dialog.Backdrop />

				<Dialog.Positioner>
					<Dialog.Content className='w-[34.375rem]'>
						<Dialog.CloseButton />
						<Form
							onSubmit={onSubmit}
							initialValues={initialValues}
							validate={zodValidate(schema)}
						>
							{({ form }) => (
								<>
									<Dialog.ContentHeading>
										<Dialog.Title>Report Shop</Dialog.Title>
										<Dialog.Description>
											Your report is anonymous, except if you&apos;re reporting an
											intellectual property infringement. Your report is anonymous, except if you&apos;re [need text
											here].
										</Dialog.Description>
									</Dialog.ContentHeading>

									<div className='flex flex-col gap-[2rem] w-full'>
										<ToggleGroupField
											name='reason'
											options={options}
											onValueChange={({ value }) => {
												setIsDescriptionShow(value.includes(ANOTHER_REASON))
											}}
										/>

										<Collapsible.Root open={isDescriptionShow}>
											<Collapsible.Content>
												<VTextControl.Root name='description'>
													<VTextControl.Label>Reason</VTextControl.Label>
													<VTextAreaControl.Input
														className='resize-none h-auto'
														rows={4}
														placeholder='Help us understand the problem'
													/>
													<VTextControl.ErrorText className='text-center' />
												</VTextControl.Root>
											</Collapsible.Content>
										</Collapsible.Root>
									</div>

									<Dialog.ContentFooter>
										{cancelButton ?? (
											<Dialog.CloseTrigger asChild>
												<Button className='w-full' colorPalette='gray' size='lg'>
													Cancel
												</Button>
											</Dialog.CloseTrigger>
										)}
										<Button onClick={form.submit} className='w-full' size='lg'>
											Submit Report
										</Button>
									</Dialog.ContentFooter>
								</>
							)}
						</Form>
					</Dialog.Content>
				</Dialog.Positioner>
			</Dialog.Root>
		</>
	);
}
