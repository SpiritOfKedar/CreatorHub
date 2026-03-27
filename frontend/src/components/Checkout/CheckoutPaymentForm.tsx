'use client';

import React, { useState } from 'react';
import Link from 'next/link';

export default function CheckoutPaymentForm() {
  const [method, setMethod] = useState<'card' | 'upi'>('card');
  const [saveInfo, setSaveInfo] = useState(false);
  const [businessCheck, setBusinessCheck] = useState(false);
  const [manualAddress, setManualAddress] = useState(false);

  return (
    <div className="bg-[#fcfaf7] flex flex-col gap-[24px] items-start p-[40px] rounded-[16px] w-[672px] shrink-0 font-['Figtree',sans-serif]">
      
      {/* Payment Method Accordion Container */}
      <div className="flex flex-col w-full bg-white border border-[#d9d9d9] rounded-[8px] overflow-hidden">
        
        {/* =========================================
            CARD SECTION
           ========================================= */}
        {/* Card Header (Clickable) */}
        <div 
          onClick={() => setMethod('card')}
          className="flex gap-[12px] items-center px-[16px] py-[16px] w-full cursor-pointer bg-white"
        >
          <div className={`border-[1.5px] rounded-full size-[16px] flex items-center justify-center ${method === 'card' ? 'border-[#f95c4b]' : 'border-[#292929]'}`}>
            {method === 'card' && <div className="bg-[#f95c4b] rounded-full size-[10px]" />}
          </div>
          <p className="font-medium text-[#808080] text-[15px]">
            Card
          </p>
        </div>

        {/* Card Expanded Details */}
        {method === 'card' && (
          <div className="flex flex-col gap-[20px] px-[16px] pb-[20px] w-full bg-white">
            
            {/* Contact Information */}
            <div className="flex flex-col gap-[8px] w-full">
              <label className="font-semibold text-[#1a1a1a] text-[14px]">
                Contact Information
              </label>
              <input 
                type="email" 
                placeholder="Email" 
                className="border border-[#d9d9d9] rounded-[6px] h-[48px] w-full px-[14px] font-medium text-[#1a1a1a] text-[14px] outline-none placeholder:text-[#c2c2c6] focus:border-[#a0a0a0] transition-colors" 
              />
            </div>

            {/* Card information */}
            <div className="flex flex-col gap-[8px] w-full">
              <label className="font-semibold text-[#1a1a1a] text-[14px]">
                Card information
              </label>
              <input 
                type="text" 
                placeholder="1234 1234 1234 1234" 
                className="border border-[#d9d9d9] rounded-[6px] rounded-b-none h-[48px] w-full px-[14px] font-medium text-[#1a1a1a] text-[14px] outline-none placeholder:text-[#c2c2c6] focus:border-[#a0a0a0] transition-colors" 
              />
              <div className="flex w-full mt-[-1px]">
                <input 
                  type="text" 
                  placeholder="MM / YY" 
                  className="border border-[#d9d9d9] rounded-bl-[6px] h-[48px] w-1/2 px-[14px] font-medium text-[#1a1a1a] text-[14px] outline-none placeholder:text-[#c2c2c6] focus:border-[#a0a0a0] transition-colors relative z-10" 
                />
                <input 
                  type="text" 
                  placeholder="CVC" 
                  className="border border-[#d9d9d9] border-l-0 rounded-br-[6px] h-[48px] w-1/2 px-[14px] font-medium text-[#1a1a1a] text-[14px] outline-none placeholder:text-[#c2c2c6] focus:border-[#a0a0a0] transition-colors relative z-10" 
                />
              </div>
            </div>

            {/* Card holder name */}
            <div className="flex flex-col gap-[8px] w-full">
              <label className="font-semibold text-[#1a1a1a] text-[14px]">
                Card holder name
              </label>
              <input 
                type="text" 
                placeholder="Full name on card" 
                className="border border-[#d9d9d9] rounded-[6px] h-[48px] w-full px-[14px] font-medium text-[#1a1a1a] text-[14px] outline-none placeholder:text-[#c2c2c6] focus:border-[#a0a0a0] transition-colors" 
              />
            </div>

            {/* Billing address */}
            <div className="flex flex-col gap-[8px] w-full">
              <label className="font-semibold text-[#1a1a1a] text-[14px]">
                Billing address
              </label>
              
              {!manualAddress ? (
                <>
                  <div className="relative">
                    <select className="appearance-none bg-white border border-[#d9d9d9] rounded-[6px] rounded-b-none h-[48px] w-full px-[14px] font-medium text-[#808080] text-[14px] outline-none focus:border-[#a0a0a0] transition-colors cursor-pointer relative z-10">
                      <option>India</option>
                      <option>United States</option>
                      <option>United Kingdom</option>
                    </select>
                    <div className="absolute right-[14px] top-1/2 -translate-y-1/2 pointer-events-none z-20">
                      <svg width="12" height="8" viewBox="0 0 12 8" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M1 1.5L6 6.5L11 1.5" stroke="#666666" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    </div>
                  </div>
                  
                  <input 
                    type="text" 
                    placeholder="Address" 
                    className="border border-[#d9d9d9] mt-[-1px] rounded-b-[6px] h-[48px] w-full px-[14px] font-medium text-[#1a1a1a] text-[14px] outline-none placeholder:text-[#c2c2c6] focus:border-[#a0a0a0] transition-colors relative z-10" 
                  />
                  <p 
                    onClick={() => setManualAddress(true)}
                    className="font-medium text-[#606060] text-[13px] underline cursor-pointer hover:text-[#404040] w-fit mt-[4px]"
                  >
                    Enter address manually
                  </p>
                </>
              ) : (
                <div className="flex flex-col gap-[8px]">
                  <div className="relative">
                    <select className="appearance-none bg-white border border-[#d9d9d9] rounded-[6px] h-[48px] w-full px-[14px] font-medium text-[#808080] text-[14px] outline-none focus:border-[#a0a0a0] transition-colors cursor-pointer">
                      <option>India</option>
                      <option>United States</option>
                      <option>United Kingdom</option>
                    </select>
                    <div className="absolute right-[14px] top-1/2 -translate-y-1/2 pointer-events-none">
                      <svg width="12" height="8" viewBox="0 0 12 8" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M1 1.5L6 6.5L11 1.5" stroke="#666666" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    </div>
                  </div>
                  <input 
                    type="text" 
                    placeholder="Address 1" 
                    className="border border-[#d9d9d9] rounded-[6px] h-[48px] w-full px-[14px] font-medium text-[#1a1a1a] text-[14px] outline-none placeholder:text-[#808080] focus:border-[#a0a0a0] transition-colors" 
                  />
                  <input 
                    type="text" 
                    placeholder="Address 2" 
                    className="border border-[#d9d9d9] rounded-[6px] h-[48px] w-full px-[14px] font-medium text-[#1a1a1a] text-[14px] outline-none placeholder:text-[#808080] focus:border-[#a0a0a0] transition-colors" 
                  />
                  <div className="flex gap-[8px] w-full">
                    <input 
                      type="text" 
                      placeholder="City" 
                      className="border border-[#d9d9d9] rounded-[6px] h-[48px] w-1/2 px-[14px] font-medium text-[#1a1a1a] text-[14px] outline-none placeholder:text-[#808080] focus:border-[#a0a0a0] transition-colors" 
                    />
                    <input 
                      type="text" 
                      placeholder="Pin code" 
                      className="border border-[#d9d9d9] rounded-[6px] h-[48px] w-1/2 px-[14px] font-medium text-[#1a1a1a] text-[14px] outline-none placeholder:text-[#808080] focus:border-[#a0a0a0] transition-colors" 
                    />
                  </div>
                  <div className="relative">
                    <select className="appearance-none bg-white border border-[#d9d9d9] rounded-[6px] h-[48px] w-full px-[14px] font-medium text-[#808080] text-[14px] outline-none focus:border-[#a0a0a0] transition-colors cursor-pointer">
                      <option>State</option>
                      <option>Maharashtra</option>
                      <option>Delhi</option>
                      <option>Karnataka</option>
                    </select>
                    <div className="absolute right-[14px] top-1/2 -translate-y-1/2 pointer-events-none">
                      <svg width="12" height="8" viewBox="0 0 12 8" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M1 1.5L6 6.5L11 1.5" stroke="#666666" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Business Checkbox */}
            <div 
              onClick={() => setBusinessCheck(!businessCheck)}
              className="flex gap-[10px] items-center cursor-pointer group mt-[4px] w-fit"
            >
              <div className={`border rounded-[4px] size-[16px] flex items-center justify-center transition-colors ${businessCheck ? 'bg-black border-black' : 'bg-white border-[#d9d9d9] group-hover:border-[#9a9a9a]'}`}>
                {businessCheck && (
                  <svg width="10" height="8" viewBox="0 0 10 8" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M1 4L3.66667 6.5L9 1" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                )}
              </div>
              <p className="font-medium text-[#1a1a1a] text-[14px]">
                Im purchasing as a business
              </p>
            </div>

          </div>
        )}

        {/* Separator between Card and UPI */}
        <div className="w-full h-[1px] bg-[#d9d9d9]" />

        {/* =========================================
            UPI SECTION
           ========================================= */}
        {/* UPI Header (Clickable) */}
        <div 
          onClick={() => setMethod('upi')}
          className="flex gap-[12px] items-center px-[16px] py-[16px] w-full cursor-pointer bg-white"
        >
          <div className={`border-[1.5px] rounded-full size-[16px] flex items-center justify-center ${method === 'upi' ? 'border-[#f95c4b]' : 'border-[#292929]'}`}>
            {method === 'upi' && <div className="bg-[#f95c4b] rounded-full size-[10px]" />}
          </div>
          <p className="font-medium text-[#808080] text-[15px]">
            UPI
          </p>
        </div>

        {/* UPI Expanded Details */}
        {method === 'upi' && (
          <div className="flex flex-col gap-[20px] px-[16px] pb-[20px] w-full bg-white">
            
            {/* Name */}
            <div className="flex flex-col gap-[8px] w-full">
              <label className="font-semibold text-[#1a1a1a] text-[14px]">
                Name
              </label>
              <input 
                type="text" 
                className="border border-[#d9d9d9] rounded-[6px] h-[48px] w-full px-[14px] font-medium text-[#1a1a1a] text-[14px] outline-none focus:border-[#a0a0a0] transition-colors" 
              />
            </div>

            {/* Billing address */}
            <div className="flex flex-col gap-[8px] w-full">
              <label className="font-semibold text-[#1a1a1a] text-[14px]">
                Billing address
              </label>
              
              {!manualAddress ? (
                <>
                  <div className="relative">
                    <select className="appearance-none bg-white border border-[#d9d9d9] rounded-[6px] rounded-b-none h-[48px] w-full px-[14px] font-medium text-[#808080] text-[14px] outline-none focus:border-[#a0a0a0] transition-colors cursor-pointer relative z-10">
                      <option>India</option>
                      <option>United States</option>
                      <option>United Kingdom</option>
                    </select>
                    <div className="absolute right-[14px] top-1/2 -translate-y-1/2 pointer-events-none z-20">
                      <svg width="12" height="8" viewBox="0 0 12 8" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M1 1.5L6 6.5L11 1.5" stroke="#666666" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    </div>
                  </div>
                  
                  <input 
                    type="text" 
                    placeholder="Address" 
                    className="border border-[#d9d9d9] mt-[-1px] rounded-b-[6px] h-[48px] w-full px-[14px] font-medium text-[#1a1a1a] text-[14px] outline-none placeholder:text-[#c2c2c6] focus:border-[#a0a0a0] transition-colors relative z-10" 
                  />
                  <p 
                    onClick={() => setManualAddress(true)}
                    className="font-medium text-[#606060] text-[13px] underline cursor-pointer hover:text-[#404040] w-fit mt-[4px]"
                  >
                    Enter address manually
                  </p>
                </>
              ) : (
                <div className="flex flex-col gap-[8px]">
                  <div className="relative">
                    <select className="appearance-none bg-white border border-[#d9d9d9] rounded-[6px] h-[48px] w-full px-[14px] font-medium text-[#808080] text-[14px] outline-none focus:border-[#a0a0a0] transition-colors cursor-pointer">
                      <option>India</option>
                      <option>United States</option>
                      <option>United Kingdom</option>
                    </select>
                    <div className="absolute right-[14px] top-1/2 -translate-y-1/2 pointer-events-none">
                      <svg width="12" height="8" viewBox="0 0 12 8" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M1 1.5L6 6.5L11 1.5" stroke="#666666" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    </div>
                  </div>
                  <input 
                    type="text" 
                    placeholder="Address 1" 
                    className="border border-[#d9d9d9] rounded-[6px] h-[48px] w-full px-[14px] font-medium text-[#1a1a1a] text-[14px] outline-none placeholder:text-[#808080] focus:border-[#a0a0a0] transition-colors" 
                  />
                  <input 
                    type="text" 
                    placeholder="Address 2" 
                    className="border border-[#d9d9d9] rounded-[6px] h-[48px] w-full px-[14px] font-medium text-[#1a1a1a] text-[14px] outline-none placeholder:text-[#808080] focus:border-[#a0a0a0] transition-colors" 
                  />
                  <div className="flex gap-[8px] w-full">
                    <input 
                      type="text" 
                      placeholder="City" 
                      className="border border-[#d9d9d9] rounded-[6px] h-[48px] w-1/2 px-[14px] font-medium text-[#1a1a1a] text-[14px] outline-none placeholder:text-[#808080] focus:border-[#a0a0a0] transition-colors" 
                    />
                    <input 
                      type="text" 
                      placeholder="Pin code" 
                      className="border border-[#d9d9d9] rounded-[6px] h-[48px] w-1/2 px-[14px] font-medium text-[#1a1a1a] text-[14px] outline-none placeholder:text-[#808080] focus:border-[#a0a0a0] transition-colors" 
                    />
                  </div>
                  <div className="relative">
                    <select className="appearance-none bg-white border border-[#d9d9d9] rounded-[6px] h-[48px] w-full px-[14px] font-medium text-[#808080] text-[14px] outline-none focus:border-[#a0a0a0] transition-colors cursor-pointer">
                      <option>State</option>
                      <option>Maharashtra</option>
                      <option>Delhi</option>
                      <option>Karnataka</option>
                    </select>
                    <div className="absolute right-[14px] top-1/2 -translate-y-1/2 pointer-events-none">
                      <svg width="12" height="8" viewBox="0 0 12 8" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M1 1.5L6 6.5L11 1.5" stroke="#666666" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Virtual Payment Address (VPA) */}
            <div className="flex flex-col gap-[8px] w-full">
              <label className="font-semibold text-[#1a1a1a] text-[14px]">
                Virtual Payment Address (VPA)
              </label>
              <input 
                type="text" 
                placeholder="your.name@somebank" 
                className="border border-[#d9d9d9] rounded-[6px] h-[48px] w-full px-[14px] font-medium text-[#1a1a1a] text-[14px] outline-none placeholder:text-[#c2c2c6] focus:border-[#a0a0a0] transition-colors" 
              />
            </div>

            {/* Business Checkbox */}
            <div 
              onClick={() => setBusinessCheck(!businessCheck)}
              className="flex gap-[10px] items-center cursor-pointer group mt-[4px] w-fit"
            >
              <div className={`border rounded-[4px] size-[16px] flex items-center justify-center transition-colors ${businessCheck ? 'bg-black border-black' : 'bg-white border-[#d9d9d9] group-hover:border-[#9a9a9a]'}`}>
                {businessCheck && (
                  <svg width="10" height="8" viewBox="0 0 10 8" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M1 4L3.66667 6.5L9 1" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                )}
              </div>
              <p className="font-medium text-[#1a1a1a] text-[14px]">
                Im purchasing as a business
              </p>
            </div>

          </div>
        )}

      </div>

      {/* Save Information Box */}
      <div className="bg-[#f6f4f1] border border-[#e4ded2] flex flex-col items-start p-[16px] rounded-[8px] w-full">
        <div 
          onClick={() => setSaveInfo(!saveInfo)}
          className="flex gap-[10px] items-center cursor-pointer w-fit"
        >
          <div className={`border rounded-[4px] size-[16px] flex items-center justify-center transition-colors ${saveInfo ? 'bg-black border-black' : 'bg-white border-[#d9d9d9]'}`}>
            {saveInfo && (
              <svg width="10" height="8" viewBox="0 0 10 8" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M1 4L3.66667 6.5L9 1" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            )}
          </div>
          <p className="font-medium text-[#5a5a5a] text-[14px]">
            Save my information for faster checkout
          </p>
        </div>

        <div className="px-[26px] mt-[4px]">
          <p className="font-medium text-[#9a9a9a] text-[13px]">
            Pay securely at OpenAI OpCo, LLC and everywhere Link is accepted.
          </p>
        </div>
      </div>

      {/* Subscribe Button */}
      <Link 
        href="/user/creator/post/checkout/upi"
        className="bg-[#f95c4b] hover:bg-[#eb5040] transition-colors h-[48px] flex items-center justify-center rounded-[40px] w-full text-white font-bold text-[16px] tracking-[0.32px]"
      >
        Subscribe
      </Link>

    </div>
  );
}
