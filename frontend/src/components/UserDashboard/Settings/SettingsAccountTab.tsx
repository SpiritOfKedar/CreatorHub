"use client";

import React, { useState } from 'react';
import { Camera, ChevronDown } from 'lucide-react';

export default function SettingsAccountTab() {
  const [privacy, setPrivacy] = useState<string>("public");

  return (
    <div className="flex flex-col gap-[24px] w-full max-w-[760px]">
      {/* Profile Information */}
      <div className="bg-[#faf8f5] border border-[var(--alt-sec,#e4ded2)] rounded-[12px] p-[24px] flex flex-col gap-[16px]">
        <p className="font-[family-name:var(--font-figtree)] font-bold text-[16px] text-[var(--heading,#1a1a1a)]">
          Profile Information
        </p>

        {/* Avatar */}
        <div className="relative w-fit">
          <div className="size-[88px] rounded-full bg-[#c4a882] overflow-hidden">
            <img
              src="https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=200&auto=format&fit=crop"
              alt="Profile"
              className="w-full h-full object-cover"
            />
          </div>
          <button className="absolute bottom-0 right-0 size-[28px] bg-white border border-[#e4ded2] rounded-full flex items-center justify-center shadow-sm hover:bg-[#f6f4f1] transition-colors">
            <Camera className="size-[14px] text-[#757575]" />
          </button>
        </div>

        {/* Display Name */}
        <div className="flex flex-col gap-[6px]">
          <label className="font-[family-name:var(--font-figtree)] font-semibold text-[14px] text-[var(--heading,#1a1a1a)]">
            Display Name
          </label>
          <input
            type="text"
            defaultValue="HSBJHBJHVBJHBB"
            className="w-full h-[44px] px-[16px] bg-white border border-[var(--alt-sec,#e4ded2)] rounded-[8px] font-[family-name:var(--font-figtree)] font-medium text-[14px] text-[var(--heading,#1a1a1a)] outline-none focus:border-[var(--cta,#f95c4b)] transition-colors"
          />
        </div>

        {/* Email */}
        <div className="flex flex-col gap-[6px]">
          <label className="font-[family-name:var(--font-figtree)] font-semibold text-[14px] text-[var(--heading,#1a1a1a)]">
            Email
          </label>
          <input
            type="text"
            defaultValue="All courses"
            className="w-full h-[44px] px-[16px] bg-white border border-[var(--alt-sec,#e4ded2)] rounded-[8px] font-[family-name:var(--font-figtree)] font-medium text-[14px] text-[var(--heading,#1a1a1a)] outline-none focus:border-[var(--cta,#f95c4b)] transition-colors"
          />
        </div>

        {/* Country of residence */}
        <div className="flex flex-col gap-[6px]">
          <label className="font-[family-name:var(--font-figtree)] font-semibold text-[14px] text-[var(--heading,#1a1a1a)]">
            Country of residence
          </label>
          <div className="relative">
            <select className="w-full h-[44px] px-[16px] pr-[40px] bg-white border border-[var(--alt-sec,#e4ded2)] rounded-[8px] font-[family-name:var(--font-figtree)] font-medium text-[14px] text-[var(--heading,#1a1a1a)] outline-none focus:border-[var(--cta,#f95c4b)] transition-colors appearance-none cursor-pointer">
              <option>All courses</option>
              <option>India</option>
              <option>United States</option>
              <option>United Kingdom</option>
              <option>Canada</option>
              <option>Australia</option>
            </select>
            <ChevronDown className="absolute right-[12px] top-1/2 -translate-y-1/2 size-[16px] text-[#757575] pointer-events-none" />
          </div>
        </div>
      </div>

      {/* Reset Password */}
      <div className="bg-[#faf8f5] border border-[var(--alt-sec,#e4ded2)] rounded-[12px] p-[24px] flex flex-col gap-[12px]">
        <p className="font-[family-name:var(--font-figtree)] font-bold text-[16px] text-[var(--heading,#1a1a1a)]">
          Reset password
        </p>
        <p className="font-[family-name:var(--font-figtree)] font-medium text-[14px] leading-[22px] text-[#757575]">
          If you have forgot password for your account and want to change it , click on this button to receive the recovery link in your email.
        </p>
        <button className="w-fit px-[20px] py-[8px] bg-transparent border border-[var(--alt-sec,#e4ded2)] rounded-[8px] font-[family-name:var(--font-figtree)] font-semibold text-[14px] text-[var(--heading,#1a1a1a)] hover:bg-[#f6f4f1] transition-colors">
          Reset Password
        </button>
      </div>

      {/* Logged in with this account */}
      <div className="bg-[#faf8f5] border border-[var(--alt-sec,#e4ded2)] rounded-[12px] p-[24px] flex flex-col gap-[12px]">
        <p className="font-[family-name:var(--font-figtree)] font-bold text-[16px] text-[var(--heading,#1a1a1a)]">
          Logged in with this account
        </p>
        <div className="flex items-center gap-[12px] py-[8px]">
          <div className="size-[36px] rounded-full bg-[#9a9a9a] flex items-center justify-center shrink-0">
            <span className="font-[family-name:var(--font-figtree)] font-bold text-[14px] text-white">K</span>
          </div>
          <p className="font-[family-name:var(--font-figtree)] font-medium text-[14px] text-[var(--heading,#1a1a1a)] flex-1">
            dmkhushi21@gmail.com
          </p>
          <button className="font-[family-name:var(--font-figtree)] font-medium text-[14px] text-[#757575] hover:text-[var(--heading,#1a1a1a)] transition-colors">
            Disconnect
          </button>
        </div>
      </div>

      {/* Account privacy */}
      <div className="bg-[#faf8f5] border border-[var(--alt-sec,#e4ded2)] rounded-[12px] p-[24px] flex flex-col gap-[4px]">
        <p className="font-[family-name:var(--font-figtree)] font-bold text-[16px] text-[var(--heading,#1a1a1a)] mb-[8px]">
          Account privacy
        </p>
        {/* Keep it as public */}
        <label className="flex items-center gap-[12px] py-[12px] border-b border-[#e4ded2] cursor-pointer hover:bg-[#f6f4f1] transition-colors px-[4px] rounded-[4px]">
          <div className={`size-[20px] rounded-full border-2 flex items-center justify-center shrink-0 transition-colors ${privacy === 'public' ? 'border-[var(--cta,#f95c4b)]' : 'border-[#d0d0d0]'}`}>
            {privacy === 'public' && <div className="size-[10px] rounded-full bg-[var(--cta,#f95c4b)]" />}
          </div>
          <span className="font-[family-name:var(--font-figtree)] font-medium text-[14px] text-[var(--heading,#1a1a1a)]">
            Keep it as public
          </span>
          <input type="radio" name="privacy" value="public" checked={privacy === 'public'} onChange={() => setPrivacy('public')} className="sr-only" />
        </label>
        {/* Keep it as private */}
        <label className="flex items-center gap-[12px] py-[12px] cursor-pointer hover:bg-[#f6f4f1] transition-colors px-[4px] rounded-[4px]">
          <div className={`size-[20px] rounded-full border-2 flex items-center justify-center shrink-0 transition-colors ${privacy === 'private' ? 'border-[var(--cta,#f95c4b)]' : 'border-[#d0d0d0]'}`}>
            {privacy === 'private' && <div className="size-[10px] rounded-full bg-[var(--cta,#f95c4b)]" />}
          </div>
          <span className="font-[family-name:var(--font-figtree)] font-medium text-[14px] text-[var(--heading,#1a1a1a)]">
            Keep it as private
          </span>
          <input type="radio" name="privacy" value="private" checked={privacy === 'private'} onChange={() => setPrivacy('private')} className="sr-only" />
        </label>
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
