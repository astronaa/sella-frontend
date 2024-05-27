'use client';

import { HTMLAttributes } from "react";
import { NotAuthorizedBar } from "./NotAuthorizedBar";
import { AuthorizedBar } from "./AuthorizedBar";
import { useUserGetQuery } from "~/entities/user";
import { Skeleton } from "~/shared/ui/kit/skeleton";

export function UserNavBar(props: HTMLAttributes<HTMLDivElement>) {
	const { data: user } = useUserGetQuery();

	return (
		<Skeleton className='rounded-[1rem]' loading={user === undefined}>
			{!!user ? (
				<AuthorizedBar {...props} />
			) : (
				<NotAuthorizedBar {...props} />
			)}
		</Skeleton>
	);

}