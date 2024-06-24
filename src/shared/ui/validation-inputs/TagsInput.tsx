import {useFormControlStrictContext} from "~/shared/ui/validation-inputs/ControlProvider";
import {useField} from "react-final-form";
import {TagsInputRootProps} from "@ark-ui/react/tags-input";
import {IconButton} from "~/shared/ui/kit/button";
import {Icons} from "~/shared/ui/icons";
import { TagsInput } from "../kit";

export function VTagsInput({ placeholder, ...props }: TagsInputRootProps & {placeholder?: string}) {
	const { id, name } = useFormControlStrictContext();
	const { input: { onChange, ...fieldProps } } = useField(name);

	return (
		<TagsInput.Root id={id} {...props} defaultValue={[]} value={fieldProps.value} onValueChange={({value}) => {
			onChange(value)
		}}>
			<TagsInput.Context>
				{(api) => (
					<>
						<TagsInput.Control>
							{api.value && api.value.map((value, index) => (
								<TagsInput.Item key={index} index={index} value={value}>
									<TagsInput.ItemPreview>
										<TagsInput.ItemText>{value}</TagsInput.ItemText>
										<TagsInput.ItemDeleteTrigger asChild>
											<IconButton variant="ghost" size="xs">
												<Icons.Close className='size-[1rem] text-black-40' />
											</IconButton>
										</TagsInput.ItemDeleteTrigger>
									</TagsInput.ItemPreview>
								</TagsInput.Item>
							))}
							<TagsInput.Input placeholder={placeholder} onBlur={fieldProps.onBlur} onFocus={fieldProps.onFocus} />
						</TagsInput.Control>
					</>
				)}
			</TagsInput.Context>
		</TagsInput.Root>
	);
}
