'use client';

import { Dispatch, SetStateAction } from "react";
import { createContextFactory } from "~/shared/lib/create-context-factory";

interface Context {
	enabled: boolean,
	setEnabled: Dispatch<SetStateAction<boolean>>
}

const create = createContextFactory('editMode');

export const {
	EditModeProvider,
	useEditModeStrictContext
} = create<Context>();