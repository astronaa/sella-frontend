import { PageProduct } from '~/pages/product';
import { RouteProps } from './route-props';

type PageProps = RouteProps;

export default function Page({ params }: PageProps) {
	return (
		<PageProduct
			productId={params.productId}
		/>
	);
}

export const revalidate = 5;