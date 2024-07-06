'use client';

import { RainbowKitProvider } from "@rainbow-me/rainbowkit";
import { QueryClientProvider } from "@tanstack/react-query";
import { PropsWithChildren } from "react";
import { WagmiProvider } from "wagmi";
import { TronWalletProvider } from "~/shared/config/tron";

import { queryClient } from "~/shared/config/query-client";
import { rainbowKitTheme, wagmiConfig } from "~/shared/config/rainbow-kit";

export function Providers({ children }: PropsWithChildren) {
	return (
		<TronWalletProvider>
			<WagmiProvider config={wagmiConfig}>
				<QueryClientProvider client={queryClient}>
					<RainbowKitProvider theme={rainbowKitTheme}>
						{children}
					</RainbowKitProvider>
				</QueryClientProvider>
			</WagmiProvider>
		</TronWalletProvider>
	);
}