'use client';

import Image from 'next/image';
import { useRouter } from 'next/navigation';

export default function CheckoutBackButton() {
  const router = useRouter();

  return (
    <button
      onClick={() => router.back()}
      className="bg-[#faf8f5] border border-[#d8d1c7] flex gap-[4px] items-center justify-center px-[8px] py-[4px] rounded-[36px] w-[fit-content] transition-colors hover:bg-[#eae8e5]"
    >
      <div className="relative size-[20px] shrink-0">
        <Image src="/assets/creator/caret-left.svg" alt="Back" fill className="object-cover" />
      </div>
      <p className="font-['Figtree',sans-serif] font-medium leading-[25.8px] text-[#1a1a1a] text-[16px] tracking-[0.32px] whitespace-nowrap">
        Back
      </p>
    </button>
  );
}
