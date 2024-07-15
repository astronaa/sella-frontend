import { useField } from "react-final-form";
import { ToggleGroup } from '~/shared/ui/kit';
import { ControlProps, FormControlProvider } from "./ControlProvider";
import { ComponentProps } from "react";

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export function Root({ name, id, onValueChange, ...props }: ToggleGroup.RootProps & ControlProps) {
	const { input: { value, onChange } } = useField(name);

	return (
		<FormControlProvider id={id} name={name}>
			<ToggleGroup.Root
				value={value}
				onValueChange={(v) => {
					onValueChange?.(v)
					onChange(props?.multiple ? v.value : v.value[0])
				}}
				{...props}
			/>
		</FormControlProvider>
	)
}

export type RootProps = ComponentProps<typeof Root>;

export {
	Label, LabelOrError,
	Description, ErrorText
} from './TextControl'

export const Item = ToggleGroup.Item;