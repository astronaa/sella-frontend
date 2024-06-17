import { createContextFactory } from "~/shared/lib/create-context-factory";

interface Context {
	value: string,
	setValue: (value: string) => void
}

const create = createContextFactory('searchBar');

export const {
	SearchBarProvider,
	useSearchBarStrictContext
} = create<Context>();