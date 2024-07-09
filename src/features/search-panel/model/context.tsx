import { Category } from "~/shared/api/client";
import { createContextFactory } from "~/shared/lib/create-context-factory"

interface Context {
	searchText: string,
	setSearchText: (text: string) => void,
	open: boolean,
	setOpen: (open: boolean) => void,
	category: Category | null,
	setCategory: (category: Category | null) => void,
}

const create = createContextFactory('searchPanel');

export const {
	useSearchPanelStrictContext,
	SearchPanelConsumer,
	SearchPanelProvider
} = create<Context>()