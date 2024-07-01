import { Heading } from "~/shared/ui/kit/heading";
import { GiftCard } from "~/pages/spend-points/ui/GiftCard";
import { TokenCard } from "~/pages/spend-points/ui/TokenCard";
import { Button } from "~/shared/ui/kit/button";
import { Icons } from "~/shared/ui/icons";

type Items = {
	price: number
	points: number
}[]

const gifts: Items = [
	{
		price: 100,
		points: 1000,
	},
	{
		price: 250,
		points: 2500,
	},
	{
		price: 500,
		points: 5000,
	},
	{
		price: 1000,
		points: 10000,
	},
	{
		price: 2500,
		points: 25000,
	},
	{
		price: 5000,
		points: 50000,
	},
]

const tokens = [
	{
		price: 5,
		points: 5000,
	},
	{
		price: 25,
		points: 25000,
	},
	{
		price: 50,
		points: 50000,
	},
	{
		price: 250,
		points: 250000,
	},
	{
		price: 500,
		points: 500000,
	},
]

export async function Component() {
	return (
		<div className='px-4'>
			<div className='max-w-content m-auto flex flex-col gap-12'>

				<div className='flex justify-between w-full max-md:flex-col max-md:gap-8'>
					<Heading>
						Spend Points
					</Heading>

					<div className='flex items-center gap-6 max-md:self-end'>
						<div className='flex items-center gap-1 text-accent-100'>
							<div>8500</div>
							<Icons.PointsIcon />
						</div>

						<Button size='sm' variant='solid'>
							Earn Points
						</Button>
					</div>
				</div>

				<div>
					<div className='font-[600] text-white text-[2rem] mb-4'>Gift Cards</div>

					<div className='grid grid-cols-3 gap-[2.5rem] grid-flow-row auto-rows-[minmax(13.75rem,_2fr)]
					max-md:grid-cols-1'>
						{gifts.map(({ points, price }, i) => (
							<GiftCard key={i} points={points} price={price}/>
						))}
					</div>
				</div>

				<div>
					<div className='font-bold text-white text-[2rem] mb-4'>Sella Tokens</div>

					<div className='grid grid-cols-3 gap-[2.5rem] grid-flow-row auto-rows-[minmax(13.75rem,_2fr)]
					max-md:grid-cols-1'>
						{tokens.map(({ points, price }, i) => (
							<TokenCard key={i} points={points} price={price}/>
						))}
					</div>
				</div>
			</div>
		</div>
	)
}
