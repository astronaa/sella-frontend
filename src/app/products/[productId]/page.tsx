import { RouteProps } from "./route-props";
import { Metadata } from "next";
import { staticProducts } from "~/shared/static-data/marketplace";
import { ProductCard } from "~/entities/product";
import { Heading } from "~/shared/ui/kit/heading";
import { StorefrontOpenBanner } from "~/widgets/storefront-open";

type PageProps = RouteProps;

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
  const product = staticProducts.find((item) => item.id === params.productId);

  return (
    <div className="flex flex-col w-full gap-[4rem] max-w-content mx-auto px-[1rem]">
      <div className="flex flex-col gap-[1.5rem]">
        <Heading>{product?.name ?? "Product preview"}</Heading>
        <p className="max-w-[42rem] text-black-60">
          This GitHub Pages preview uses static product data while the live backend is offline.
          Checkout, chat, reviews, and account actions are disabled here.
        </p>
      </div>

      {product && (
        <ProductCard.Root product={product} className="w-full max-w-[24rem]">
          <ProductCard.Composition />
        </ProductCard.Root>
      )}

      <StorefrontOpenBanner />
    </div>
  );
}

export function generateStaticParams() {
  return staticProducts.map((product) => ({ productId: product.id }));
}

export const dynamicParams = false;
