'use client';

import { useRouter } from "next/navigation";
import { HTMLAttributes, useEffect, useMemo } from "react";
import { StoreInputAddon } from "~/entities/store";
import { useUserGetQuery } from "~/entities/user";
import { useRegisterFlow } from "~/features/register";
import { StoreCreateDialog } from "~/features/store/create";
import { cn } from "~/shared/lib/cn";
import { useDialogState } from "~/shared/lib/dialog";
import { useDebouncedState } from "~/shared/lib/use-debounce";
import { Button } from "~/shared/ui/kit/button";
import { Input, InputGroup } from "~/shared/ui/kit/input";

export function ActionControls({ className, ...props }: HTMLAttributes<HTMLDivElement>) {
	const router = useRouter();
	const { data: user } = useUserGetQuery();
	const { 
		isOpen: shouldOpen, 
		handleOpenChange, 
		open: openDialog,
		close: closeDialog
	} = useDialogState();

	const open = shouldOpen && !!user;
	const [storeUrl, setStoreUrl] = useDebouncedState(200, '');
	const initialValues = useMemo(() => ({ url: storeUrl }), [storeUrl]);

	const startFlow = useRegisterFlow(s => s.startFlow);
	const setFlowStoreUrlToCreate = useRegisterFlow(s => s.setStoreUrlToCreate);
	const currentFlowModal = useRegisterFlow(s => s.currentModal);

	const onButtonClick = () => {
		openDialog();
		if(!user) {
			startFlow();
			setFlowStoreUrlToCreate(storeUrl);
		}
	}

	useEffect(() => {
		if(currentFlowModal == 'create-store')
			closeDialog();
	}, [currentFlowModal, closeDialog]);

	return (
		<div {...props} className={cn("flex gap-[1rem] flex-wrap", className)}>
			<StoreInputAddon>
				{({ Component: Addon, inputClassName }) => (
					<InputGroup>
						<Input
							className={cn("rounded-[1.25rem] border border-secondary w-full h-full", inputClassName)}
							placeholder="yourstorefront"
							onChange={e => setStoreUrl(e.target.value)}
						/>
						<Addon className='text-white' />
					</InputGroup>
				)}
			</StoreInputAddon>

			<Button 
				className="w-full md:w-auto" size="xl"
				onClick={onButtonClick}
			>
				Open Storefront
			</Button>

			<StoreCreateDialog
				open={open}
				onOpenChange={handleOpenChange}
				initialValues={initialValues}
				onActionFulfilled={store => router.push(`/${store.url}`)}
			/>
		</div>
	);
}
