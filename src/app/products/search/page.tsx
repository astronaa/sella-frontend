import { PageProductSearchResults } from "~/pages/search-results";
import { apiClient } from "~/shared/api/client";

export default function Page(props: { searchParams: unknown }) {
	const searchParams = apiClient.products.schemaSearch.parse(props.searchParams);

	return (
		<PageProductSearchResults {...searchParams} />
	)
}

export const revalidate = 0;