"use client";

import Link from "next/link";
import { useParams } from "next/navigation";
import { PropsWithChildren, useMemo, useState } from "react";
import { ProductImage, productQueries } from "~/entities/product";
import { Product, productMock } from "~/shared/api/client";
import { cn } from "~/shared/lib/cn";
import { Icons } from "~/shared/ui/icons";
import { PreviewImage } from "~/shared/ui/image";
import { Button, ButtonProps } from "~/shared/ui/kit/button";
import { Skeleton } from "~/shared/ui/kit/skeleton";
import { NotFoundScreen } from "~/shared/ui/not-found-screen";
import { ChatPanelTabProvider, PossibleTabs } from "../model/tabs";
import { UnreadedBadge } from "./UnreadedBadge";

export function PageRoot({ children }: PropsWithChildren) {
	const params = useParams();
	const { data: product } = productQueries.useGetOne({
		productId: "2832b49b-af05-44a0-a21f-4361cd4ad5ee"
	});

	const [tab, setTab] = useState<PossibleTabs>(!!params?.productId ? 'chat' : 'chats-list');
	const contextValue = useMemo(() => ({ tab, setTab }), [tab, setTab]);

	if (false) {
		return (
			<NotFoundScreen className='w-full h-[44.6875rem] max-w-content mx-auto px-[1rem] '>
				<Icons.Chat />
				{"You don't have any chats yet"}

				<Button
					asChild className='mt-[2rem]'
				>
					<Link href='/marketplace'>
						Expore Marketplace
					</Link>
				</Button>
			</NotFoundScreen>
		);
	}

	return (
		<ChatPanelTabProvider value={contextValue}>
			<div className="flex gap-[1.25rem] justify-center w-full max-w-content mx-auto px-[1rem] h-[44.6875rem]">
				<div
					className={cn(
						"flex flex-col gap-[0.5rem] w-full max-w-[22.5rem] px-[0.75rem] py-[1rem]",
						"border border-white/[.04] rounded-[1.25rem]",
						tab == 'chat' && 'max-lg:hidden'
					)}
				>
					<div className="flex gap-[0.375rem] items-center px-[0.5rem]">
						<p className="font-semibold text-[1.125rem] font-manrope leading-[1.3] truncate">
							Chats
						</p>

						<p className="font-semibold text-[1.125rem] font-manrope leading-[1.3] truncate text-black-40">
							17
						</p>
					</div>

					<Skeleton loading={!product}>
						<ProductChatCard
							product={product ?? productMock}
							lastMessage="Let me know if you have any questions about the product, I'm happy to help!"
							userName="Eunice Hogan"
							unreadMessages={3}
							active={product && params?.productId == product.id}
							onClick={() => setTab('chat')}
						/>
					</Skeleton>
				</div>

				<div className={cn("w-full", tab == 'chats-list' && 'max-lg:hidden')}>
					{children}
				</div>
			</div>
		</ChatPanelTabProvider>
	);
}

interface ProductChatCard extends ButtonProps {
	product: Product;
	lastMessage: string;
	avatarUrl?: string;
	userName: string;
	unreadMessages: number;
}

export function ProductChatCard({
	product,
	lastMessage,
	avatarUrl,
	userName,
	unreadMessages,
	className,
	...props
}: ProductChatCard) {
	return (
		<Button
			variant='ghost'
			{...props} asChild
			className={cn('flex gap-[0.75rem] h-auto items-stretch', className)}
		>
			<Link href={`/chats/${product.id}`}>
				<ProductImage
					product={product}
					className="size-[3.875rem] my-[0.75rem]"
				/>

				<div className="flex flex-col gap-[0.125rem] min-w-0 max-w-full pt-[0.75rem] h-auto border-b border-secondary">
					<div className="flex justify-between gap-[0.75rem]">
						<div className="flex items-center gap-[0.375rem]">
							<PreviewImage
								src={avatarUrl ?? null}
								className="size-[1.25rem] rounded-full"
								alt='Avatar Image'
							/>

							<p className="font-semibold text-[0.9375rem] font-manrope leading-[1.2188rem]">
								{userName}
							</p>
						</div>

						<p className="font-normal text-[0.875rem] font-manrope leading-[1.1375rem] text-black-60">
							03:17
						</p>
					</div>

					<div className="flex gap-[0.75rem] text-black-60">
						<p
							className="font-normal text-[0.9375rem] font-manrope leading-[1.2188rem] 
							line-clamp-2 whitespace-normal text-start"
						>
							{lastMessage}
						</p>

						<UnreadedBadge count={unreadMessages} />
					</div>
				</div>
			</Link>
		</Button>
	);
}