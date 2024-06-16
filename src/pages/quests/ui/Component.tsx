import { Heading } from "~/shared/ui/kit/heading";
import { SocialTask } from "~/pages/quests/ui/SocialTask";
import { MarketingCard } from "~/pages/quests/ui/MarketingCard";
import { Icons } from "~/shared/ui/icons";
import { StoreInputAddon } from "~/entities/store";
import { Input, InputGroup } from "~/shared/ui/kit/input";
import { cn } from "~/shared/lib/cn";
import { Tabs } from "~/shared/ui/kit";

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

				<div className='border border-secondary p-[1rem] rounded-[1.25rem] flex gap-4 flex items-center justify-between'>
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
						<Tabs.Indicator />
					</Tabs.List>

					<Tabs.Content value="1">
						<div className='grid grid-cols-2 gap-x-[2.5rem] gap-y-3'>
							<SocialTask title='Follow on X' description='Stay updated with the latest Sella trends and news!'/>
							<SocialTask title='Follow on X' description='Stay updated with the latest Sella trends and news!'/>
							<SocialTask title='Follow on X' description='Stay updated with the latest Sella trends and news!'/>
							<SocialTask title='Follow on X' description='Stay updated with the latest Sella trends and news!'/>
							<SocialTask title='Follow on X' description='Stay updated with the latest Sella trends and news!'/>
							<SocialTask title='Follow on X' description='Stay updated with the latest Sella trends and news!' disabled/>
						</div>
					</Tabs.Content>
				</Tabs.Root>
			</div>
		</div>
	);
}
