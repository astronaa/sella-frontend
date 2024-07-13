import { useFormControlStrictContext } from "~/shared/ui/validation-inputs/ControlProvider";
import { useField } from "react-final-form";
import { TagsInputRootProps, useTagsInput } from "@ark-ui/react/tags-input";
import { Button, IconButton } from "~/shared/ui/kit/button";
import { Icons } from "~/shared/ui/icons";
import { Combobox, TagsInput } from "../kit";
import { Portal, useCombobox } from "@ark-ui/react";
import { cn } from "~/shared/lib/cn";
import { useState } from "react";

const data = [
	{ label: 'React', value: 'react' },
	{ label: 'Solid', value: 'solid' },
	{ label: 'Svelte', value: 'svelte' },
	{ label: 'Vue', value: 'vue' },
]

export interface VTagsInputProps extends TagsInputRootProps {
	placeholder?: string,
	items: { label: string, value: string }[];
}

export function VTagsInput({ placeholder, items = data, ...props }: VTagsInputProps) {
	const { id, name } = useFormControlStrictContext();
	const { input: { onChange, ...fieldProps } } = useField(name);
	const value = fieldProps.value || [];

	const tagsInput = useTagsInput({
		id, value,
		onValueChange: ({ value }) => onChange(value),
		...props
	});

	const selectedTags = tagsInput.value;
	const tagsToChoose = items.filter(i => !selectedTags.includes(i.value));

	const [comboboxOpen, setComboboxOpen] = useState(false);
	const shouldComboboxOpen = tagsToChoose.length > 0;

	const combobox = useCombobox({
		items,
		multiple: true,
		positioning: { gutter: 0 },
		value: tagsInput.value,
		open: comboboxOpen && shouldComboboxOpen,
		onOpenChange: details => setComboboxOpen(details.open),
		onValueChange: details => tagsInput.setValue(details.value),
		onInteractOutside: event => {
			event.stopPropagation();
			event.preventDefault();
		}
	});

	return (
		<TagsInput.RootProdiver value={tagsInput}>
			<Combobox.RootProvider
				value={combobox}
			>
				<Combobox.Control>
					<TagsInput.Control
						className={cn(
							'static border-b border-b-transparent',
							combobox.open && 'rounded-b-none  border-b-secondary'
						)}
					>
						{tagsInput.value.map((value, index) => (
							<TagsInput.Item key={index} index={index} value={value}>
								<TagsInput.ItemPreview>
									<TagsInput.ItemText>{value}</TagsInput.ItemText>
									<TagsInput.ItemDeleteTrigger asChild>
										<Button variant="unstyled" size="xs">
											<Icons.Close className='text-black-40 hover:text-black-60' />
										</Button>
									</TagsInput.ItemDeleteTrigger>
								</TagsInput.ItemPreview>
							</TagsInput.Item>
						))}
						{!tagsInput.value.length && (
							<span className='text-black-60 cursor-pointer'>
								{placeholder}
							</span>
						)}

						{shouldComboboxOpen && (
							<Combobox.Trigger asChild>
								<IconButton
									colorPalette='gray' size='sm'
									className='border-none top-[0.625rem]'
								>
									<Icons.Close
										className={cn(
											'transform rotate-45 transition-transform',
											combobox.open && 'rotate-0'
										)}
									/>
								</IconButton>
							</Combobox.Trigger>
						)}
					</TagsInput.Control>
				</Combobox.Control>

				<Portal>
					<Combobox.Positioner>
						<Combobox.Content 
							className='flex-row flex-wrap gap-[0.75rem] max-h-[10rem] overflow-y-auto'
						>
							{tagsToChoose.map((item) => (
								<Combobox.Item
									key={item.value}
									asChild item={item}
								>
									<Button colorPalette='gray' size='sm'>
										{item.label}
									</Button>
								</Combobox.Item>
							))}
						</Combobox.Content>
					</Combobox.Positioner>
				</Portal>
			</Combobox.RootProvider>
		</TagsInput.RootProdiver>
	);
}
