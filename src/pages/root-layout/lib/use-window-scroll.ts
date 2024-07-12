import { useEffect, useState } from "react";
import { useEventListener } from "usehooks-ts";

interface UseWindowScrollArgs {
	threshold?: number,
	defaultValue?: boolean
}

export function useWindowScroll({ threshold = 60, defaultValue = false }: UseWindowScrollArgs = {}) {
	const [scrolled, setScrolled] = useState(defaultValue);

	useEventListener('scroll', () => {
		setScrolled(window.scrollY > threshold);
	});

	useEffect(() => {
		setScrolled(window.scrollY > threshold);
	}, [threshold]);

	return scrolled;
}