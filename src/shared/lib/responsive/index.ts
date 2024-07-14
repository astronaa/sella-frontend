import { useMediaQuery } from "usehooks-ts";
import { resolvedTwConfig } from "../resolved-tw-config";

const { screens } = resolvedTwConfig.theme;

export function useTwBreakpoint(breakpoint: keyof typeof screens) {
	return useMediaQuery(`(min-width: ${screens[breakpoint]})`)
}