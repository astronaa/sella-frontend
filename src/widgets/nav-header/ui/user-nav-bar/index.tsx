'use client';

import { HTMLAttributes } from "react";
import { NotAuthorizedBar } from "./NotAuthorizedBar";
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
			className='rounded-[1rem]' 
			loading={user === undefined}
		>
			{!!isAuthorized ? (
				<AuthorizedBar address={address} {...props} />
			) : (
				<NotAuthorizedBar {...props} />
			)}
		</Skeleton>
	);
}
