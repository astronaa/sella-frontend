import { formatFileSize } from "~/shared/lib/format-file-size";
import { useUploadStrictContext } from "./Upload";
import { ButtonProps, IconButton } from "../kit/button";
import { Icons } from "../icons";
import { cn } from "~/shared/lib/cn";

export function UploadAddButton({ className, ...props }: ButtonProps) {
	const {
		inputRef, name, accept,
		multiple, setFiles, files,
		maxSizePerFile
	} = useUploadStrictContext();

	const validateFile = (file: File) => {
		if (maxSizePerFile && file.size > maxSizePerFile)
			return `File is too big (${formatFileSize(file.size)}, allowed only ${formatFileSize(maxSizePerFile)})`;

		return true;
	}

	const handleFilesInputChange = (newFiles: File[]) => {
		const checkedFiles = newFiles.map(file => ({ file, result: validateFile(file) }));

		const errorsString = checkedFiles
			.filter(entry => entry.result !== true)
			.reduce(
				(text, { file, result }) => (
					text + `Can't validate file '${file.name}': ${result}\n`
				),
				''
			);

		if (errorsString.length)
			alert(errorsString)

		const validatedFiles = checkedFiles
			.filter(entry => entry.result === true)
			.map(entry => entry.file)

		setFiles(multiple ? [...files, ...validatedFiles] : validatedFiles);
	}

	return (
		<IconButton
			colorPalette='gray' size='xl' {...props}
			className={cn('size-[5rem] rounded-[0.625rem] relative text-black-40 hover:text-white', className)}
		>
			<Icons.Add className='size-[1.125rem]' />

			<input
				className='size-full absolute top-0 right-0 opacity-0 cursor-pointer'
				ref={inputRef} type='file'
				multiple={multiple} name={name} accept={accept}
				onChange={e => handleFilesInputChange(Array.from(e.target.files ?? []))}
			/>
		</IconButton>
	);
}
