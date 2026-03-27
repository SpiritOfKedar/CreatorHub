import React from 'react';
import Image from 'next/image';
import { Lock } from 'lucide-react';

export default function LibraryCard() {
  return (
    <div className="bg-[#fcfaf7] border-[0.5px] border-[#e4ded2] flex flex-col gap-[12px] p-[12px] rounded-[12px] shadow-[0px_4px_4px_0px_rgba(228,222,210,0.25)] w-full">
      
      {/* Header */}
      <div className="flex items-start gap-[12px] w-full">
        <div className="flex flex-1 items-start gap-[8px]">
          <div className="relative rounded-[32px] size-[40px] overflow-hidden shrink-0">
            <Image src="/assets/library/avatar.png" alt="Creator Avatar" fill className="object-cover" />
          </div>
          <div className="flex flex-col gap-[4px]">
            <p className="font-[family-name:var(--font-figtree)] font-medium text-[13px] leading-[18.3px] tracking-[0.26px] text-[#1a1a1a]">
              Creator Name
            </p>
            <p className="font-[family-name:var(--font-figtree)] font-medium text-[13px] leading-[18.3px] tracking-[0.26px] text-[#5a5a5a]">
              23 Jan, 2025
            </p>
          </div>
        </div>
        <div className="relative size-[40px] shrink-0 flex justify-center items-center">
          <div className="relative size-[24px]">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M12 21.35L10.55 20.03C5.4 15.36 2 12.28 2 8.5C2 5.42 4.42 3 7.5 3C9.24 3 10.91 3.81 12 5.09C13.09 3.81 14.76 3 16.5 3C19.58 3 22 5.42 22 8.5C22 12.28 18.6 15.36 13.45 20.04L12 21.35Z" fill="#F95C4B"/>
            </svg>
          </div>
        </div>
      </div>

      {/* Image with Lock Overlay */}
      <div className="flex flex-col h-[200px] justify-end p-[12px] relative rounded-[12px] overflow-hidden w-full">
        <Image src="/assets/library/post.png" alt="Post" fill className="object-cover" />
        <div className="bg-[rgba(26,26,26,0.5)] flex items-center justify-center px-[8px] py-[4px] gap-[4px] relative rounded-[32px] shrink-0 self-start z-10">
          <Lock className="size-[12px] text-white" strokeWidth={3} />
          <p className="font-[family-name:var(--font-comfortaa),sans-serif] font-semibold text-[11px] leading-[18.3px] tracking-[0.22px] text-white">
            Locked
          </p>
        </div>
      </div>

      {/* Details Footer */}
      <div className="flex flex-col gap-[8px] w-full">
        <div className="flex flex-col gap-[4px] w-full">
          <p className="font-[family-name:var(--font-figtree)] font-medium text-[13px] leading-[18.3px] tracking-[0.26px] text-[#1e1e1e]">
            Design That Feels Effortless
          </p>
          <p className="font-[family-name:var(--font-figtree)] font-medium text-[13px] leading-[18.3px] tracking-[0.26px] text-[#5a5a5a]">
            Small description about the post or content
          </p>
        </div>
        <div className="flex items-center gap-[12px]">
          <div className="flex items-center gap-[4px] justify-center">
            <Image src="/assets/dashboard/icon-heart.svg" alt="Like" width={20} height={20} className="opacity-50" />
            <p className="font-[family-name:var(--font-figtree)] font-medium text-[13px] leading-[18.3px] tracking-[0.26px] text-[#9a9a9a]">
              1.2k
            </p>
          </div>
          <div className="flex items-center gap-[4px] justify-center">
            <Image src="/assets/dashboard/icon-chat.svg" alt="Comment" width={20} height={20} className="opacity-50" />
            <p className="font-[family-name:var(--font-figtree)] font-medium text-[13px] leading-[18.3px] tracking-[0.26px] text-[#9a9a9a]">
              40
            </p>
          </div>
        </div>
      </div>

    </div>
  );
}
