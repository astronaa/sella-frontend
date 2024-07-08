'use client';

import {
	mainnet,
	polygon,
	sepolia
} from 'wagmi/chains';

import { darkTheme, getDefaultConfig } from '@rainbow-me/rainbowkit';
import { resolvedTwConfig } from '../lib/resolved-tw-config';

export const wagmiConfig = getDefaultConfig({
	appName: 'My RainbowKit App',
	projectId: 'YOUR_PROJECT_ID',
	chains: [mainnet, polygon, sepolia],
	ssr: true,
});

const { colors } = resolvedTwConfig.theme;

export const rainbowKitTheme = darkTheme({
	accentColor: colors['accent-100'],
	accentColorForeground: 'black',
	overlayBlur: 'large'
});