import { PageProductProcessOrder } from "~/pages/product-checkout";
import { PageProps as ParentPageProps } from "../page"
import { schemaPaymentToken } from "~/shared/api/client";

type PageProps = ParentPageProps & {
	params: { orderId: string },
}

export default function Page({ params, searchParams }: PageProps) {
	const { tab, ...method } = searchParams;

	return (
		<PageProductProcessOrder
			{...params}
			method={schemaPaymentToken.parse(method)}
			initialTab={tab == 'chat' || tab == 'order-actions' ? tab : undefined}
		/>
	);
}

export const revalidate = 0;