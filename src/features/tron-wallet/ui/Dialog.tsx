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
import { apiClient } from "~/shared/api/client";

export function ConnectDialog(props: Dialog.RootProps) {
	const { open, setOpen } = useWalletConnectDialog();

	const onWalletSelected = (address: string) => {
		setOpen(false);
		apiClient.users.setTronWallet(address);
	}

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
							onActionFulfilled={onWalletSelected}
						/>
					</Dialog.Content>
				</Dialog.Positioner>
			</Portal>
		</Dialog.Root>
	);
}

interface FormProps {
	onActionFulfilled?: (address: string) => void
}

const adapterStatuses = new Map([
	[AdapterState.Connected, { label: 'Connected', level: 2 }],
	[AdapterState.Disconnect, { label: 'Disconnected', level: 2 }],
	[AdapterState.Loading, { label: 'Loading', level: 1 }],
	[AdapterState.NotFound, { label: 'Not Found', level: 1 }],
])

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
			{[...wallets]
				.sort((a, b) => {
					const levelA = adapterStatuses.get(a.state)?.level ?? 0;
					const levelB = adapterStatuses.get(b.state)?.level ?? 0;

					return levelB - levelA;
				})
				.map(w => (
					<Button
						key={w.adapter.name}
						colorPalette='gray' size='lg'
						className='w-full justify-between'
						disabled={w.state != AdapterState.Disconnect}
						onClick={() => select(w.adapter.name)}
					>
						<div className='flex items-center gap-[0.5rem]'>
							<img
								className='size-[1.5rem] rounded-full'
								src={w.adapter.icon}
								alt=''
							/>

							<span>Connect {w.adapter.name}</span>
						</div>

						<span className='text-black-40'>
							{adapterStatuses.get(w.adapter.state)?.label}
						</span>
					</Button>
				))
			}
		</div>
	);
}