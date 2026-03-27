"use client";

import React from 'react';
import { Search, Send, Rocket, Bot, CreditCard, BookOpen, Wrench } from 'lucide-react';

const HELP_CATEGORIES = [
  {
    title: 'How "Remix" Works',
    description: 'Discover how to instantly turn any marketplace asset into your own creation.',
    icon: Send,
    color: '#f95c4b',
  },
  {
    title: 'Getting Started',
    description: 'Start your journey by understanding the basics of your workspace.',
    icon: Rocket,
    color: '#f95c4b',
  },
  {
    title: 'AI Customization',
    description: 'This section walks you through giving prompts, applying changes, and generating multiple variations.',
    icon: Bot,
    color: '#f95c4b',
  },
  {
    title: 'Billing & Subscriptions',
    description: 'Explains our pricing structure, the difference between free and premium features, and how billing cycles work.',
    icon: CreditCard,
    color: '#f95c4b',
  },
  {
    title: 'Learning',
    description: 'Explore helpful tutorials, best practices, and creative tips to elevate your design workflow.',
    icon: BookOpen,
    color: '#f95c4b',
  },
  {
    title: 'Technical Support',
    description: 'Our guides help troubleshoot common problems quickly so you can get back to designing without interruption.',
    icon: Wrench,
    color: '#f95c4b',
  },
];

export default function HelpSupportContent() {
  return (
    <div className="flex flex-col items-start w-full px-[42px] py-[42px]">
      {/* Page Title */}
      <h1 className="font-[family-name:var(--font-fjalla)] font-normal text-[40px] leading-[57.6px] tracking-[0.8px] text-[var(--heading,#1a1a1a)] mb-[32px]">
        Help &amp; Support
      </h1>

      {/* Subtitle Section */}
      <div className="flex flex-col gap-[8px] w-full mb-[24px]">
        <h2 className="font-[family-name:var(--font-fjalla)] font-normal text-[28px] leading-[42.1px] tracking-[0.56px] text-[#2d2d2d]">
          How Can We Assist You Today?
        </h2>
        <p className="font-[family-name:var(--font-figtree)] font-semibold text-[19px] leading-[29.2px] tracking-[0.38px] text-[#757575]">
          Browse common topics or tell us what you need help with - we&apos;re here to support you.
        </p>
      </div>

      {/* Search Bar */}
      <div className="w-full max-w-[1116px] bg-[#fcfaf7] border border-[var(--alt-sec,#e4ded2)] rounded-[32px] shadow-[0px_1px_4px_0px_rgba(238,238,238,0.25)] px-[12px] py-[12px] flex items-center gap-[8px] mb-[32px]">
        <Search className="size-[20px] text-[#aaa] shrink-0" />
        <input
          type="text"
          placeholder="Search"
          className="bg-transparent border-none outline-none flex-1 font-['Be_Vietnam_Pro',sans-serif] text-[14px] text-[#1a1a1a] placeholder:text-[#aaa]"
        />
      </div>

      {/* Category Cards Grid */}
      <div className="grid grid-cols-3 gap-[20px] w-full max-w-[1116px]">
        {HELP_CATEGORIES.map((cat) => {
          const Icon = cat.icon;
          return (
            <div
              key={cat.title}
              className="bg-[#faf8f5] border border-[var(--alt-sec,#e4ded2)] rounded-[8px] p-[20px] h-[184px] flex flex-col gap-[16px] items-start justify-center overflow-hidden cursor-pointer hover:shadow-md hover:border-[#d0c9bd] transition-all group"
            >
              {/* Icon */}
              <div className="size-[40px] bg-[var(--bg,#f6f4f1)] rounded-[4px] flex items-center justify-center shrink-0">
                <Icon className="size-[20px] text-[#f95c4b] group-hover:scale-110 transition-transform" />
              </div>

              {/* Text */}
              <div className="flex flex-col gap-[8px]">
                <p className="font-['Inter',sans-serif] font-medium text-[16px] leading-normal text-black">
                  {cat.title}
                </p>
                <p className="font-['Inter',sans-serif] font-medium text-[14px] leading-[20px] text-[#606060]">
                  {cat.description}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
