import { Heading } from "~/shared/ui/kit/heading";
import { MarketingCard } from "~/pages/quests/ui/MarketingCard";
import { Icons } from "~/shared/ui/icons";
import { StoreInputAddon } from "~/entities/store";
import { Input, InputGroup } from "~/shared/ui/kit/input";
import { cn } from "~/shared/lib/cn";
import { Button, IconButton } from "~/shared/ui/kit/button";
import { Clipboard } from "~/shared/ui/kit";
import { ReactNode } from "react";
import { Links } from "~/pages/quests/ui/Links";

export async function Component({ children }: { children: ReactNode }) {
	const code = "FJ78H234G"

	return (
		<div className='px-4'>
			<div className='max-w-content m-auto flex flex-col gap-12'>
				<Heading>
					Quests
				</Heading>

				<div className='border border-secondary p-[1rem] rounded-[1.25rem] flex gap-4 items-center justify-between'>
					<Clipboard.Root value={`sella.me/${code}`}>
						<div className='flex gap-4'>
							<StoreInputAddon>
								{({ Component: Addon, inputClassName }) => (
									<InputGroup>
										<Input
											className={cn(
												"rounded-[1.25rem] border border-secondary w-full h-full",
												inputClassName,
												'text-black-40'
											)}
											value={code}
											readOnly
										/>
										<Addon className='text-white'/>
									</InputGroup>
								)}
							</StoreInputAddon>

							<Clipboard.Trigger asChild>
								<IconButton size='lg' variant='solid' className='rounded-[20px]'><Icons.Copy/></IconButton>
							</Clipboard.Trigger>
						</div>
					</Clipboard.Root>


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

				<div className='flex flex-col gap-6'>
					<div className='flex items-center justify-between w-full'>
						<Links/>

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

					{children}
				</div>
			</div>
		</div>
	);
}
