import React from 'react';
import Link from 'next/link';
import { PartyPopper } from 'lucide-react';

export default function RedeemSuccessPage() {
  return (
    <div className="bg-[var(--bg,#f6f4f1)] min-h-screen w-full flex items-center justify-center p-[42px] sm:p-[20px]">
      <div className="flex flex-col gap-[42px] items-center w-full max-w-[1065px]">
        {/* Header Section */}
        <div className="flex flex-col gap-[16px] items-center w-full">
          <div className="flex gap-[16px] items-center justify-center w-full">
            <PartyPopper className="size-[48px] text-[var(--heading,#1a1a1a)]" />
            <h1 className="font-[family-name:var(--font-fjalla)] font-normal text-[48px] leading-[67.9px] tracking-[0.96px] text-[var(--heading,#1a1a1a)] text-center whitespace-nowrap">
              Code Applied Successfully
            </h1>
          </div>
          
          <p className="font-[family-name:var(--font-figtree)] font-medium text-[16px] leading-[25.8px] tracking-[0.32px] text-[var(--sub-head,#3a3a3a)] text-center w-full max-w-[932px]">
            Your code has been applied successfully. The offer has been added to your account and will be reflected in your total at checkout. You can now continue with your purchase and enjoy the benefits.
          </p>
          
          <p className="font-[family-name:var(--font-figtree)] font-medium text-[16px] leading-[25.8px] tracking-[0.32px] text-[var(--sub-head,#3a3a3a)] text-center whitespace-nowrap">
            If you notice any billing issues or access problems, our support team is ready to help you quickly. Contact Support: <span className="text-[#f95c4b]">support@yourdomain.com</span>
          </p>
        </div>

        {/* Action Button */}
        <Link href="/user/wallet" className="w-full">
          <div className="bg-[var(--cta,#f95c4b)] hover:bg-[#e05243] transition-colors flex h-[40px] items-center justify-center px-[16px] py-[8px] rounded-[40px] w-full max-w-[1065px]">
            <span className="font-[family-name:var(--font-figtree)] font-bold text-[16px] leading-[25.8px] tracking-[0.32px] text-white">
              Go to wallet page
            </span>
          </div>
        </Link>
      </div>
    </div>
  );
}
