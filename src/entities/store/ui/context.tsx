'use client';

import { Store } from "~/shared/api/model";
import { createContextFactory } from "~/shared/lib/create-context-factory";

const create = createContextFactory('store');

export const {
	StoreProvider,
	useStoreContext,
	useStoreContextOrProp,
	useStoreStrictContext
} = create<Store>();