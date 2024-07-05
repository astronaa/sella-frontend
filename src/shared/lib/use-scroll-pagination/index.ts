import { RefObject, useEffect } from "react";
import { useCallbackRef } from "../use-callback-ref";

interface UseScrollPaginationProps {
	shouldObserve: boolean,
	onLoadMore(): void,
	threshold?: number,
	direction?: 'to-top' | 'to-bottom'
}

export function useScrollPagination<T extends HTMLElement = HTMLElement>(
	ref: RefObject<T>, 
	{ onLoadMore, shouldObserve, threshold = 0.90, direction = 'to-bottom'  }: UseScrollPaginationProps
) {
	const cb = useCallbackRef(onLoadMore);
	const getTreshold = useCallbackRef(() => threshold);

	useEffect(() => {
		if(!shouldObserve) return;

		const element = ref.current;
		if(!element) return;

		let oldScroll = window.scrollY || document.documentElement.scrollTop;
		const flexDirMod = getComputedStyle(element).flexDirection == 'column-reverse' ? -1.0 : 1.0;

		const listener = () => {
			const scrollTop = element.scrollTop * flexDirMod;

			if(scrollTop == oldScroll) return;

			const curDir = scrollTop > oldScroll ? 'to-bottom' : 'to-top';
			oldScroll = scrollTop;

			if(curDir != direction)
				return;

			const threshold = getTreshold();

			if(direction == 'to-bottom') {
				if((scrollTop + element.clientHeight) / element.scrollHeight > threshold)
					cb();
			}
			else if(scrollTop / element.scrollHeight < 1.0 - threshold)
				cb();
		}

		element.addEventListener('scroll', listener);

		listener(); 

		return () => {
			element.removeEventListener('scroll', listener);
		}
	}, [ref, cb, shouldObserve, getTreshold, direction])
}