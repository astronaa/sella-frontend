'use client'

import { useDialogState } from "~/shared/lib/dialog";
import { IconButton } from "~/shared/ui/kit/button";
import { Icons } from "~/shared/ui/icons";
import { ReportStoreDialog } from "./ReportStoreDialog";
import { ReportSuccessDialog } from "./ReportSuccessDialog";

export function ReportFlow({ storeUrl }: { storeUrl: string }) {
	const { isOpen, open, handleOpenChange } = useDialogState();
	const { isOpen: isOpenSucess, toggle: toggleSucess } = useDialogState();

	return (
		<>
			<IconButton
				size='lg'
				colorPalette='gray'
				aria-label="Report"
				onClick={open}
			>
				<Icons.AlertOctagon />
			</IconButton>

			<ReportStoreDialog
				open={isOpen}
				onOpenChange={handleOpenChange}
				onActionFulfilled={toggleSucess}
				storeUrl={storeUrl}
			/>

			<ReportSuccessDialog
				open={isOpenSucess}
				onContinue={() => {
					toggleSucess()
					handleOpenChange({ open: false })
				}}
			/>
		</>
	);
}
