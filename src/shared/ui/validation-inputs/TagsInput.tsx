import {useFormControlStrictContext} from "~/shared/ui/validation-inputs/ControlProvider";
import {useField} from "react-final-form";
import {TagsInputRootProps} from "@ark-ui/react/tags-input";
import {Button} from "~/shared/ui/kit/button";
import {Icons} from "~/shared/ui/icons";
import { TagsInput } from "../kit";

export function VTagsInput({ placeholder, ...props }: TagsInputRootProps & {placeholder?: string}) {
	const { id, name } = useFormControlStrictContext();
	const { input: { onChange, ...fieldProps } } = useField(name);

	return (
		<TagsInput.Root id={id} {...props} value={fieldProps.value || []} onValueChange={({value}) => {
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
											<Button variant="unstyled">
												<Icons.Close className='text-black-40' />
											</Button>
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
