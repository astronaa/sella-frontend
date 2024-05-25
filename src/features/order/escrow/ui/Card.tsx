import { HTMLAttributes } from "react";
import { OrderProp } from "~/entities/order";
import { cn } from "~/shared/lib/cn";
import { Button } from "~/shared/ui/kit/button";
import { Heading } from "~/shared/ui/kit/heading";

type CardProps = HTMLAttributes<HTMLDivElement> & OrderProp & {
	onActionFulfilled?: () => void;
};

export function Card({ className, onActionFulfilled, ...props }: CardProps) {
	return (
		<div {...props} className={cn('flex flex-col p-[1rem] gap-[1rem] rounded-[1.25rem] border border-secondary', className)}>
			<Heading size='xs'>Escrow</Heading>

			<div className='p-[1rem] rounded-[0.75rem] bg-white/[.06] text-black-60 border border-secondary'>
				<div className='flex justify-between w-full text-accent-100 mb-[0.75rem] gap-[1rem]'>
					<span className='text-[1.125rem]'>Order has been paid</span>
					<span className='font-semibold'>0.89</span>
				</div>
				<p>
					The seller has been notified of your payment. Once they confirm fulfilment of your order, you will be notified.
					Please review and release the funds within 24 hours of receiving the item or service. If you do not release
					the funds, they will be automatically released unless you initiate a dispute.
				</p>
			</div>

			<div className='flex justify-between w-full pt-[1rem] gap-[1rem] text-black-74'>
				<span>Automatic Escrow</span>
				<span className='text-accent-100'>23:59:14</span>
			</div>

			<Button size='xl' onClick={onActionFulfilled}>
				Release payment to seller
			</Button>

			<Button variant='subtle' colorPalette='red' size='xl'>
				Open Dispute
			</Button>
		</div>
	);
}