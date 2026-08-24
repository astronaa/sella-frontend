import type { PaymentMethod } from "~/shared/api/client";

/**
 * Demo payment methods mirroring the backend's payment-methods.ts
 * (same escrow contract addresses that are live on-chain). Served only
 * when the live API is unreachable, so the checkout card renders fully.
 */
export const staticPaymentMethods: PaymentMethod[] = [
	{
		name: "Ethereum",
		value: "ETH",
		chainId: 1,
		contractAddress: "0xF7862beF384CF7791F3ec8C51f89b49884859Fb5",
		tokens: [
			{ name: "ETH", address: "0x0000000000000000000000000000000000000000" },
			{ name: "USDT", address: "0xdac17f958d2ee523a2206206994597c13d831ec7" },
			{ name: "USDC", address: "0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48" },
			{ name: "DAI", address: "0x6b175474e89094c44da98b954eedeac495271d0f" },
		],
	},
	{
		name: "Sepolia",
		value: "SEPOLIA",
		chainId: 11155111,
		contractAddress: "0xFe478ea5f02bbB5f5793581Af271E8d68B714741",
		tokens: [
			{ name: "ETH", address: "0x0000000000000000000000000000000000000000" },
			{ name: "USDC", address: "0x1c7d4b196cb0c7b01d743fbc6116a902379c7238" },
		],
	},
];
