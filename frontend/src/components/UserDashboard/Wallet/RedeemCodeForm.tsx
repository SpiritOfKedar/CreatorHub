"use client";

import React from 'react';
import Link from 'next/link';

export default function RedeemCodeForm() {
  return (
    <div className="flex flex-col gap-[24px] items-start w-full max-w-[640px] bg-[#fcfaf7] p-[24px] rounded-[16px] shadow-sm">
      <div className="flex flex-col gap-[4px] items-start w-full">
        <h1 className="font-[family-name:var(--font-fjalla)] font-normal text-[28px] leading-[42.1px] tracking-[0.56px] text-[var(--heading,#1a1a1a)]">
          Redeem code
        </h1>
        <p className="font-[family-name:var(--font-figtree)] font-medium text-[16px] leading-[25.8px] tracking-[0.32px] text-[var(--sub-head,#3a3a3a)]">
          Enter your promo or gift code to add credits to your wallet.
        </p>
      </div>

      <div className="w-full">
        <div className="border border-[#e2e2e2] rounded-[8px] h-[50px] px-[16px] flex items-center bg-transparent transition-colors focus-within:border-[#a0a0a0]">
          <input
            type="text"
            placeholder="Enter promo or gift code"
            className="w-full bg-transparent outline-none font-[family-name:var(--font-figtree)] font-normal text-[14px] leading-[24px] text-[#1a1a1a] placeholder:text-[#9a9a9a]"
          />
        </div>
      </div>

      <Link href="/user/wallet/redeem/success" className="w-full">
        <button className="bg-[var(--cta,#f95c4b)] hover:bg-[#e05243] transition-colors w-full h-[40px] rounded-[40px] flex items-center justify-center px-[16px] py-[8px]">
          <span className="font-[family-name:var(--font-figtree)] font-bold text-[16px] leading-[25.8px] text-white tracking-[0.32px]">
            Apply Code
          </span>
        </button>
      </Link>
    </div>
  );
}
