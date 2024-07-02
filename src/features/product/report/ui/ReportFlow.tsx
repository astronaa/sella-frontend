'use client'

import { useDialogState } from "~/shared/lib/dialog";
import { IconButton } from "~/shared/ui/kit/button";
import { Icons } from "~/shared/ui/icons";
import { ReportProductDialog } from "./ReportProductDialog";
import { ReportSuccessDialog } from "./ReportSuccessDialog";
import { ProductId } from "~/shared/api/client";

export function ReportFlow({ productId }: { productId: ProductId }) {
	const { isOpen, open, handleOpenChange } = useDialogState();
	const { isOpen: isOpenSucess, toggle: toggleSucess } = useDialogState();

	return (
		<>
			<IconButton
				size='lg'
				colorPalette='gray'
				aria-label="Report"
				onClick={open}
				className='border-none bg-transparent text-black-40 gap-2'
			>
				<Icons.AlertCircle />
				<span>Report Product</span>
			</IconButton>

			<ReportProductDialog
				open={isOpen}
				onOpenChange={handleOpenChange}
				onActionFulfilled={toggleSucess}
				productId={productId}
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
