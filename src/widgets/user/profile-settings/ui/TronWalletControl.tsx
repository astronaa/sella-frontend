'use client';
import { useWallet as useTronWallet } from '@tronweb3/tronwallet-adapter-react-hooks';
import { TronWalletConnectButton } from '~/features/tron-wallet';
import { VTextControl } from '~/shared/ui/validation-inputs';
import { Skeleton } from '~/shared/ui/kit/skeleton';

export function TronWalletControl() {
	const { address, disconnect, connecting, disconnecting } = useTronWallet();
	const loading = connecting || disconnecting;

	return (
		<Skeleton loading={loading} asChild>
			<VTextControl.Root className='w-full' name='tronAddress'>
				<VTextControl.LabelOrError className='flex justify-between w-full'>
					<span>Tron Wallet</span>
					{!!address && (
						<span
							className='text-cyan-100 cursor-pointer'
							onClick={disconnect}
						>
							Disconnect
						</span>
					)}
				</VTextControl.LabelOrError>
				{address ? (
					<VTextControl.Input
						className='pointer-events-none truncate max-w-full pe-[1rem]'
						readOnly />
				) : (
					<TronWalletConnectButton
						className='w-full'
						type='button' />
				)}
			</VTextControl.Root>
		</Skeleton>
	);
}
