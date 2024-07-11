import React, { HTMLAttributes } from "react";
import { cn } from "~/shared/lib/cn";
import { dayJs } from "~/shared/lib/dayjs";
import { PreviewImage } from "~/shared/ui/image";

export interface Message {
  title?: string;
  body: string;
  imageUrl?: string | null | undefined;
  isSystem: boolean;
  createdAt: string;
}

interface ChatMessageBubbleProps extends HTMLAttributes<HTMLDivElement> {
  message: Message;
}

export function ChatMessageBubble({
  message,
  className,
  ...props
}: ChatMessageBubbleProps) {
  return (
    <div
      {...props}
      className={cn(
        "flex gap-[1rem] p-[1rem] pe-[3.25rem] rounded-[1.25rem] border border-secondary bg-white/[.02] relative max-w-[31.25rem]",
        className
      )}
    >
      {message.imageUrl !== undefined && (
        <PreviewImage
          src={message.imageUrl}
          className="size-[2rem] rounded-full shadow-md flex-shrink-0"
          alt=""
        />
      )}

      <div
        className={cn(
          "flex flex-col gap-[0.5rem] w-full",
          message.isSystem ? "text-accent-100" : "text-black-74"
        )}
      >
        {!!message.title && (
          <h3 className="text-accent-100">{message.title}</h3>
        )}
        <p>{message.body}</p>
      </div>

      <span className="absolute right-[0.625rem] bottom-[0.625rem] text-black-40 text-[0.875rem]">
        {dayJs(message.createdAt).format("HH:mm")}
      </span>
    </div>
  );
}
