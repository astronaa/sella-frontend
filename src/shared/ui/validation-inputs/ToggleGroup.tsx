import { useField } from "react-final-form";
import { ToggleGroup } from '~/shared/ui/kit';
import { ControlProps, ControlProvider } from "./ControlProvider";
import { ComponentProps } from "react";

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export function Root({ name, id, onValueChange, ...props }: ToggleGroup.RootProps & ControlProps) {
	const { input: { value, onChange } } = useField(name);

	return (
		<ControlProvider id={id} name={name}>
			<ToggleGroup.Root
				value={value}
				onValueChange={(v) => {
					onValueChange?.(v)
					onChange(v.value)
				}}
				{...props}
			/>
		</ControlProvider>
	)
}

export type RootProps = ComponentProps<typeof Root>;

export {
	Label, LabelOrError,
	Description, ErrorText
} from './TextControl'

export const Item = ToggleGroup.Item;