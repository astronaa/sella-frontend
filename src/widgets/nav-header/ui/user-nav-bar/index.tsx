'use client';

import { HTMLAttributes } from "react";
import { UnauthorizedBar } from "./UnauthorizedBar";
import { AuthorizedBar } from "./AuthorizedBar";
import { useUserGetQuery } from "~/entities/user";
import { Skeleton } from "~/shared/ui/kit/skeleton";
import { useAccount } from "wagmi";

export function UserNavBar(props: HTMLAttributes<HTMLDivElement>) {
	const { address } = useAccount();
	const { data: user } = useUserGetQuery();
	const isAuthorized = !!user && address;

	return (
		<Skeleton 
			asChild
			className='rounded-[1rem] max-lg:pt-[1.5rem] max-lg:px-[1.25rem]' 
			loading={user === undefined}
		>
			{!!isAuthorized ? (
				<AuthorizedBar {...props} />
			) : (
				<UnauthorizedBar {...props} />
			)}
		</Skeleton>
	);
}
