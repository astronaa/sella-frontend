'use client';

import { useEditModeStrictContext } from "../../model/edit-mode";
import { cn } from "~/shared/lib/cn";
import { ProductsGrid } from "./ProductsGrid";
import { ProductsEditTable } from "./ProductsEditTable";

interface ProductsStreamProps {
	className?: string,
}

export function ProductsStream({ className }: ProductsStreamProps) {
	const { enabled: editModeEnabled } = useEditModeStrictContext();

	return (
		<div className={cn('flex flex-col gap-[3rem] w-full max-lg:items-center', className)}>
			{editModeEnabled ? (
				<ProductsEditTable />
			) : (
				<ProductsGrid />
			)}
		</div>
	);
}