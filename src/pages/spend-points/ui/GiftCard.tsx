import { Background } from "~/pages/home/ui/SectionBackground";
import { Icons } from "~/shared/ui/icons";

export function GiftCard({
	price,
	points
}: {
	price: number
	points: number
}) {
	return (
		<div className='relative overflow-hidden border border-secondary rounded-[1.25rem] p-4 pr-8 flex flex-col justify-between'>
			<Background className='z-[-1]' />

			<div className='text-5xl text-white'>${price}</div>

			<div>
				<div className='text-accent-100'>{points}</div>
				<div className='text-sm	text-black-40'>Sella Gift Card</div>
			</div>

			<Icons.SellaCardLogo className='absolute right-5 bottom-5 text-accent-100' />
		</div>
	)
}
