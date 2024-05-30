import { useCallback, useMemo, useState } from "react";
import { useCallbackRef } from "../use-callback-ref";

interface UseDialogStateArgs {
	defaultOpen?: boolean,
	processValueChange?: (open: boolean) => boolean | void
}

export function useDialogState({ defaultOpen = false, processValueChange }: UseDialogStateArgs = {}) {
	const [open, setOpen] = useState(defaultOpen);

	const applyOpenValue = useCallbackRef((open: boolean) => {
		if (processValueChange)
			setOpen(processValueChange(open) ?? open);
		else
			setOpen(open);
	});

	const openCb = useCallback(() => { applyOpenValue(true) }, [applyOpenValue]);
	const closeCb = useCallback(() => { applyOpenValue(false) }, [applyOpenValue]);
	const toggleCb = useCallback(() => { applyOpenValue(!open) }, [applyOpenValue, open]);

	const handleOpenChange = useCallback(({ open }: { open: boolean }) => {
		applyOpenValue(open);
	}, [applyOpenValue]);

	return useMemo(() => ({
		isOpen: open,
		open: openCb,
		close: closeCb,
		toggle: toggleCb,
		handleOpenChange
	}), [open, openCb, closeCb, toggleCb, handleOpenChange]);
}