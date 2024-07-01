import { useForm, useFormState } from "react-final-form";
import { Button, ButtonProps } from "../kit/button";

export function VSubmitButton(props: ButtonProps) {
	const { submit } = useForm();
	const { submitting } = useFormState({
		subscription: { submitting: true }
	})

	return (
		<Button
			{...props}
			disabled={submitting || !!props?.disabled}
			onClick={(e) => {
				if(props.onClick){
					props.onClick(e)
				}
				submit()
			}}
		/>
	);
}