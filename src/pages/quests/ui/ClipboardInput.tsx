'use client'

import { StoreInputAddon } from "~/entities/store";
import { Input, InputGroup } from "~/shared/ui/kit/input";
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
			<Clipboard.Root value={`sella.me/${data?.refCode}`}
			>
				{({ isCopied }) => (
					<div className='flex gap-4'>
						<StoreInputAddon>
							{({ Component: Addon, inputClassName }) => (
								<InputGroup
									className={cn('relative after:absolute after:content-["Copied!"] w-[23.5rem] min-w-[18rem]',
										'after:text-accent-100 after:transform after:-translate-y-1/2',
										'after:top-1/2 after:right-[1rem]',
										{ 'after:hidden': !isCopied }
									)}
								>
									<Input
										className={cn(
											"rounded-[1.25rem] border border-secondary w-full h-full",
											inputClassName,
											'text-black-40'
										)}
										value={data?.refCode}
										readOnly
									/>
									<Addon className='text-white'/>
								</InputGroup>
							)}
						</StoreInputAddon>

						<Clipboard.Trigger asChild>
							<IconButton
								size='lg'
								variant='solid'
								className='rounded-[20px]'
							>
								{isCopied ? <Icons.Check/> : <Icons.Copy/>}
							</IconButton>
						</Clipboard.Trigger>
					</div>
				)}
			</Clipboard.Root>
		</Skeleton>
	)
}
