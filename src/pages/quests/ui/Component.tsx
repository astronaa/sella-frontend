import { Heading } from "~/shared/ui/kit/heading";
import { MarketingCard } from "~/pages/quests/ui/MarketingCard";
import { Icons } from "~/shared/ui/icons";
import { Button } from "~/shared/ui/kit/button";
import { ReactNode } from "react";
import { Links } from "~/pages/quests/ui/Links";
import { ClipboardInput } from "~/pages/quests/ui/ClipboardInput";
import Link from "next/link";

export async function Component({ children }: { children: ReactNode }) {
	return (
		<div className='px-4'>
			<div className='max-w-content m-auto flex flex-col gap-12'>
				<Heading>
					Quests
				</Heading>

				<div className='border border-secondary p-[1rem] rounded-[1.25rem] flex gap-4 items-center justify-between max-md:flex-col'>
					<ClipboardInput/>

					<div className='flex gap-8 font-[500] max-md:gap-4 max-md:flex-col max-md:w-full'>
						<div className='max-md:flex max-md:justify-between'>
							<span className='text-black-40'>Friends Referred:</span>{' '}
							<span className='text-white'>5</span>
						</div>
						<div className='max-md:flex max-md:justify-between'>
							<span className='text-black-40'>Referral Points:</span>{' '}
							<span className='text-white'>650</span>
						</div>
						<div className='max-md:flex max-md:justify-between'>
							<span className='text-black-40'>Points Earned:</span>{' '}
							<span className='text-white'>17500</span>
						</div>
					</div>
				</div>

				<div className='grid grid-cols-3 gap-[2.5rem] max-md:grid-cols-1'>
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

				<div className='flex flex-col gap-6'>
					<div className='flex items-center justify-between w-full max-md:flex-col-reverse max-md:gap-4'>
						<div className='max-md:overflow-x-scroll max-md:overflow-y-hidden max-md:self-start max-md:w-[100vw]
							max-md:px-[1rem] max-md:mx-[-1rem] scrollbar-hide'>
							<Links />
						</div>

						<div className='flex items-center gap-6 max-md:self-end'>
							<div className='flex items-center gap-1 text-accent-100'>
								<div>8500</div>
								<Icons.PointsIcon/>
							</div>

							<Link href='/dashboard/quests/spend-points'>
								<Button size='sm' variant='solid'>
									Spend Points
								</Button>
							</Link>
						</div>
					</div>

					{children}
				</div>
			</div>
		</div>
	);
}
