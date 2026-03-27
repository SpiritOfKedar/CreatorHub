import React from 'react';
import Image from 'next/image';
import { MoreHorizontal } from 'lucide-react';

interface NotificationItemProps {
  message: string;
  time: string;
}

export default function NotificationItem({ message, time }: NotificationItemProps) {
  return (
    <div className="bg-[#fcfaf7] border-[0.5px] border-[#e4ded2] flex items-center p-[12px] rounded-[8px] w-full">
      <div className="flex flex-1 items-center justify-between gap-[8px]">
        <div className="flex items-center gap-[8px] h-full">
          <div className="relative rounded-[32px] size-[40px] overflow-hidden shrink-0">
            <Image src="/assets/notifications/avatar.png" alt="User Avatar" fill className="object-cover" />
          </div>
          <div className="flex flex-col gap-[4px]">
            <p className="font-[family-name:var(--font-figtree)] font-medium text-[16px] leading-[25.8px] tracking-[0.32px] text-[#1a1a1a]">
              {message}
            </p>
            <p className="font-[family-name:var(--font-figtree)] font-medium text-[13px] leading-[18.3px] tracking-[0.26px] text-[#5a5a5a]">
              {time}
            </p>
          </div>
        </div>
        <button className="relative size-[24px] flex items-center justify-center shrink-0 hover:bg-[#ebebeb] rounded-full transition-colors">
          <MoreHorizontal className="size-[20px] text-[#5a5a5a]" />
        </button>
      </div>
    </div>
  );
}
