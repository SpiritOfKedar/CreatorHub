import React from 'react';

export default function GenreSelectionHeader() {
  return (
    <div className="flex flex-col gap-[12px] items-center relative shrink-0 w-full max-w-[292px] text-center">
      <h1 className="font-[family-name:var(--font-fjalla)] leading-[48.6px] text-[#1a1a1a] text-[33px] tracking-[0.66px]">
        Select Your Genre
      </h1>
      <p className="font-[family-name:var(--font-figtree)] font-medium leading-[25.8px] text-[#3a3a3a] text-[16px] tracking-[0.32px] whitespace-nowrap">
        Whatever you into you find it here
      </p>
    </div>
  );
}
