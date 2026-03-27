import React from 'react';
import Image from 'next/image';

export interface ChatMessage {
  id: string;
  text: string;
  isSender: boolean;
  avatar: string;
}

interface MessageBubbleProps {
  message: ChatMessage;
}

export default function MessageBubble({ message }: MessageBubbleProps) {
  if (message.isSender) {
    return (
      <div className="flex gap-[12px] items-end justify-end w-full mb-[24px]">
        <div className="bg-[rgba(249,92,75,0.08)] border border-[var(--bg-2,#faf8f5)] border-solid rounded-[20px] rounded-tr-[4px] px-[20px] py-[16px] max-w-[70%]">
          <p className="font-[family-name:var(--font-figtree)] text-[16px] text-gray-800 leading-[1.5]">
            {message.text}
          </p>
        </div>
        <div className="flex flex-col items-start overflow-hidden relative rounded-[31px] shrink-0 size-[28px] mb-[4px]">
          <Image src={message.avatar} alt="Avatar" fill className="object-cover" />
        </div>
      </div>
    );
  }

  return (
    <div className="flex gap-[12px] items-start justify-start w-full mb-[24px]">
      <div className="flex flex-col items-start overflow-hidden relative rounded-[31px] shrink-0 size-[28px] mt-[4px]">
        <Image src={message.avatar} alt="Avatar" fill className="object-cover" />
      </div>
      <div className="bg-[var(--bg-2,#faf8f5)] border border-[var(--alt-sec,#e4ded2)] border-solid rounded-[20px] rounded-tl-[4px] px-[20px] py-[16px] max-w-[70%]">
        <p className="font-[family-name:var(--font-figtree)] text-[16px] text-gray-800 leading-[1.5]">
          {message.text}
        </p>
      </div>
    </div>
  );
}
