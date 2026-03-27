import React from 'react';

export default function RoleSelectionHeader() {
  return (
    <div className="flex flex-col gap-[7px] items-center justify-center relative shrink-0 text-center w-full">
      <h1 className="font-[family-name:var(--font-fjalla)] leading-[48.6px] text-[#1a1a1a] text-[33px] tracking-[0.66px]">
        What do you want to do?
      </h1>
      <p className="font-[family-name:var(--font-figtree)] font-medium leading-[25.8px] text-[#3a3a3a] text-[16px] tracking-[0.32px] max-w-[396px]">
        Choose how you want to use the platform. You can switch later anytime
      </p>
    </div>
  );
}
