'use client';

import { Button, ButtonProps } from "~/shared/ui/kit/button";
import { useWalletConnectDialog } from "../model/dialog";

export function ConnectButton({ children, ...props }: ButtonProps) {
	const { setOpen } = useWalletConnectDialog();

	return (
		<Button 
			colorPalette='gray'
			{...props}
			onClick={() => setOpen(true)}
		>
			{children ?? 'Connect wallet'}
		</Button>
	);
}