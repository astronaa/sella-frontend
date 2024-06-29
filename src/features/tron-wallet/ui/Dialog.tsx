/* eslint-disable @next/next/no-img-element */

'use client';

import { Portal } from "@ark-ui/react";
import { Dialog } from "~/shared/ui/kit";
import { useWalletConnectDialog } from "../model/dialog";
import { useWallet } from "@tronweb3/tronwallet-adapter-react-hooks";
import { Button } from "~/shared/ui/kit/button";
import { AdapterState } from "@tronweb3/tronwallet-abstract-adapter";
import { useEffect } from "react";
import { useCallbackRef } from "~/shared/lib/use-callback-ref";

export function ConnectDialog(props: Dialog.RootProps) {
	const { open, setOpen } = useWalletConnectDialog();

	return (
		<Dialog.Root
			{...props} open={open}
			onOpenChange={({ open }) => setOpen(open)}
			unmountOnExit lazyMount
		>
			<Portal>
				<Dialog.Backdrop />
				<Dialog.Positioner>
					<Dialog.Content
						className='items-start w-[28.125rem]'
					>
						<Dialog.CloseButton />

						<Dialog.ContentHeading>
							<Dialog.Title>Connect Tron Wallet</Dialog.Title>
							<Dialog.Description>
								Choose the Tron Wallet of your choice to continue
							</Dialog.Description>
						</Dialog.ContentHeading>

						<Form 
							onActionFulfilled={() => setOpen(false)}
						/>
					</Dialog.Content>
				</Dialog.Positioner>
			</Portal>
		</Dialog.Root>
	);
}

interface FormProps {
	onActionFulfilled?: () => void
}

function Form(props: FormProps) {
	const { wallets, select, wallet } = useWallet();
	const adapter = wallet?.adapter;

	const onActionFulfilled = useCallbackRef(props.onActionFulfilled);

	useEffect(() => {
		if (!adapter)
			return;

		adapter.on('connect', onActionFulfilled);

		return () => {
			adapter.off('connect', onActionFulfilled);
		}
	}, [adapter, onActionFulfilled])

	return (
		<div className='flex flex-col w-full gap-[1rem]'>
			{wallets.map(w => (
				<Button
					key={w.adapter.name}
					colorPalette='gray' className='w-full'
					disabled={w.state != AdapterState.Disconnect}
					onClick={() => select(w.adapter.name)}
				>
					<img
						className='size-[1rem] rounded-full'
						src={w.adapter.icon}
						alt=''
					/> Connect {w.adapter.name} ({w.state})
				</Button>
			))}
		</div>
	);
}