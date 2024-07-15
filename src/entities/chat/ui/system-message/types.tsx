import { ComponentType, HTMLAttributes } from "react";
import { ChatSystemMessageTypes } from "~/shared/api/client";
import { Icons } from "~/shared/ui/icons";
import { Price } from "~/shared/ui/price";

export interface SystemMessageAttrs {
	title?: string,
	className?: string,
	description: string,
	Icon: ComponentType<HTMLAttributes<SVGElement>>,
	Meta?: ComponentType<{ data: Record<string, string> }>
}

export const systemMessageTypes = new Map<ChatSystemMessageTypes, SystemMessageAttrs>([
	['NEW_CHAT', {
		description: `Feel free to ask any questions before ordering by messaging the seller. Keep all 
		conversations within this chat window to stay protected from scams.`,
		Icon: Icons.SellaInside,
		className: 'text-accent-100',
	}],
	['FUNDS_DEPOSITED', {
		title: 'Transaction Complete',
		description: `Transaction has been processed, the seller has been notified to initiate delivery. 
			The funds will be held in escrow until you confirm receipt.`,
		Icon: Icons.CircleCheckedOutline,
		className: 'text-green-100',
		Meta: ({ data }) => (
			<Price
				price={Number(data.amount)}
				className='text-[2.25rem] text-green-current'
			/>
		)
	}],
	['FUNDS_RELEASED', {
		title: 'Payment Released',
		description: `The buyer received the product and released the payment to the seller.`,
		Icon: Icons.CircleCheckedOutline,
		className: 'text-green-100'
	}],
	['FUNDS_CLAIMED', {
		title: 'Payment Claimed',
		description: `The seller took the payment for himself after the expiration of the escrow time.`,
		Icon: Icons.CircleCheckedOutline,
		className: 'text-accent-100'
	}],
])
