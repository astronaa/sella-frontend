import { PageStore } from "~/pages/store";

interface PageProps {
	params: { storeUrl: string }
}

export default function Page({ params }: PageProps) {
	return (
		<PageStore
			storeUrl={params.storeUrl}
		/>
	);
}

export const revalidate = 0;