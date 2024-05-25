import { PageStore } from "~/pages/store";

interface PageProps {
	params: { storeId: string }
}

export default function Page({ params }: PageProps) {
	return (
		<PageStore
			storeId={Number(params.storeId)}
		/>
	);
}