'use client';

import React, { useState } from 'react';

const CATEGORIES = [
  'All',
  'Comedy',
  'Sports',
  'Fashion',
  'Education',
  'Lifestyle',
  'Art and Design',
  'Business',
  'Comedy',
  'Sports',
  'Fashion',
  'Education',
  'Lifestyle',
  'Art and Design',
  'Business'
];

export default function CategoryPills() {
  const [activeTab, setActiveTab] = useState('All');

  return (
    <div className="flex flex-col gap-[12px] w-full max-w-[1116px] mt-[48px]">
      <p className="font-[family-name:var(--font-figtree)] font-medium leading-[25.8px] text-[#3a3a3a] text-[16px] tracking-[0.32px]">
        Categories
      </p>
      
      {/* Horizontally scrolling row */}
      <div className="flex gap-[8px] items-center w-full overflow-x-auto pb-4 hide-scrollbar">
        {CATEGORIES.map((cat, index) => {
          const isActive = activeTab === cat;
          return (
            <button
              key={`${cat}-${index}`}
              onClick={() => setActiveTab(cat)}
              className="bg-[#faf8f5] border border-[#e4ded2] flex items-center justify-center px-[20px] py-[8px] rounded-[32px] shadow-[0px_1px_4px_0px_rgba(238,238,238,0.25)] shrink-0 transition-all duration-200 hover:scale-[1.02]"
            >
              <span className={`font-[family-name:var(--font-figtree)] font-medium leading-[18.3px] text-[13px] tracking-[0.26px] whitespace-nowrap transition-colors ${
                isActive ? 'text-[#f95c4b]' : 'text-[#5a5a5a]'
              }`}>
                {cat}
              </span>
            </button>
          );
        })}
      </div>

    </div>
  );
}
