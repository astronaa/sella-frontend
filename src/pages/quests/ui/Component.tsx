import { Heading } from "~/shared/ui/kit/heading";
import { SocialTask } from "~/pages/quests/ui/SocialTask";
import { MarketingCard } from "~/pages/quests/ui/MarketingCard";
import { Icons } from "~/shared/ui/icons";
import { StoreInputAddon } from "~/entities/store";
import { Input, InputGroup } from "~/shared/ui/kit/input";
import { cn } from "~/shared/lib/cn";
import { Tabs } from "~/shared/ui/kit";
import { Button } from "~/shared/ui/kit/button";
import { PointsButton } from "~/pages/quests/ui/PointsButton";

const tabs = [
	{ id: '1', label: 'Social tasks' },
	{ id: '2', label: 'Milestones' },
	{ id: '3', label: 'Decentralized management' },
]

export async function Component() {
	return (
		<div className='px-4'>
			<div className='max-w-content m-auto flex flex-col gap-12'>
				<Heading>
					Quests
				</Heading>

				<div
					className='border border-secondary p-[1rem] rounded-[1.25rem] flex gap-4 items-center justify-between'>
					<StoreInputAddon>
						{({ Component: Addon, inputClassName }) => (
							<InputGroup>
								<Input
									className={cn("rounded-[1.25rem] border border-secondary w-full h-full", inputClassName)}
									placeholder="FJ78H234G"
								/>
								<Addon className='text-white'/>
							</InputGroup>
						)}
					</StoreInputAddon>

					<div className='flex gap-8 font-[500]'>
						<div>
							<span className='text-black-40'>Friends Referred:</span>{' '}
							<span className='text-white'>5</span>
						</div>
						<div>
							<span className='text-black-40'>Referral Points:</span>{' '}
							<span className='text-white'>650</span>
						</div>
						<div>
							<span className='text-black-40'>Points Earned:</span>{' '}
							<span className='text-white'>17500</span>
						</div>
					</div>
				</div>

				<div className='grid grid-cols-3 gap-[2.5rem]'>
					<MarketingCard
						title='Earn Points'
						items={[
							{ Icon: Icons.Scales, text: 'Resolve Disputes & Reports' },
							{ Icon: Icons.Users, text: 'Complete Social Tasks & Refer Friends' },
							{ Icon: Icons.Route, text: 'Achieve Sella Milestones' },
						]}
					/>
					<MarketingCard
						title='Referral Program'
						items={[
							{ Icon: Icons.Percent, text: 'Get 10% of Referred Individuals’ Points' },
							{ Icon: Icons.Lightning, text: 'Achieve Referral Milestones & GetBoosts' },
							{ Icon: Icons.Link, text: 'Single-level Referrals Only' },
						]}
					/>
					<MarketingCard
						title='Redeem Points'
						items={[
							{ Icon: Icons.Coins, text: 'Top Up Your Sella Balance' },
							{ Icon: Icons.Refresh01, text: 'Get Vested $SELLA Tokens' },
							{ Icon: Icons.Gift, text: 'Exchange Points for Gift Cards' },
						]}
					/>
				</div>

				<Tabs.Root defaultValue="1">
					<div className='flex justify-between w-full'>
						<Tabs.List className='border-0 p-0 h-fit'>
							{tabs.map((tab) => (
								<Tabs.Trigger
									className='mb-6 w-fit h-fit px-4 py-2 rounded-[0.75rem] text-black-60 data-[selected]:text-white'
									key={tab.id}
									value={tab.id}
								>
									{tab.label}
								</Tabs.Trigger>
							))}
							<Tabs.Indicator/>
						</Tabs.List>

						<div className='flex items-center gap-6'>
							<div className='flex items-center gap-1 text-accent-100'>
								<div>8500</div>
								<Icons.PointsIcon/>
							</div>

							<Button size='sm' variant='solid'>
								Earn Points
							</Button>
						</div>
					</div>

					<Tabs.Content value="1">
						<div className='grid grid-cols-2 gap-x-[2.5rem] gap-y-3'>
							{/* TODO make map */}
							<SocialTask
								points={2000}
								title='Follow on X'
								description='Stay updated with the latest Sella trends and news!'
								complete
							/>
							<SocialTask
								points={500}
								title='Like Medium Post'
								description='Show Sella articles some love with claps!'
							/>
							<SocialTask
								points={1500}
								title='Add 🟡 Sella to username'
								description="Show support by adding 'Sella' to your username!"
							/>
							<SocialTask
								points={500}
								title='Upvote on Reddit'
								description="Think Sella’s cool? Give it an upvote on Reddit!"
							/>
							<SocialTask
								points={1500}
								title='Retweet on X'
								description='Spread the word! Share Sella with your network!'
							/>
							<SocialTask
								points={1000}
								title='Refer 1 friend'
								description='Refer a friend and share the joy!'
							/>
							<SocialTask
								points={750}
								title='Like on X'
								description='Love Sella? Hit like and let everyone know!'
							/>
							<SocialTask
								points={5000}
								title='Refer 5 friends'
								description='More friends, more fun!'
								disabled
							/>
							<SocialTask
								points={2500}
								title='Comment on X'
								description='Leave a comment and join the conversation!'
							/>
							<SocialTask
								points={15000}
								title='Refer 10 friends'
								description='Become a super referrer!'
								disabled
							/>
							<SocialTask
								points={500}
								title='Follow on Telegram'
								description='Join our Telegram Community for exclusive updates!'
							/>
							<SocialTask
								points={500}
								title='Create your first Store'
								description='Start your entrepreneurial journey!'
							/>
						</div>
					</Tabs.Content>
					<Tabs.Content value="3" className='flex flex-col gap-[2.5rem]'>
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
					</Tabs.Content>
				</Tabs.Root>
			</div>
		</div>
	);
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
