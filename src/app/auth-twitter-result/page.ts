'use client'
import { useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { invariant } from "~/shared/lib/asserts";

const BASE_URL = process.env.NEXT_PUBLIC_API_URL;
invariant(BASE_URL, 'NEXT_PUBLIC_API_URL not defined');

export default () => {
	const searchParams = useSearchParams()

	const message = Object.fromEntries(searchParams?.entries() ?? [])

	useEffect(() => {
		window.postMessage(message, BASE_URL)

		window.addEventListener('message', (e) => {
			if (e.data === 'close') {
				window.close()
			}
		})
	}, [message])
}
