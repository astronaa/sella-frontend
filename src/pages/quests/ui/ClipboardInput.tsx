'use client'

import { StoreInputAddon } from "~/entities/store";
import { Input, InputAddon, InputGroup } from "~/shared/ui/kit/input";
import { cn } from "~/shared/lib/cn";
import { IconButton } from "~/shared/ui/kit/button";
import { Icons } from "~/shared/ui/icons";
import { Clipboard } from "~/shared/ui/kit";
import { Skeleton } from "~/shared/ui/kit/skeleton";
import { useUserGetQuery } from "~/entities/user";

export function ClipboardInput() {
	const { data, isLoading } = useUserGetQuery()

	return (
		<Skeleton loading={isLoading} className='rounded-[1rem]'>
			<Clipboard.Root value={`sella.me/${data?.refCode}`}>
				<Clipboard.Control className='flex gap-4'>
					<StoreInputAddon>
						{({ Component: Addon, inputClassName }) => (
							<InputGroup>
								<Clipboard.Input asChild>
									<Input
										className={cn(
											"rounded-[1.25rem] border border-secondary w-full h-full",
											inputClassName,
											'text-black-40',
										)}
										value={data?.refCode}
										readOnly
									/>
								</Clipboard.Input>
								<Clipboard.Context>
									{({ copied }) => copied && (
										<InputAddon className='text-accent-100 right-[1rem]'>
											Copied!
										</InputAddon>
									)}
								</Clipboard.Context>
								<Addon className='text-white' />
							</InputGroup>
						)}
					</StoreInputAddon>

					<Clipboard.Trigger asChild>
						<IconButton
							size='lg'
							variant='solid'
							className='rounded-[20px]'
						>
							<Clipboard.Indicator copied={<Icons.Check />}>
								<Icons.Copy />
							</Clipboard.Indicator>
						</IconButton>
					</Clipboard.Trigger>
				</Clipboard.Control>
			</Clipboard.Root>
		</Skeleton>
	)
}
