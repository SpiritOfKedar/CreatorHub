import React from 'react';

type GenreActionFooterProps = {
  onSkip: () => void;
  onNext: () => void;
  nextDisabled?: boolean;
};

export default function GenreActionFooter({ onSkip, onNext, nextDisabled }: GenreActionFooterProps) {
  return (
    <div className="flex items-center justify-between w-full">
      {/* Skip Button */}
      <button 
        onClick={onSkip}
        className="bg-[#f6f4f1] border border-[#ff9465] border-solid flex gap-[8px] items-center justify-center px-[40px] py-[12px] rounded-[42px] hover:bg-[#ff9465] group transition-colors duration-200"
      >
        <span className="font-[family-name:var(--font-lexend)] font-medium text-[#1a1a1a] flex-1 text-center whitespace-nowrap leading-[normal] text-[16px] group-hover:text-white transition-colors duration-200">
          Skip
        </span>
      </button>

      {/* Next Button */}
      <button 
        onClick={onNext}
        disabled={nextDisabled}
        className={`border border-[#ff9465] border-solid flex gap-[8px] items-center justify-center px-[40px] py-[12px] rounded-[42px] shadow-[8px_8px_20px_0px_rgba(69,9,0,0.15)] transition-all duration-200 ${
          nextDisabled ? 'opacity-50 grayscale cursor-not-allowed' : 'active:scale-95 hover:-translate-y-1 hover:shadow-[8px_12px_25px_0px_rgba(69,9,0,0.25)]'
        }`}
        style={{ backgroundImage: "linear-gradient(128.8deg, rgb(225, 69, 23) 57.525%, rgb(214, 54, 31) 100%)" }}
      >
        <span className="font-[family-name:var(--font-lexend)] font-normal text-white text-[16px] leading-[normal] whitespace-nowrap">
          Next
        </span>
        <svg fill="none" height="20" viewBox="0 0 24 24" width="20" xmlns="http://www.w3.org/2000/svg">
          <path d="M5 12h14M12 5l7 7-7 7" stroke="white" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
        </svg>
      </button>
    </div>
  );
}
