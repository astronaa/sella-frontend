'use client';

import { HTMLAttributes } from "react";
import { UnauthorizedBar } from "./UnauthorizedBar";
import { AuthorizedBar } from "./AuthorizedBar";
import { useUserGetQuery } from "~/entities/user";
import { Skeleton } from "~/shared/ui/kit/skeleton";

export function UserNavBar(props: HTMLAttributes<HTMLDivElement>) {
	const { data: user } = useUserGetQuery();

	return (
		<Skeleton 
			asChild
			className='rounded-[1rem] max-lg:pt-[1.5rem] max-lg:px-[1.25rem]' 
			loading={user === undefined}
		>
			{!!user ? (
				<AuthorizedBar {...props} />
			) : (
				<UnauthorizedBar {...props} />
			)}
		</Skeleton>
	);
}
