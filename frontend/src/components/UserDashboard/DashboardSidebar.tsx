"use client";

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import SettingsModal from './SettingsModal';

const NAV_ITEMS = [
  { label: 'Home', icon: '/assets/dashboard/icon-home.svg', href: '/user' },
  { label: 'Notifications', icon: '/assets/dashboard/icon-notification.svg', href: '/user/notifications' },
  { label: 'My library', icon: '/assets/dashboard/icon-heart.svg', href: '/user/library' },
  { label: 'Messages', icon: '/assets/dashboard/icon-chat.svg', href: '/user/messages' },
  { label: 'My wallet', icon: '/assets/dashboard/icon-chat.svg', href: '/user/wallet' },
];

export default function DashboardSidebar() {
  const pathname = usePathname();
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);

  return (
    <aside className="fixed left-0 top-0 h-screen w-[240px] bg-[#faf8f5] flex flex-col z-50 overflow-hidden shrink-0">
      {/* Logo */}
      <Link href="/user" className="flex items-center gap-[12px] px-[24px] py-[24px] w-full shrink-0">
        <div className="relative size-[24px] shrink-0">
          <Image src="/assets/dashboard/icon-logo.svg" alt="Logo" fill />
        </div>
        <p className="font-['Inter:Medium',sans-serif] font-medium text-[#f95c4b] text-[16px] whitespace-nowrap">
          Logo
        </p>
      </Link>

      {/* Navigation */}
      <nav className="flex flex-col w-full flex-1 mt-4 gap-1">
        {NAV_ITEMS.map((item, index) => {
          const isActive = pathname === item.href;
          return (
            <Link
              href={item.href}
              key={index}
              className={`flex items-center gap-[12px] h-[56px] px-[24px] py-[8px] w-full transition-colors cursor-pointer hover:bg-[#f6f4f1] ${
                isActive ? 'border-r-4 border-[#f95c4b] bg-white' : 'border-r-4 border-transparent'
              }`}
            >
              <div className="relative size-[24px] shrink-0">
                <Image src={item.icon} alt={item.label} fill className={isActive ? 'opacity-100' : 'opacity-80'} />
              </div>
              <p className={`font-[family-name:var(--font-figtree)] font-medium leading-[25.8px] text-[16px] tracking-[0.32px] whitespace-nowrap ${isActive ? 'text-[#3a3a3a]' : 'text-[#5a5a5a]'}`}>
                {item.label}
              </p>
            </Link>
          );
        })}
      </nav>

      {/* Profile Area */}
      <div className="relative flex flex-col items-start justify-end w-full shrink-0">
        {/* Settings Popover */}
        {isSettingsOpen && (
          <SettingsModal onClose={() => setIsSettingsOpen(false)} />
        )}

        <div className="flex items-center gap-[12px] px-[24px] py-[24px] w-full cursor-pointer hover:bg-[#f6f4f1] transition-colors">
          <div className="flex items-center gap-[12px] flex-1">
            <div className="bg-[#9a9a9a] rounded-[32px] size-[32px] flex flex-col items-center justify-center shrink-0">
              <span className="font-[family-name:var(--font-figtree)] font-medium text-[13px] text-white tracking-[0.26px]">
                K
              </span>
            </div>
            <p className="font-[family-name:var(--font-figtree)] font-medium leading-[25.8px] text-[#606060] text-[16px] tracking-[0.32px] whitespace-nowrap">
              Profile
            </p>
          </div>
          <button
            onClick={() => setIsSettingsOpen(!isSettingsOpen)}
            className="relative w-[15px] h-[15px] shrink-0 flex items-center justify-center hover:opacity-70 transition-opacity"
          >
            <Image src="/assets/dashboard/icon-other.svg" alt="Options" fill className="object-contain" />
          </button>
        </div>
      </div>
    </aside>
  );
}
