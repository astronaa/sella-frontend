import { PageProductProcessOrder } from "~/pages/product-checkout";
import { PageProps as ParentPageProps } from "../page"

type PageProps = ParentPageProps & {
	params: { orderId: string },
}

export default function Page({ params, searchParams }: PageProps) {
	const { tab } = searchParams;

	return (
		<PageProductProcessOrder
			{...params}
			initialTab={tab == 'chat' || tab == 'order-actions' ? tab : undefined}
		/>
	);
}

export const revalidate = 0;