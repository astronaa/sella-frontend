'use client';

import { useState } from 'react';
import { Dialog } from '~/shared/ui/kit';
import { RegisterSuccessDialog } from './RegisterSuccessDialog';
import { TwoFaSuccessDialog } from './TwoFaSuccessDialog';
import { Button } from '~/shared/ui/kit/button';
import { RegisterSetupProfileDialog, RegisterConnectTwitterDialog } from '~/features/register';
import { StoreCreateDialog } from '~/features/store/create';
import { AuthChannelsSetupTwoFaDialog } from '~/features/auth-channels';
import { CreateStoreSuccessDialog } from './CreateStoreSuccessDialog';
import { Store } from "~/shared/api/client"
import { ProductCreateDialog } from '~/features/product/create';
import { AllSetDialog } from './AllSetDialog';
import { useRegisterFlow, useRegisterFlowWalletGuard } from '../model/flow';

export function FlowDialog(props: Dialog.RootProps) {
	const open = useRegisterFlow(s => s.open);
	const setOpen = useRegisterFlow(s => s.setOpen);
	const currentModal = useRegisterFlow(s => s.currentModal);
	const openModalAction = useRegisterFlow(s => s.openModal);
	const hasUsername = useRegisterFlow(s => s.hasUsername);

	const isOpen = (modal: typeof currentModal) =>
		(!!props?.open || open) && currentModal == modal;

	const [createdStore, setCreatedStore] = useState<Store | null>(null);

	const onOpenChange: Dialog.RootProps['onOpenChange'] = details => {
		props?.onOpenChange?.(details);
		setOpen(details.open);
	}

	useRegisterFlowWalletGuard();

	return (
		<>
			<RegisterConnectTwitterDialog
				{...props}
				open={isOpen('register-twitter')}
				onOpenChange={onOpenChange}
				onActionFulfilled={openModalAction(hasUsername ? 'register-success' : 'register-profile')}
			/>

			<RegisterSetupProfileDialog
				{...props}
				open={isOpen('register-profile')}
				onOpenChange={onOpenChange}
				closeOnInteractOutside={false}
				onActionFulfilled={openModalAction('register-success')}
			/>

			<RegisterSuccessDialog
				{...props}
				open={isOpen('register-success')}
				onOpenChange={onOpenChange}
				onContinue={openModalAction('2fa')}
			/>

			<AuthChannelsSetupTwoFaDialog
				{...props}
				open={isOpen('2fa')}
				onOpenChange={onOpenChange}
				onActionFulfilled={openModalAction('2fa-success')}
				cancelButton={
					<Button
						className='w-full' colorPalette='gray'
						onClick={openModalAction('create-store')}
					>
						Setup Later
					</Button>
				}
			/>

			<TwoFaSuccessDialog
				{...props}
				open={isOpen('2fa-success')}
				onOpenChange={onOpenChange}
				onContinue={openModalAction('create-store')}
			/>

			<StoreCreateDialog
				{...props}
				open={isOpen('create-store')}
				onOpenChange={onOpenChange}
				onActionFulfilled={store => {
					if(!store) return

					openModalAction('create-store-success')();
					setCreatedStore(store);
				}}
				cancelButton={
					<Button
						className='w-full' colorPalette='gray'
						onClick={openModalAction('all-set')}
					>
						Skip
					</Button>
				}
			/>

			<CreateStoreSuccessDialog
				{...props}
				store={createdStore}
				open={isOpen('create-store-success')}
				onOpenChange={onOpenChange}
				onContinue={openModalAction('create-product')}
			/>

			{createdStore && (
				<ProductCreateDialog
					{...props}
					storeUrl={createdStore.url}
					title='First Item Upload'
					description='Attach an image that best represents your item. Name your listing, craft a
						catchy description, and set a price. Remember, you can change any details later on.'

					open={isOpen('create-product')} onOpenChange={onOpenChange}
					onActionFulfilled={openModalAction('all-set')}
					
					cancelButton={
						<Button
							className='w-full' colorPalette='gray'
							onClick={openModalAction('all-set')}
						>
							Skip
						</Button>
					}
				/>
			)}

			<AllSetDialog
				{...props}
				open={isOpen('all-set')}
				onOpenChange={onOpenChange}
			/>
		</>
	);
}
