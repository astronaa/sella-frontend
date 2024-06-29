import {
	MutableRefObject,
	PropsWithChildren,
	useCallback,
	useMemo,
	useRef
} from "react";

import { createContextFactory } from "~/shared/lib/create-context-factory";
import { useControllableState } from "~/shared/lib/use-controllable-state";

interface UploadBaseProps {
	name: string,
	maxSizePerFile?: number,
	multiple?: boolean,
	accept?: string,
}

interface UploadContext extends Required<UploadBaseProps> {
	openFileBrowser(): void,
	deleteFile(file: File): void,
	setFiles(files: File[]): void,
	files: File[],
	inputRef: MutableRefObject<HTMLInputElement | null>
}

const create = createContextFactory('upload');

export const {
	UploadProvider,
	useUploadContext,
	useUploadStrictContext
} = create<UploadContext>()

export type UploadProps = PropsWithChildren<UploadBaseProps> & {
	value?: File[],
	defaultValue?: File[],
	onChange?: (files: File[]) => void
}

export function Upload({
	multiple = false, accept = '*',
	children, name, maxSizePerFile = 0,
	defaultValue = [], value, onChange
}: UploadProps
) {
	const inputRef = useRef<HTMLInputElement>(null);
	const [files, setFiles] = useControllableState({ value, defaultValue, onChange })

	const openFileBrowser = useCallback(() => {
		inputRef.current?.click();
	}, [inputRef])

	const deleteFile = useCallback((file: File) => {
		setFiles(files => files.filter(f => f !== file));
	}, [setFiles])

	const contextValue = useMemo(() => ({
		openFileBrowser, deleteFile, files,
		multiple, accept, name, inputRef,
		setFiles, maxSizePerFile
	}), [openFileBrowser, deleteFile, files, multiple, accept, name, inputRef, setFiles, maxSizePerFile]);

	return (
		<UploadProvider value={contextValue}>
			{children}
		</UploadProvider>
	);
}