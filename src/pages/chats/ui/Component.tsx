"use client";

import React, { useEffect, useState } from "react";
import { ChatFrame } from "./chat/Frame";
// import { StoreId } from "~/shared/api/client";
import { fetchProduct } from "../../product/api";
import { ProductImage } from "~/entities/product";
import { Product } from "~/shared/api/client";
import { PreviewImage } from "~/shared/ui/image";

// interface PageChatProps {
//   productId: StoreId;
// }

export function Component() {
  const [product, setProduct] = useState(null);

  useEffect(() => {
    (async () => {
      const newProduct = await fetchProduct(
        String("2832b49b-af05-44a0-a21f-4361cd4ad5ee")
      );

      setProduct(newProduct);
    })();
  }, []);

  return (
    <div className="flex gap-[20px] justify-center">
      <div className="flex flex-col gap-[8px] w-[360px] h-[715px] px-[12px] py-[16px]  border border-white/[.04] rounded-[20px]">
        <div className="flex gap-[6px] items-center">
          <p className="font-semibold text-[1.125rem] font-manrope leading-[1.3] truncate">
            Chats
          </p>

          <p className="font-semibold text-[1.125rem] font-manrope leading-[1.3] truncate text-black-40">
            17
          </p>
        </div>

        {!!product && (
          <ProductChatCard
            product={product}
            lastMessage="Let me know if you have any questions about the product, I'm happy
            to help!"
            userName="Eunice Hogan"
            unreadMessages={3}
          />
        )}

        {!!product && (
          <ProductChatCard
            product={product}
            lastMessage="Let me know if you have any questions about the product, I'm happy
            to help!"
            userName="Eunice Hogan"
            unreadMessages={3}
            isActive
          />
        )}

        {!!product && (
          <ProductChatCard
            product={product}
            lastMessage="Let me know if you have any questions about the product, I'm happy
            to help!"
            userName="Eunice Hogan"
            unreadMessages={3}
          />
        )}
      </div>

      <div className="w-full max-w-[780px] h-[715px]">
        {!!product && <ChatFrame product={product} className="w-full" />}
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
  time?: number;
}

export function ProductChatCard({
  product,
  lastMessage,
  isActive,
  avatarUrl,
  userName,
  unreadMessages,
  time,
}: ProductChatCard) {
  return (
    <div
      className={`flex gap-[12px] p-[12px] rounded-[12px] ${
        isActive ? "bg-white/[.08]" : ""
      } transition hover:bg-white/[.08] cursor-pointer`}
    >
      <ProductImage product={product} className="size-[62px]" />

      <div className="flex flex-col gap-[2px]">
        <div className="flex justify-between gap-[12px]">
          <div className="flex items-center gap-[6px]">
            <PreviewImage
              src={avatarUrl ?? null}
              className="w-[20px] h-[20px] rounded-full"
            />

            <p className="font-semibold text-[15px] font-manrope leading-[19.5px]">
              {userName}
            </p>
          </div>

          <p className="font-normal text-[14px] font-manrope leading-[18.2px] text-black-60">
            03:17
          </p>
        </div>

        <div className="flex gap-[12px]">
          <p
            className="font-normal text-[15px] font-manrope leading-[19.5px] text-black-60"
            style={{
              display: "-webkit-box",
              WebkitBoxOrient: "vertical",
              textOverflow: "ellipsis",
              overflow: "hidden",
              WebkitLineClamp: 2,
            }}
          >
            {lastMessage}
          </p>

          <div
            className="flex items-center justify-center w-[24px] h-[24px] min-w-[24px] min-h-[24px] rounded-full"
            style={{
              backgroundColor: "rgba(244, 67, 54, 1)",
            }}
          >
            <p className="font-normal text-[16px] font-manrope leading-[19.2px] text-white">
              {unreadMessages}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
