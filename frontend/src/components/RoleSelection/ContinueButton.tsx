import React from 'react';

type ContinueButtonProps = {
  onClick?: () => void;
  disabled?: boolean;
};

export default function ContinueButton({ onClick, disabled }: ContinueButtonProps) {
  return (
    <button 
      onClick={onClick}
      disabled={disabled}
      className={`border border-[#ff9465] border-solid flex gap-[8px] items-center justify-center px-[32px] py-[14px] relative rounded-[42px] shadow-[8px_8px_20px_0px_rgba(69,9,0,0.35)] shrink-0 transition-all duration-200 ${
        disabled ? 'opacity-50 cursor-not-allowed scale-100 grayscale-[0.5]' : 'active:scale-95 hover:opacity-90 hover:shadow-[8px_8px_25px_0px_rgba(69,9,0,0.5)]'
      }`}
      style={{ backgroundImage: "linear-gradient(136.8deg, rgb(225, 69, 23) 57.525%, rgb(214, 54, 31) 100%)" }}
    >
      <span className="font-[family-name:var(--font-lexend)] font-normal text-[#faf8f5] text-[16px] text-center whitespace-nowrap">
        Continue
      </span>
      {/* Arrow SVG */}
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M5 12H19M19 12L12 5M19 12L12 19" stroke="#faf8f5" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    </button>
  );
}
