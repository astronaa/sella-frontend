'use client'

import { useDialogState } from "~/shared/lib/dialog";
import { IconButton } from "~/shared/ui/kit/button";
import { Icons } from "~/shared/ui/icons";
import { ReportProductDialog } from "./ReportProductDialog";
import { ReportSuccessDialog } from "./ReportSuccessDialog";
import { useUserGetQuery } from "~/entities/user";
import { Product } from "~/shared/api/client";
import { useGetProductReport } from "~/entities/product/api/queries";

export function ReportFlow({ product }: { product: Product }) {
	const { isOpen, open, handleOpenChange } = useDialogState();
	const { isOpen: isOpenSuccess, toggle: toggleSuccess } = useDialogState();
	const { data: user, isLoading: isUserLoading } = useUserGetQuery()

	const { data: reportData, isLoading: isReportLoading } = useGetProductReport({ productId: product.id })

	const isMyProduct = product.store?.owner.username === user?.username

	if(isMyProduct || reportData || isReportLoading || isUserLoading) {
		return null
	}

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
				onActionFulfilled={toggleSuccess}
				productId={product.id}
			/>

			<ReportSuccessDialog
				open={isOpenSuccess}
				onContinue={() => {
					toggleSuccess()
					handleOpenChange({ open: false })
				}}
			/>
		</>
	);
}
