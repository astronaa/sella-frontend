import { FieldMetaState } from "react-final-form";

export function extractErrorFromFieldState(state: FieldMetaState<unknown>) {
	return state.error ?? state.submitError
}

export function shouldRenderFieldError(state: FieldMetaState<unknown>) {
	return !!(state.touched && !state.valid && (!state.submitError || !state.modifiedSinceLastSubmit));
}