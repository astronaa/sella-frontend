import { Transaction } from "~/shared/api/client"
import { Badge } from "~/shared/ui/kit/badge";

export function TransactionStatusBadge({ status }: { status: Transaction['status']; }) {
	switch (status) {
		case 'Dispute':
		case 'Hold':
			return <Badge colorPalette='accent'>{status}</Badge>;
		default:
			return (
				<Badge className='capitalize'>
					{status}
				</Badge>
			);
	}
}