import { Icons } from "~/shared/ui/icons";

export function TokenCard({
	                          price,
	                          points
}: {
	price: number
	points: number
}) {
	return (
		<div
			className='relative border border-secondary rounded-[1.25rem] p-4 pr-8 flex flex-col justify-between'
			style={{
				background: 'linear-gradient(90deg, #EC9515 0%, #FFDD00 100%)'
			}}
		>

			<div className='text-5xl text-black'>${price}</div>

			<div>
				<div className='flex items-center gap-1 text-black'>
					<div>{points}</div>
					<Icons.PointsIcon />
				</div>
				<div className='text-sm	text-black'>Sella Tokens</div>
			</div>

			<Icons.SellaCardLogo className='absolute right-5 bottom-5 text-black'/>
		</div>
	)
}
