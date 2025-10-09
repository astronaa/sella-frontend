import { PageProduct } from '~/pages/product';
import { RouteProps } from './route-props';

type PageProps = RouteProps;

export const metadata: Metadata = {
  title: "Sella",
  description: "Check out my shop on Sella - a crypto marketplace powered by escrow. No KYC. No Limits. Launch your free storefront in less than a minute!",
  metadataBase: new URL(APP_BASE_URL),
};

export default function Page({ params }: PageProps) {
	return (
		<PageProduct
			productId={params.productId}
		/>
	);
}

export const revalidate = 0;