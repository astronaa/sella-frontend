import { Dispatch, SetStateAction } from "react";
import { Category } from "~/shared/api/client";
import { createContextFactory } from "~/shared/lib/create-context-factory"

interface Context {
	open: boolean,
	setOpen: Dispatch<SetStateAction<boolean>>,
	category: Category | null,
	setCategory: Dispatch<SetStateAction<Category | null>>,
}

const create = createContextFactory('categoriesRoulette');

export const {
	CategoriesRouletteProvider,
	useCategoriesRouletteStrictContext,
	CategoriesRouletteConsumer
} = create<Context>()