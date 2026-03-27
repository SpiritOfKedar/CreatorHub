"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import { ChevronDown, Check } from 'lucide-react';

export default function AddCreditsForm() {
  const [paymentMethod, setPaymentMethod] = useState<'card' | 'upi' | null>(null);
  const [isBusiness, setIsBusiness] = useState(false);
  const [saveInfo, setSaveInfo] = useState(false);

  return (
    <div className="flex flex-col gap-[24px] items-start w-full max-w-[640px] bg-[#fcfaf7] p-[24px] rounded-[16px] shadow-sm">
      <h1 className="font-[family-name:var(--font-fjalla)] font-normal text-[28px] leading-[42.1px] tracking-[0.56px] text-[var(--heading,#1a1a1a)]">
        Add Credits
      </h1>

      {/* Amount Input */}
      <div className="w-full">
        <div className="border border-[#e2e2e2] rounded-[8px] h-[50px] px-[16px] flex items-center bg-white transition-colors focus-within:border-[#a0a0a0]">
          <input
            type="number"
            placeholder="Enter amount"
            className="w-full bg-transparent outline-none font-[family-name:var(--font-figtree)] text-[14px] text-[#1a1a1a] placeholder:text-[#9a9a9a]"
          />
        </div>
      </div>

      {/* Card Option */}
      <button 
        onClick={() => setPaymentMethod('card')}
        className={`w-full border rounded-[6px] px-[8px] py-[12px] flex items-center gap-[8px] transition-colors ${paymentMethod === 'card' ? 'border-[#d9d9d9] bg-white' : 'border-[#d9d9d9] bg-transparent'}`}
      >
        <div className={`size-[16px] rounded-full border-[1.5px] flex items-center justify-center shrink-0 ${paymentMethod === 'card' ? 'border-[var(--cta,#f95c4b)]' : 'border-[#292929]'}`}>
          {paymentMethod === 'card' && <div className="size-[10px] bg-[var(--cta,#f95c4b)] rounded-full" />}
        </div>
        <span className="font-[family-name:var(--font-figtree)] font-medium text-[14px] text-[#808080]">Card</span>
      </button>

      {/* Card Detailed Form */}
      {paymentMethod === 'card' && (
        <div className="flex flex-col gap-[16px] w-full animate-in slide-in-from-top-2 fade-in duration-200">
          
          <div className="flex flex-col gap-[8px] w-full">
            <label className="font-[family-name:var(--font-figtree)] font-semibold text-[14px] text-[#1a1a1a]">Contact Information</label>
            <input type="email" placeholder="Email" className="w-full border border-[#d9d9d9] rounded-[6px] px-[8px] py-[12px] text-[14px] font-medium outline-none placeholder:text-[#808080] focus:border-[#a0a0a0] bg-transparent" />
          </div>

          <div className="flex flex-col gap-[9px] w-full">
            <label className="font-[family-name:var(--font-figtree)] font-semibold text-[14px] text-[#1a1a1a]">Card information</label>
            <div className="flex flex-col gap-[8px] w-full">
              <input type="text" placeholder="1234   1234   1234   1234" className="w-full border border-[#d9d9d9] rounded-[6px] px-[8px] py-[12px] text-[14px] font-medium outline-none placeholder:text-[#808080] focus:border-[#a0a0a0] bg-transparent" />
              <div className="flex items-center gap-[8px] w-full">
                <input type="text" placeholder="MM / YY" className="flex-1 border border-[#d9d9d9] rounded-[6px] px-[8px] py-[12px] text-[14px] font-medium outline-none placeholder:text-[#808080] focus:border-[#a0a0a0] bg-transparent" />
                <input type="text" placeholder="CVC" className="flex-1 border border-[#d9d9d9] rounded-[6px] px-[8px] py-[12px] text-[14px] font-medium outline-none placeholder:text-[#808080] focus:border-[#a0a0a0] bg-transparent" />
              </div>
            </div>
          </div>

          <div className="flex flex-col gap-[8px] w-full">
            <label className="font-[family-name:var(--font-figtree)] font-semibold text-[14px] text-[#1a1a1a]">Card holder name</label>
            <input type="text" placeholder="Full name on card" className="w-full border border-[#d9d9d9] rounded-[6px] px-[8px] py-[12px] text-[14px] font-medium outline-none placeholder:text-[#808080] focus:border-[#a0a0a0] bg-transparent" />
          </div>

          <div className="flex flex-col gap-[8px] w-full">
            <label className="font-[family-name:var(--font-figtree)] font-semibold text-[14px] text-[#1a1a1a]">Billing address</label>
            
            <div className="relative w-full">
              <select className="w-full border border-[#d9d9d9] bg-transparent rounded-[6px] px-[8px] py-[12px] text-[14px] text-[#808080] font-medium appearance-none outline-none focus:border-[#a0a0a0]">
                <option>India</option>
                <option>United States</option>
              </select>
              <ChevronDown className="absolute right-[8px] top-1/2 -translate-y-1/2 size-[20px] text-[#808080] pointer-events-none" />
            </div>

            <input type="text" placeholder="Address 1" className="w-full border border-[#d9d9d9] bg-transparent rounded-[6px] px-[8px] py-[12px] text-[14px] font-medium outline-none placeholder:text-[#808080] focus:border-[#a0a0a0]" />
            <input type="text" placeholder="Address 2" className="w-full border border-[#d9d9d9] bg-transparent rounded-[6px] px-[8px] py-[12px] text-[14px] font-medium outline-none placeholder:text-[#808080] focus:border-[#a0a0a0]" />

            <div className="flex items-center gap-[8px] w-full">
              <input type="text" placeholder="City" className="flex-1 border border-[#d9d9d9] bg-transparent rounded-[6px] px-[8px] py-[12px] text-[14px] font-medium outline-none placeholder:text-[#808080] focus:border-[#a0a0a0]" />
              <input type="text" placeholder="Pin code" className="flex-1 border border-[#d9d9d9] bg-transparent rounded-[6px] px-[8px] py-[12px] text-[14px] font-medium outline-none placeholder:text-[#808080] focus:border-[#a0a0a0]" />
            </div>

            <div className="relative w-full">
              <select className="w-full border border-[#d9d9d9] bg-transparent rounded-[6px] px-[8px] py-[12px] text-[14px] text-[#808080] font-medium appearance-none outline-none focus:border-[#a0a0a0]" defaultValue="default">
                <option value="default" disabled hidden>State</option>
                <option value="MH">Maharashtra</option>
                <option value="KA">Karnataka</option>
                <option value="DL">Delhi</option>
              </select>
              <ChevronDown className="absolute right-[8px] top-1/2 -translate-y-1/2 size-[20px] text-[#808080] pointer-events-none" />
            </div>

            <button 
              onClick={() => setIsBusiness(!isBusiness)} 
              className="flex items-center gap-[6px] mt-1 group"
            >
              <div className={`size-[14px] rounded-[3px] border flex items-center justify-center transition-colors ${isBusiness ? 'border-[var(--cta,#f95c4b)] bg-[var(--cta,#f95c4b)]' : 'border-[#c2c2c6] bg-white group-hover:border-[#a0a0a0]'}`}>
                {isBusiness && <Check className="size-[10px] text-white" strokeWidth={3} />}
              </div>
              <span className="font-[family-name:var(--font-figtree)] font-medium text-[14px] text-[#1a1a1a]">
                Im purchasing as a business
              </span>
            </button>
          </div>
        </div>
      )}

      {/* UPI Option */}
      <button 
        onClick={() => setPaymentMethod('upi')}
        className={`w-full border rounded-[6px] px-[8px] py-[12px] flex items-center gap-[8px] transition-colors ${paymentMethod === 'upi' ? 'border-[#d9d9d9] bg-white' : 'border-[#d9d9d9] bg-transparent'}`}
      >
        <div className={`size-[16px] rounded-full border-[1.5px] flex items-center justify-center shrink-0 ${paymentMethod === 'upi' ? 'border-[var(--cta,#f95c4b)]' : 'border-[#292929]'}`}>
          {paymentMethod === 'upi' && <div className="size-[10px] bg-[var(--cta,#f95c4b)] rounded-full" />}
        </div>
        <span className="font-[family-name:var(--font-figtree)] font-medium text-[14px] text-[#808080]">UPI</span>
      </button>

      {/* UPI Detailed Form */}
      {paymentMethod === 'upi' && (
        <div className="flex flex-col gap-[16px] w-full animate-in slide-in-from-top-2 fade-in duration-200">
          
          <div className="flex flex-col gap-[8px] w-full">
            <label className="font-[family-name:var(--font-figtree)] font-semibold text-[14px] text-[#1a1a1a]">Name</label>
            <input type="text" className="w-full border border-[#d9d9d9] bg-transparent rounded-[6px] px-[8px] py-[12px] text-[14px] font-medium outline-none focus:border-[#a0a0a0]" />
          </div>

          <div className="flex flex-col gap-[8px] w-full">
            <label className="font-[family-name:var(--font-figtree)] font-semibold text-[14px] text-[#1a1a1a]">Billing address</label>
            
            <div className="relative w-full">
              <select className="w-full border border-[#d9d9d9] bg-transparent rounded-[6px] px-[8px] py-[12px] text-[14px] text-[#808080] font-medium appearance-none outline-none focus:border-[#a0a0a0]">
                <option>India</option>
                <option>United States</option>
              </select>
              <ChevronDown className="absolute right-[8px] top-1/2 -translate-y-1/2 size-[20px] text-[#808080] pointer-events-none" />
            </div>

            <input type="text" placeholder="Address 1" className="w-full border border-[#d9d9d9] bg-transparent rounded-[6px] px-[8px] py-[12px] text-[14px] font-medium outline-none placeholder:text-[#808080] focus:border-[#a0a0a0]" />
            <input type="text" placeholder="Address 2" className="w-full border border-[#d9d9d9] bg-transparent rounded-[6px] px-[8px] py-[12px] text-[14px] font-medium outline-none placeholder:text-[#808080] focus:border-[#a0a0a0]" />

            <div className="flex items-center gap-[8px] w-full">
              <input type="text" placeholder="City" className="flex-1 border border-[#d9d9d9] bg-transparent rounded-[6px] px-[8px] py-[12px] text-[14px] font-medium outline-none placeholder:text-[#808080] focus:border-[#a0a0a0]" />
              <input type="text" placeholder="Pin code" className="flex-1 border border-[#d9d9d9] bg-transparent rounded-[6px] px-[8px] py-[12px] text-[14px] font-medium outline-none placeholder:text-[#808080] focus:border-[#a0a0a0]" />
            </div>

            <div className="relative w-full">
              <select className="w-full border border-[#d9d9d9] bg-transparent rounded-[6px] px-[8px] py-[12px] text-[14px] text-[#808080] font-medium appearance-none outline-none focus:border-[#a0a0a0]" defaultValue="default">
                <option value="default" disabled hidden>State</option>
                <option value="MH">Maharashtra</option>
                <option value="KA">Karnataka</option>
                <option value="DL">Delhi</option>
              </select>
              <ChevronDown className="absolute right-[8px] top-1/2 -translate-y-1/2 size-[20px] text-[#808080] pointer-events-none" />
            </div>
          </div>

          <div className="flex flex-col gap-[8px] w-full">
            <label className="font-[family-name:var(--font-figtree)] font-semibold text-[14px] text-[#1a1a1a]">Virtual Payment Address (VPA)</label>
            <input type="text" placeholder="your.name@somebank" className="w-full border border-[#d9d9d9] bg-transparent rounded-[6px] px-[8px] py-[12px] text-[14px] font-medium outline-none placeholder:text-[#808080] focus:border-[#a0a0a0]" />
          </div>

          <div className="flex flex-col gap-[8px] w-full mt-1">
            <button 
              onClick={() => setIsBusiness(!isBusiness)} 
              className="flex items-center gap-[6px] group w-fit"
            >
              <div className={`size-[14px] rounded-[3px] border flex items-center justify-center transition-colors ${isBusiness ? 'border-[var(--cta,#f95c4b)] bg-[var(--cta,#f95c4b)]' : 'border-[#c2c2c6] bg-white group-hover:border-[#a0a0a0]'}`}>
                {isBusiness && <Check className="size-[10px] text-white" strokeWidth={3} />}
              </div>
              <span className="font-[family-name:var(--font-figtree)] font-medium text-[14px] text-[#1a1a1a]">
                Im purchasing as a business
              </span>
            </button>
          </div>

        </div>
      )}

      {/* Save Information Banner */}
      <div className="w-full bg-[var(--bg,#f6f4f1)] border border-[var(--alt-sec,#e4ded2)] rounded-[8px] p-[12px] flex flex-col items-start mt-2">
        <button 
          onClick={() => setSaveInfo(!saveInfo)} 
          className="flex items-center gap-[8px] px-[8px] py-[4px] group"
        >
          <div className={`size-[14px] rounded-[3px] border flex items-center justify-center transition-colors ${saveInfo ? 'border-[var(--cta,#f95c4b)] bg-[var(--cta,#f95c4b)]' : 'border-[#c2c2c6] bg-white group-hover:border-[#a0a0a0]'}`}>
            {saveInfo && <Check className="size-[10px] text-white" strokeWidth={3} />}
          </div>
          <span className="font-[family-name:var(--font-figtree)] font-medium text-[13px] text-[var(--body,#5a5a5a)] tracking-[0.26px]">
            Save my information for faster checkout
          </span>
        </button>
        <span className="pl-[30px] font-[family-name:var(--font-figtree)] font-medium text-[13px] text-[var(--place-holder,#9a9a9a)] tracking-[0.26px] mt-1">
          Pay securely at OpenAI OpCo, LLC and everywhere Link is accepted.
        </span>
      </div>

      {/* Pay CTA Button */}
      <Link href="/user/wallet/add-credits/success" className="w-full mt-2">
        <button className="bg-[var(--cta,#f95c4b)] hover:bg-[#e05243] transition-colors w-full h-[40px] rounded-[40px] flex items-center justify-center px-[16px] py-[8px]">
          <span className="font-[family-name:var(--font-figtree)] font-bold text-[16px] text-white tracking-[0.32px]">
            Pay
          </span>
        </button>
      </Link>
    </div>
  );
}
