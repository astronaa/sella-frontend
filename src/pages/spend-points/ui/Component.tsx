import { Heading } from "~/shared/ui/kit/heading";
import { GiftCard } from "~/pages/spend-points/ui/GiftCard";
import { TokenCard } from "~/pages/spend-points/ui/TokenCard";

export async function Component() {
	return (
		<div className='px-4'>
			<div className='max-w-content m-auto flex flex-col gap-12'>
				<Heading>
					Spend Points
				</Heading>

				<div>
					<div className='font-[600] text-white text-[2rem] mb-4'>Gift Cards</div>

					<div className='grid grid-cols-3 gap-[2.5rem] grid-flow-row auto-rows-[minmax(13.75rem,_2fr)]'>
						<GiftCard points={1000} price={100}/>
						<GiftCard points={1000} price={100}/>
						<GiftCard points={1000} price={100}/>
						<GiftCard points={1000} price={100}/>
					</div>
				</div>

				<div>
					<div className='font-bold text-white text-[2rem] mb-4'>Sella Tokens</div>

					<div className='grid grid-cols-3 gap-[2.5rem] grid-flow-row auto-rows-[minmax(13.75rem,_2fr)]'>
						<TokenCard points={1000} price={100}/>
						<TokenCard points={1000} price={100}/>
						<TokenCard points={1000} price={100}/>
						<TokenCard points={1000} price={100}/>
					</div>
				</div>
			</div>
		</div>
	)
}
