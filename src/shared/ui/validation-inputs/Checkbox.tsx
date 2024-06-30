import {useField} from "react-final-form";
import {Checkbox, CheckboxProps} from "~/shared/ui/kit/checkbox";
import {useFormControlStrictContext} from "~/shared/ui/validation-inputs/ControlProvider";

export function VCheckbox({ ...props }: CheckboxProps){
	const { name } = useFormControlStrictContext();
	const { input: { ...fieldProps } } = useField(name, {type: 'checkbox'});

	return (
		<Checkbox {...props} {...fieldProps} />
	)
}