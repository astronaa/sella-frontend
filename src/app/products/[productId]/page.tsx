import { PageProduct } from "~/pages/product";
import { RouteProps } from "./route-props";
import { Metadata } from "next";

type PageProps = RouteProps;

export const metadata: Metadata = {
  title: "Sella",
  description:
    "Check out my shop on Sella - a crypto marketplace powered by escrow. No KYC. No Limits. Launch your free storefront in less than a minute!",
};

export default function Page({ params }: PageProps) {
  return <PageProduct productId={params.productId} />;
}

export const revalidate = 0;
