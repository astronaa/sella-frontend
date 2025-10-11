import { Metadata } from "next";
import { PageStore } from "~/pages/store";

interface PageProps {
  params: { storeUrl: string };
}

export const metadata: Metadata = {
  title: "Sella",
  description:
    "Check out my shop on Sella - a crypto marketplace powered by escrow. No KYC. No Limits. Launch your free storefront in less than a minute!",
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

export default function Page({ params }: PageProps) {
  return <PageStore storeUrl={params.storeUrl} />;
}

export const revalidate = 0;
