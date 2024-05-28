"use client";

import { Payment } from "~/entities/product";
import { Hero } from "./Hero";
import { Reviews } from "./Reviews";
import { PreviewImage } from "~/shared/ui/image";
import { Icons } from "~/shared/ui/icons";
import { Button } from "~/shared/ui/kit/button";
import { Product } from "~/shared/api/model";

const product: Product = {
	id: 2,
	name: 'Product Name',
	description: 'Market, Limit, Stop Limit, and Auction Mode orders.',
	shortDescription: 'Market, Limit, Stop Limit, and Auction Mode orders.',
	previewImage: null,
	galleryImages: [],
	category: 'Category',
	price: 2.99
}

export function Component() {

	const onCheckout = (withChat: boolean) => {
		console.log({withChat})
	}

	return (
		<div className="flex items-start gap-16 mx-auto max-w-content">
			<div className="hidden lg:flex w-[65.52%] max-w-[760px] flex-col gap-16">
				<Hero />
				<Reviews />
			</div>
			<div className="flex flex-col gap-4 w-full lg:w-[31.2%] lg:max-w-[360px] px-4 lg:px-0">
				<div className="block lg:hidden">
					<Hero />
				</div>
				<Payment product={product} onCheckout={onCheckout}/>
				<div className="border border-white-04 rounded-[20px] p-4 flex flex-col gap-6">
					<div className="flex flex-col gap-4">
						<div className="flex gap-4 items-center">
							<PreviewImage src={null} alt="Twitter User Avatar" className="size-14 rounded-full"/>
							<div className="flex flex-col gap-1">
								<div className="flex items-center gap-1 text-[16px]/[20/8px] font-semibold">
									<div className="text-white-100">
										Twitter Accounts
									</div>
									<Icons.Verified className='text-accent-100'/>
								</div>
								<div className="text-black-40">@twitteraccs</div>
							</div>
						</div>
						<div className="text-[16px]/[20.8px] font-normal text-black-60">
							Selling old, premium, crypto twitter accounts with blue ticks and real followers
						</div>
					</div>
					<div className="flex items-center justify-between bg-black-08 text-black-60 rounded-2xl p-2 pr-3">
						<div className="flex items-center gap-2">
							<PreviewImage src={null} alt="Twitter User Avatar" className="size-8 rounded-full"/>
							<div>by @redfox</div>
						</div>
						<div className="flex items-center gap-3">
							<div className="flex items-center gap-1 text-green-100">
								<Icons.Likes className="size-[16px]" />
								<span>421</span>
							</div>
							<div className="flex items-center gap-1 text-red-100">
								<Icons.Dislikes className="size-[16px]" />
								<span>16</span>
							</div>
						</div>
					</div>
				</div>
				<div className="flex items-center gap-4">
					<Button colorPalette="gray">
						Category
					</Button>
					<Button colorPalette="gray">
						Category
					</Button>
				</div>
				<div className="block lg:hidden">
					<Reviews />
				</div>
			</div>
		</div>
	);
}
