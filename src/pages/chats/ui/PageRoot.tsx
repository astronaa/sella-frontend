"use client";

import Link from "next/link";
import { useParams } from "next/navigation";
import { PropsWithChildren } from "react";
import { ProductImage, productQueries } from "~/entities/product";
import { Product, productMock } from "~/shared/api/client";
import { PreviewImage } from "~/shared/ui/image";
import { Button } from "~/shared/ui/kit/button";
import { Skeleton } from "~/shared/ui/kit/skeleton";

export function PageRoot({ children }: PropsWithChildren) {
	const { data: product } = productQueries.useGetOne({
		productId: "2832b49b-af05-44a0-a21f-4361cd4ad5ee"
	});

	const params = useParams();

	return (
		<div className="flex gap-[1.25rem] justify-center">
			<div className="flex flex-col gap-[0.5rem] w-[22.5rem] h-[44.6875rem] px-[0.75rem] py-[1rem] 
				border border-white/[.04] rounded-[1.25rem]"
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
						isActive={product && params?.productId == product.id}
					/>
				</Skeleton>
			</div>

			<div className="w-full max-w-[48.75rem]">
				{children}
			</div>
		</div>
	);
}

interface ProductChatCard {
	product: Product;
	lastMessage: string;
	isActive?: boolean;
	avatarUrl?: string;
	userName: string;
	unreadMessages: number;
}

export function ProductChatCard({
	product,
	lastMessage,
	isActive,
	avatarUrl,
	userName,
	unreadMessages
}: ProductChatCard) {
	return (
		<Button
			active={isActive} variant='ghost'
			className='flex gap-[0.75rem] h-auto items-stretch'
			asChild
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

						<div
							className="flex items-center justify-center w-[1.5rem] h-[1.5rem] min-w-[1.5rem] min-h-[1.5rem] rounded-full"
							style={{
								backgroundColor: "rgba(244, 67, 54, 1)",
							}}
						>
							<p className="font-normal text-[1rem] font-manrope leading-[1.2rem] text-white">
								{unreadMessages}
							</p>
						</div>
					</div>
				</div>
			</Link>
		</Button>
	);
}
