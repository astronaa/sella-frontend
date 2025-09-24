"use client";

import { mainnet, polygon, sepolia } from "wagmi/chains";
import { http } from "wagmi";

import { darkTheme, getDefaultConfig } from "@rainbow-me/rainbowkit";
import { resolvedTwConfig } from "../lib/resolved-tw-config";

const infuraApiKey = process.env.NEXT_PUBLIC_INFURA_API_KEY;

const customSepolia = {
  ...sepolia,
  rpcUrls: {
    default: {
      http: [
        ...(infuraApiKey
          ? [`https://sepolia.infura.io/v3/${infuraApiKey}`]
          : []),
        "https://sepolia.gateway.tenderly.co",
        "https://ethereum-sepolia-rpc.publicnode.com",
      ],
    },
    public: {
      http: [
        ...(infuraApiKey
          ? [`https://sepolia.infura.io/v3/${infuraApiKey}`]
          : []),
        "https://sepolia.gateway.tenderly.co",
        "https://ethereum-sepolia-rpc.publicnode.com",
      ],
    },
  },
};

export const wagmiConfig = getDefaultConfig({
  appName: process.env.NEXT_PUBLIC_RAINBOWKIT_APP_NAME!,
  projectId: process.env.NEXT_PUBLIC_RAINBOWKIT_PROJECT_ID!,
  chains: [mainnet, polygon, customSepolia],
  transports: {
    [mainnet.id]: http(),
    [polygon.id]: http(),
    [sepolia.id]: http(
      infuraApiKey
        ? `https://sepolia.infura.io/v3/${infuraApiKey}`
        : "https://sepolia.gateway.tenderly.co",
      {
        timeout: 10_000,
        retryCount: 3,
        retryDelay: 1000,
      }
    ),
  },
  ssr: true,
});

const { colors } = resolvedTwConfig.theme;

export const rainbowKitTheme = darkTheme({
  accentColor: colors["accent-100"],
  accentColorForeground: "black",
  overlayBlur: "large",
});
