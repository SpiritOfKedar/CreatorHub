import React from 'react';

export default function DashboardHeader() {
  return (
    <div className="flex flex-col items-start gap-[4px] w-full max-w-[1116px] pt-[42px]">
      <h2 className="font-[family-name:var(--font-fjalla)] font-normal leading-[57.6px] text-[#1a1a1a] text-[40px] tracking-[0.8px]">
        Discover Creators
      </h2>
      <p className="font-[family-name:var(--font-fjalla)] font-normal leading-[48.6px] text-[#3a3a3a] text-[33px] tracking-[0.66px]">
        Explore top creators across categories and find content that fits your interests.
      </p>
    </div>
  );
}
