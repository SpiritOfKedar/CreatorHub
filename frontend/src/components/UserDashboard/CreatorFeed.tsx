import React from 'react';
import CreatorCard from './CreatorCard';

export default function CreatorFeed() {
  return (
    <div className="flex flex-col gap-[16px] w-full max-w-[1116px] mt-[48px] pb-[64px]">
      <h3 className="font-[family-name:var(--font-figtree)] font-semibold leading-[29.2px] text-[#3a3a3a] text-[19px] tracking-[0.38px] mb-[4px]">
        All Creators
      </h3>
      
      {/* We replicate the card 3 times to match the Figma mockup */}
      <CreatorCard />
      <CreatorCard />
      <CreatorCard />

    </div>
  );
}
