import { useCallback, useMemo } from "react";
import { DialogOpenChangeDetails } from "@ark-ui/react";
import { useControllableState } from "../use-controllable-state";

interface UseDialogStateArgs {
	open?: boolean,
	defaultOpen?: boolean,
	onChange?: (open: boolean) => void,
	onOpenChange?: (details: DialogOpenChangeDetails) => void
}

export function useDialogState(props: UseDialogStateArgs = {}) {
	const [open, setOpen] = useControllableState({
		value: props.open, defaultValue: props.defaultOpen,
		onChange(open) {
			props?.onChange?.(open);
			props?.onOpenChange?.({ open });
		},
	});

	const openCb = useCallback(() => { setOpen(true) }, [setOpen]);
	const closeCb = useCallback(() => { setOpen(false) }, [setOpen]);
	const toggleCb = useCallback(() => { setOpen(o => !o) }, [setOpen]);

	const handleOpenChange = useCallback(({ open }: DialogOpenChangeDetails) => {
		setOpen(open);
	}, [setOpen]);

	return useMemo(() => ({
		isOpen: open,
		open: openCb,
		close: closeCb,
		toggle: toggleCb,
		handleOpenChange
	}), [open, openCb, closeCb, toggleCb, handleOpenChange]);
}