import { Dispatch, SetStateAction } from "react";
import { createContextFactory } from "~/shared/lib/create-context-factory"

interface Context {
	open: boolean,
	setOpen: Dispatch<SetStateAction<boolean>>
}

const create = createContextFactory('mobileMenu');

export const {
	useMobileMenuStrictContext,
	MobileMenuProvider
} = create<Context>()