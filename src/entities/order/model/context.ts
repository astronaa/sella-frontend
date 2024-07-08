'use client';

import { Order } from "~/shared/api/client"
import { createContextFactory } from "~/shared/lib/create-context-factory";

const create = createContextFactory('order');

export const {
	OrderProvider,
	useOrderStrictContext
} = create<Order>();