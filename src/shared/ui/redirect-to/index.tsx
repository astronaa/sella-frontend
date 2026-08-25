'use client';

import { useEffect } from "react";
import { useRouter } from "next/navigation";

/**
 * Client-side redirect for routes that only exist in the static export as
 * placeholders. Renders nothing while the router swaps the page.
 */
export function RedirectTo({ href }: { href: string }) {
	const router = useRouter();

	useEffect(() => {
		router.replace(href);
	}, [router, href]);

	return null;
}
