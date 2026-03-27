"use client";

import React, { useState } from 'react';
import { ChevronDown } from 'lucide-react';

export default function SettingsSystemTab() {
  const [theme, setTheme] = useState<string>("system");

  return (
    <div className="flex flex-col gap-[24px] w-full max-w-[760px]">
      {/* System Preferences */}
      <div className="bg-[#faf8f5] border border-[var(--alt-sec,#e4ded2)] rounded-[12px] p-[24px] flex flex-col gap-[4px]">
        <p className="font-[family-name:var(--font-figtree)] font-bold text-[16px] text-[var(--heading,#1a1a1a)] mb-[8px]">
          System preferences
        </p>
        {/* Light mode */}
        <label className="flex items-center gap-[12px] py-[12px] border-b border-[#e4ded2] cursor-pointer hover:bg-[#f6f4f1] transition-colors px-[4px] rounded-[4px]">
          <div className={`size-[20px] rounded-full border-2 flex items-center justify-center shrink-0 transition-colors ${theme === 'light' ? 'border-[var(--cta,#f95c4b)]' : 'border-[#d0d0d0]'}`}>
            {theme === 'light' && <div className="size-[10px] rounded-full bg-[var(--cta,#f95c4b)]" />}
          </div>
          <span className="font-[family-name:var(--font-figtree)] font-medium text-[14px] text-[var(--heading,#1a1a1a)]">
            Light mode
          </span>
          <input type="radio" name="theme" value="light" checked={theme === 'light'} onChange={() => setTheme('light')} className="sr-only" />
        </label>

        {/* Dark mode */}
        <label className="flex items-center gap-[12px] py-[12px] border-b border-[#e4ded2] cursor-pointer hover:bg-[#f6f4f1] transition-colors px-[4px] rounded-[4px]">
          <div className={`size-[20px] rounded-full border-2 flex items-center justify-center shrink-0 transition-colors ${theme === 'dark' ? 'border-[var(--cta,#f95c4b)]' : 'border-[#d0d0d0]'}`}>
            {theme === 'dark' && <div className="size-[10px] rounded-full bg-[var(--cta,#f95c4b)]" />}
          </div>
          <span className="font-[family-name:var(--font-figtree)] font-medium text-[14px] text-[var(--heading,#1a1a1a)]">
            Dark mode
          </span>
          <input type="radio" name="theme" value="dark" checked={theme === 'dark'} onChange={() => setTheme('dark')} className="sr-only" />
        </label>

        {/* System default */}
        <label className="flex items-center gap-[12px] py-[12px] cursor-pointer hover:bg-[#f6f4f1] transition-colors px-[4px] rounded-[4px]">
          <div className={`size-[20px] rounded-full border-2 flex items-center justify-center shrink-0 transition-colors ${theme === 'system' ? 'border-[var(--cta,#f95c4b)]' : 'border-[#d0d0d0]'}`}>
            {theme === 'system' && <div className="size-[10px] rounded-full bg-[var(--cta,#f95c4b)]" />}
          </div>
          <span className="font-[family-name:var(--font-figtree)] font-medium text-[14px] text-[var(--heading,#1a1a1a)]">
            System default
          </span>
          <input type="radio" name="theme" value="system" checked={theme === 'system'} onChange={() => setTheme('system')} className="sr-only" />
        </label>
      </div>

      {/* Language Preference */}
      <div className="bg-[#faf8f5] border border-[var(--alt-sec,#e4ded2)] rounded-[12px] p-[24px] flex flex-col gap-[12px]">
        <p className="font-[family-name:var(--font-figtree)] font-bold text-[16px] text-[var(--heading,#1a1a1a)]">
          Language Preference
        </p>
        <div className="relative">
          <select className="w-full h-[44px] px-[16px] pr-[40px] bg-[var(--bg,#f6f4f1)] border border-[var(--alt-sec,#e4ded2)] rounded-[8px] font-[family-name:var(--font-figtree)] font-medium text-[14px] text-[var(--heading,#1a1a1a)] outline-none focus:border-[var(--cta,#f95c4b)] transition-colors appearance-none cursor-pointer">
            <option>English ( united kingdom )</option>
            <option>English ( united states )</option>
            <option>Hindi</option>
            <option>Spanish</option>
            <option>French</option>
          </select>
          <ChevronDown className="absolute right-[12px] top-1/2 -translate-y-1/2 size-[16px] text-[#757575] pointer-events-none" />
        </div>
      </div>

      {/* Currency Preference */}
      <div className="bg-[#faf8f5] border border-[var(--alt-sec,#e4ded2)] rounded-[12px] p-[24px] flex flex-col gap-[12px]">
        <p className="font-[family-name:var(--font-figtree)] font-bold text-[16px] text-[var(--heading,#1a1a1a)]">
          Currency Preference
        </p>
        <div className="relative">
          <select className="w-full h-[44px] px-[16px] pr-[40px] bg-[var(--bg,#f6f4f1)] border border-[var(--alt-sec,#e4ded2)] rounded-[8px] font-[family-name:var(--font-figtree)] font-medium text-[14px] text-[var(--heading,#1a1a1a)] outline-none focus:border-[var(--cta,#f95c4b)] transition-colors appearance-none cursor-pointer">
            <option>USD</option>
            <option>INR</option>
            <option>EUR</option>
            <option>GBP</option>
          </select>
          <ChevronDown className="absolute right-[12px] top-1/2 -translate-y-1/2 size-[16px] text-[#757575] pointer-events-none" />
        </div>
      </div>

      {/* Save Button */}
      <div className="flex justify-end">
        <button className="h-[44px] px-[32px] bg-[var(--cta,#f95c4b)] rounded-[32px] font-[family-name:var(--font-figtree)] font-bold text-[16px] text-white hover:bg-[#e8503f] transition-colors">
          Save Changes
        </button>
      </div>
    </div>
  );
}
