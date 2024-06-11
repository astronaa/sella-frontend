import { FlexTable } from "~/shared/ui/kit";
import { ITEMS_PER_PAGE } from "../config";

export function TableSkeletons() {
	return Array.from({ length: ITEMS_PER_PAGE }).map((_, index) => (
		<FlexTable.RowFullSpan
			key={index} className='skeleton animate-fade-in'
		/>
	))
}