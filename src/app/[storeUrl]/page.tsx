import { Metadata } from "next";
import { staticStores } from "~/shared/static-data/marketplace";
import { StoreCard } from "~/entities/store";
import { Heading } from "~/shared/ui/kit/heading";
import { StorefrontOpenBanner } from "~/widgets/storefront-open";

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
  const store = staticStores.find((item) => item.url === params.storeUrl);

  return (
    <div className="flex flex-col w-full gap-[4rem] max-w-content mx-auto px-[1rem]">
      <div className="flex flex-col gap-[1.5rem]">
        <Heading>{store?.name ?? "Store preview"}</Heading>
        <p className="max-w-[42rem] text-black-60">
          This GitHub Pages preview uses static storefront data while the live backend is offline.
          Product management, checkout, chat, and account actions are disabled here.
        </p>
      </div>

      {store && (
        <StoreCard.Root store={store} className="w-full max-w-[40rem]">
          <StoreCard.Composition />
        </StoreCard.Root>
      )}

      <StorefrontOpenBanner />
    </div>
  );
}

export function generateStaticParams() {
  return staticStores.map((store) => ({ storeUrl: store.url }));
}

export const dynamicParams = false;
