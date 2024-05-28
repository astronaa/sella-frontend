"use client";

import { ProductCarousel } from "~/entities/product";
import Img from "../assets/image.avif";

const images = [Img, Img, Img, Img, Img];

const description =
  "This could be the beginning of something special. Just a few more formalities, and we'll have your shop set up in no time. This could be the beginning of something special. Just a few more formalities, and we'll have your shop set up in no time.This could be the beginning of something special. Just a few more formalities, and we'll have your shop set up in no time.This could be the beginning of something special. Just a few more formalities, and we'll have your shop set up in no time.This could be the beginning of something special. Just a few more formalities, and we'll have your shop set up in no time.This could be the beginning of something special. Just a few more formalities, and we'll have your shop set up in no time.This could be the beginning of something special. Just a few more formalities, and we'll have your shop set up in no time.";

export function Hero() {
	return (
		<div className="flex flex-col gap-6">
			<div className="text-[16px]/[20.8px] text-black-60">
				<span>by </span>
				<span className="text-yellow-100">Storename </span>
				<span>in </span>
				<span className="text-white-100">Category</span>
			</div>
			<div className="text-[42px]/[46.2px] lg:text-[54px]/[59.4px] text-white-100 font-semibold">
        Product Name
			</div>
			<ProductCarousel.Root images={images} description={description}>
				<ProductCarousel.Carousel />
				<ProductCarousel.Description />
			</ProductCarousel.Root>
		</div>
	);
}
