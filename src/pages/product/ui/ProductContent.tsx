"use client";

import Link from "next/link";
import { Heading } from "~/shared/ui/kit/heading";
import { GalleryCarousel } from "./GalleryCarousel";
import { useProductStrictContext } from "~/entities/product";
import { getStorePathname } from "~/entities/store";
import { HTMLAttributes } from "react";
import { cn } from "~/shared/lib/cn";
import { Button } from "~/shared/ui/kit/button";

export function ProductContent({
  className,
  ...props
}: HTMLAttributes<HTMLDivElement>) {
  const product = useProductStrictContext();
  const images =
    product.galleryImages && product.previewImage
      ? [product.previewImage, ...product.galleryImages]
      : product.galleryImages;

  return (
    <div {...props} className={cn("flex flex-col gap-6", className)}>
      <div className="text-[1rem]/[1.3rem] text-black-60">
        <span>by </span>
        {product.storeUrl && (
          <Link
            className="text-accent-100"
            href={getStorePathname(product.storeUrl)}
          >
            {product.storeUrl}
          </Link>
        )}
      </div>

      <Heading size="lg">{product.name}</Heading>

      {typeof product.totalSales === "number" && product.totalSales > 0 && (
        <div className="flex items-center gap-[1rem] text-[0.9375rem] text-black-60 -mt-2">
          <span className="text-white font-semibold">
            {product.totalSales.toLocaleString("en-US")}
            <span className="text-black-60 font-normal"> sold</span>
          </span>
          <span className="flex items-center gap-[0.375rem] rounded-full border border-accent-100/25 bg-accent-100/[0.07] px-[0.75rem] py-[0.25rem] text-[0.8125rem] text-accent-100">
            <svg viewBox="0 0 16 16" className="size-[0.8125rem] fill-current">
              <path d="M8 1a3.5 3.5 0 013.5 3.5V6H12a2 2 0 012 2v5a2 2 0 01-2 2H4a2 2 0 01-2-2V8a2 2 0 012-2h.5V4.5A3.5 3.5 0 018 1zm0 1.5A2 2 0 006 4.5V6h4V4.5a2 2 0 00-2-2z" />
            </svg>
            Escrow protected
          </span>
        </div>
      )}

      <div className="flex flex-col gap-4 lg:gap-6 pb-8 border-b border-white/[.08]">
        {images && <GalleryCarousel images={images} />}
        <div className=" text-black-74 flex flex-col gap-[1.25rem]">
          <p className="whitespace-pre-line">
            {Boolean(product.description)
              ? product.description
              : "No description"}
          </p>

          <div className="flex flex-row gap-[1rem] flex-wrap">
            {product.tagNames?.map((t) => (
              <Button asChild key={t} colorPalette="gray">
                <Link href={`/marketplace/?tagNames=${encodeURIComponent(t)}`}>
                  {t}
                </Link>
              </Button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
