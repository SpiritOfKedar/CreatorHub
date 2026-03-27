import React from 'react';
import Image from 'next/image';
import Link from 'next/link';

const SERVICES = ['Videos', 'Posts', 'Memberships', 'Subscriptions', 'Livestream'];
const PREVIEW_IMAGES = [
  '/assets/dashboard/post1.png',
  '/assets/dashboard/post2.png',
  '/assets/dashboard/post3.png',
  '/assets/dashboard/post4.png',
  '/assets/dashboard/post2.png',
  '/assets/dashboard/post4.png',
];

export default function CreatorCard() {
  return (
    <Link href="/user/creator" className="block w-full transition-transform hover:scale-[1.01]">
      <div className="bg-[#fcfaf7] border-[0.5px] border-[#e4ded2] flex flex-col gap-[12px] p-[16px] rounded-[12px] shadow-[0px_4px_4px_0px_rgba(228,222,210,0.25)] w-full relative z-10">
        {/* Header Info */}
        <div className="flex items-start gap-[12px]">
          <div className="relative rounded-[8px] size-[60px] overflow-hidden bg-white shrink-0 shadow-sm">
            <Image src="/assets/dashboard/avatar1.png" alt="Creator Avatar" fill className="object-cover" />
          </div>
          <div className="flex flex-col gap-[4px] mt-1">
            <p className="font-[family-name:var(--font-figtree)] font-medium leading-[25.8px] text-[#1a1a1a] text-[16px] tracking-[0.32px]">
              Creator Name
            </p>
            <p className="font-[family-name:var(--font-figtree)] font-medium leading-[18.3px] text-[#3a3a3a] text-[13px] tracking-[0.26px]">
              Content category name
            </p>
          </div>
        </div>

        {/* Services Sub-tags */}
        <div className="flex flex-col gap-[8px] mt-2">
          <p className="font-[family-name:var(--font-comfortaa)] font-semibold leading-[18.3px] text-[#3a3a3a] text-[13px] tracking-[0.26px]">
            Services
          </p>
          <div className="flex gap-[8px] flex-wrap">
            {SERVICES.map((srv, idx) => (
              <div key={idx} className="bg-[#faf8f5] border border-[#e4ded2] flex items-center justify-center px-[12px] py-[4px] rounded-[32px] shadow-[0px_1px_4px_0px_rgba(238,238,238,0.25)]">
                 <span className="font-[family-name:var(--font-comfortaa)] font-normal text-[#5a5a5a] text-[11px] tracking-[0.22px]">
                   {srv}
                 </span>
              </div>
            ))}
          </div>
        </div>

        {/* Post Image Previews */}
        <div className="flex gap-[12px] overflow-x-auto pb-2 mt-2 hide-scrollbar w-full relative">
          {PREVIEW_IMAGES.map((src, i) => (
             <div key={i} className="relative h-[140px] w-[200px] shrink-0 rounded-[8px] overflow-hidden bg-white shadow-sm hover:opacity-90 transition-opacity cursor-pointer">
                <Image src={src} alt={`Preview ${i+1}`} fill className="object-cover" sizes="200px" />
             </div>
          ))}
        </div>

      </div>
    </Link>
  );
}
