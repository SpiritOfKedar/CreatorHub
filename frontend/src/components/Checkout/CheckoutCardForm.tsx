import React from 'react';

export default function CheckoutCardForm() {
  return (
    <div className="bg-[#fcfaf7] flex flex-col gap-[24px] items-start p-[40px] rounded-[16px] w-[672px] shrink-0">
      
      {/* Selected Method Display */}
      <div className="flex flex-col w-full">
        <div className="border border-[#d9d9d9] flex gap-[8px] items-center px-[8px] py-[12px] rounded-[6px] w-full relative z-10 bg-white">
          <div className="border-[1.5px] border-[#f95c4b] rounded-[16px] size-[16px] flex items-center justify-center">
            <div className="bg-[#f95c4b] rounded-[12px] size-[10px]" />
          </div>
          <p className="font-['Figtree',sans-serif] font-medium text-[#808080] text-[14px]">
            Card
          </p>
        </div>
        
        <div className="border border-[#d9d9d9] flex gap-[8px] items-center px-[8px] py-[12px] rounded-[6px] w-full mt-[-1px]">
          <div className="border-[1.5px] border-[#292929] rounded-[16px] size-[16px] flex items-center justify-center" />
          <p className="font-['Figtree',sans-serif] font-medium text-[#808080] text-[14px]">
            UPI
          </p>
        </div>
      </div>

      {/* Name Input */}
      <div className="flex flex-col gap-[8px] w-full">
        <label className="font-['Figtree',sans-serif] font-semibold text-[#1a1a1a] text-[14px]">
          Name on card
        </label>
        <div className="border border-[#d9d9d9] rounded-[6px] h-[41px] w-full px-[12px]" />
      </div>

      {/* Card Detail Inputs */}
      <div className="flex flex-col gap-[8px] w-full">
        <label className="font-['Figtree',sans-serif] font-semibold text-[#1a1a1a] text-[14px]">
          Card information
        </label>
        
        {/* Number */}
        <div className="border border-[#d9d9d9] rounded-[6px] px-[8px] py-[12px] w-full flex items-center">
          <p className="font-['Figtree',sans-serif] font-medium text-[#c2c2c6] text-[14px]">
            1234 5678 9101 1121
          </p>
        </div>
        
        {/* Expiry and CVV Row */}
        <div className="flex gap-[8px] w-full">
          <div className="border border-[#d9d9d9] rounded-[6px] px-[8px] py-[12px] w-1/2 flex items-center">
            <p className="font-['Figtree',sans-serif] font-medium text-[#c2c2c6] text-[14px]">
              MM / YY
            </p>
          </div>
          <div className="border border-[#d9d9d9] rounded-[6px] px-[8px] py-[12px] w-1/2 flex items-center">
            <p className="font-['Figtree',sans-serif] font-medium text-[#c2c2c6] text-[14px]">
              CVC
            </p>
          </div>
        </div>
      </div>

      {/* Billing Address */}
      <div className="flex flex-col gap-[8px] w-full">
        <label className="font-['Figtree',sans-serif] font-semibold text-[#1a1a1a] text-[14px]">
          Billing address
        </label>
        
        {/* Country Selector */}
        <div className="bg-[#e2e2e2] border border-[#d9d9d9] rounded-[6px] px-[8px] py-[12px] w-full flex items-center">
          <p className="font-['Figtree',sans-serif] font-medium text-[#808080] text-[14px]">
            India
          </p>
        </div>
        
        {/* Address Field */}
        <div className="border border-[#d9d9d9] rounded-[6px] px-[8px] py-[12px] w-full flex items-center">
          <p className="font-['Figtree',sans-serif] font-medium text-[#808080] text-[14px]">
            Address
          </p>
        </div>
        
        <p className="font-['Figtree',sans-serif] font-medium text-[#606060] text-[12px] underline cursor-pointer hover:text-[#404040]">
          Enter address manually
        </p>
      </div>

      {/* Business Checkbox */}
      <div className="flex gap-[8px] items-center cursor-pointer group">
        <div className="bg-white border border-[#c2c2c6] rounded-[3px] size-[14px] flex items-center justify-center transition-colors group-hover:border-[#9a9a9a]" />
        <p className="font-['Figtree',sans-serif] font-medium text-black text-[14px]">
          Im purchasing as a business
        </p>
      </div>

      {/* Subscribe Button */}
      <button className="bg-[#f95c4b] hover:bg-[#eb5040] transition-colors h-[40px] items-center justify-center px-[16px] py-[8px] rounded-[40px] w-full mt-[-8px]">
        <p className="font-['Figtree',sans-serif] font-bold text-white text-[16px] tracking-[0.32px] text-center w-full">
          Subscribe
        </p>
      </button>

    </div>
  );
}
