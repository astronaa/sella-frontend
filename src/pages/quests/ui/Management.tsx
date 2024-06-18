import { PointsButton } from "~/pages/quests/ui/PointsButton";

export function Management() {
	return (
		<div className='flex flex-col gap-[2.5rem]'>
			<div className='bg-white/[.02] border border-secondary p-8 rounded-[1.25rem] flex flex-col gap-12'>
				<div className='flex flex-col gap-4'>
					<div className='text-white text-4xl font-[500]'>Resolve Dispute</div>
					<div className='text-black-60 max-w-[28.75rem]'>Become part of Sella’s Decentralized Management and
						steer the platform towards success!
					</div>
				</div>

				<div className='flex justify-between gap-4'>
					<Card title='Decentralized Management' items={[
						'Users Can Vote on Dispute Resolution',
						'Receive Points for Voting',
						'Assured Consensus With 5 Member Jury',
					]}/>
					<Card title='Securing the Escrow System' items={[
						'Users are the Backbone of Escrow System',
						'Malicious Actors Swiftly Banned Forever',
						'Perks and Incentives Assure Quick Resolution',
					]}/>
					<Card title='Funds Release Guarantee' items={[
						'Consensus Enforced by Automatic System',
						'Funds Released as Dispute Resolves',
						'Functionality Secured Through Smart Contract',
					]}/>
				</div>

				<div>
					<PointsButton points={15000}/>
				</div>
			</div>

			<div className='bg-white/[.02] border border-secondary p-8 rounded-[1.25rem] flex flex-col gap-12'>
				<div className='flex flex-col gap-4'>
					<div className='text-white text-4xl font-[500]'>Resolve Dispute</div>
					<div className='text-black-60 max-w-[28.75rem]'>Become part of Sella’s Decentralized Management and
						steer the platform towards success!
					</div>
				</div>

				<div className='flex justify-between gap-4'>
					<Card title='Educate Yourself' items={[
						'Read our Prohibited Items List',
						'Study our Terms of Service',
						'Get Tips on Best Practices',
					]}/>
					<Card title='Jump Into Action' items={[
						'Click the Button Below to Start',
						'Carefully Study Each Report',
						'Vote Only When you are Certain',
					]}/>
					<Card title='Cash In' items={[
						'Points are Automatically Added to your Account',
						'Exchange Points via the Spend Points Dashboard',
						'Reap the Benefits of your Efforts',
					]}/>
				</div>

				<div>
					<PointsButton points={15000}/>
				</div>
			</div>
		</div>
	)
}

const Card = ({
	              title,
	              items
}: {
	title: string
	items: string[]
}) => {
	return (
		<div className='flex flex-col gap-4 font-[500] text-sm text-black-40'>
			<div className='text-white text-xl font-[600]'>{title}</div>
			<div className='flex flex-col gap-2'>
				{items.map((text) => (
					<div key={text}>{`— ${text}`}</div>
				))}
			</div>
		</div>
	)
}

