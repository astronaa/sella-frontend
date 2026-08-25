import { PageProduct } from "~/pages/product";
import { RouteProps } from "./route-props";
import { Metadata } from "next";
import { staticProducts } from "~/shared/static-data/marketplace";

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
  return <PageProduct productId={params.productId} />;
}

// Static export: prerender the demo products. Restore on launch by dropping
// generateStaticParams/dynamicParams and moving back to a server-rendered build.
export function generateStaticParams() {
  return staticProducts.map((product) => ({ productId: product.id }));
}

export const dynamicParams = false;
