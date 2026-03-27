import React from 'react';

type RoleOptionCardProps = {
  title: string;
  description: string;
  isSelected: boolean;
  onClick: () => void;
};

export default function RoleOptionCard({ title, description, isSelected, onClick }: RoleOptionCardProps) {
  return (
    <div 
      onClick={onClick}
      className={`bg-[#faf8f5] border border-solid h-[100px] overflow-hidden relative rounded-[42px] shrink-0 w-full max-w-[644px] cursor-pointer transition-colors duration-200 ${
        isSelected ? 'border-[#ff9465] shadow-[0_4px_12px_rgba(255,148,101,0.15)]' : 'border-[#d8d1c7] hover:border-[#ff9465]'
      }`}
    >
      <div className="absolute left-[20px] lg:left-[24px] overflow-hidden size-[24px] top-[22px] flex items-center justify-center">
        {/* Simple inline SVG for the unselected/selected radio button */}
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <circle cx="12" cy="12" r="11" stroke={isSelected ? "#ff9465" : "#d8d1c7"} strokeWidth="2" />
          {isSelected && <circle cx="12" cy="12" r="6" fill="#ff9465" />}
        </svg>
      </div>

      <div className="-translate-y-1/2 absolute flex flex-col gap-[8px] items-start left-[64px] lg:left-[72px] top-[50%] w-auto max-w-[80%]">
        <h2 className="font-[family-name:var(--font-fjalla)] leading-[42.1px] text-[#1a1a1a] text-[24px] lg:text-[28px] tracking-[0.56px]">
          {title}
        </h2>
        <p className="font-[family-name:var(--font-figtree)] font-medium leading-[18.3px] text-[#5a5a5a] text-[13px] tracking-[0.26px] whitespace-normal sm:whitespace-nowrap">
          {description}
        </p>
      </div>
    </div>
  );
}
