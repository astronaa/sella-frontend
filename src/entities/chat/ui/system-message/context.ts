import { createContextFactory } from "~/shared/lib/create-context-factory"
import { SystemMessageAttrs } from "./types";

interface Context extends Omit<SystemMessageAttrs, 'data'> {
	getSystemData: () => Record<string, string>,
	createdAt: string
}

const create = createContextFactory('systemMessage');

export const {
	SystemMessageProvider,
	useSystemMessageStrictContext
} = create<Context>()