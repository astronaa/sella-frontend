import "./globals.css";
import "@park-ui/tailwind-plugin/preset.css";

import type { Metadata } from "next";

import { cn } from "~/shared/lib/cn";
import { fontInter } from "~/shared/assets/fonts/inter";
import { fontManrope } from "~/shared/assets/fonts/manrope";
import { fontTTNorms } from "~/shared/assets/fonts/tt-norms-pro";
import { StaticProviders } from "./_providers/static";
import { StaticRootLayout } from "~/pages/root-layout/ui/StaticComponent";
import { APP_BASE_URL } from "~/shared/config/app-base-url";

const fontVariables = [
  fontInter.variable,
  fontManrope.variable,
  fontTTNorms.variable,
];

export const metadata: Metadata = {
  title: "Sella",
  description:
    "Trade digital goods and services with built-in escrow. Safe, fast, and free. Launch your storefront in minutes!",
  metadataBase: new URL(APP_BASE_URL),
  openGraph: {
    images: [
      {
        url: "/opengraph-image.png",
        alt: "Sella storefront preview",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    images: ["/opengraph-image.png"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={cn(...fontVariables, "bg-black-06 text-white font-inter")}
      >
        <StaticProviders>
          <StaticRootLayout>{children}</StaticRootLayout>
        </StaticProviders>
      </body>
    </html>
  );
}
