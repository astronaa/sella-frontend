import { PageProductSearchResults } from "~/pages/search-results";
import { Suspense } from "react";

export default function Page() {
	return (
		<Suspense>
			<PageProductSearchResults />
		</Suspense>
	)
}

export const dynamic = "force-static";
