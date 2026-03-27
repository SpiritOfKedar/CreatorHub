"use client";

import React from 'react';
import Link from 'next/link';
import { Settings, HelpCircle, Plus, Shield, History, LogOut } from 'lucide-react';

const MENU_ITEMS = [
  { label: 'Settings', icon: Settings, href: '/user/settings' },
  { label: 'Help center', icon: HelpCircle, href: '/user/help' },
  { label: 'Terms and conditions', icon: Plus, href: '/user/terms' },
  { label: 'Privacy policy', icon: Shield, href: '/user/privacy' },
  { label: 'Purchase history', icon: History, href: '/user/purchase-history' },
  { label: 'Logout', icon: LogOut, href: '/' },
];

interface SettingsModalProps {
  onClose: () => void;
}

export default function SettingsModal({ onClose }: SettingsModalProps) {
  return (
    <>
      {/* Invisible overlay to close on outside click */}
      <div className="fixed inset-0 z-[99]" onClick={onClose} />

      {/* Popover Card */}
      <div className="absolute bottom-[72px] left-[16px] z-[100] bg-[#faf8f5] rounded-[12px] shadow-[0px_2px_4px_0px_rgba(170,170,170,0.25)] p-[20px] flex flex-col gap-[28px] w-[220px] animate-in fade-in slide-in-from-bottom-2 duration-200">
        {MENU_ITEMS.map((item) => {
          const Icon = item.icon;
          return (
            <Link
              key={item.label}
              href={item.href}
              onClick={onClose}
              className="flex items-center gap-[8px] group cursor-pointer"
            >
              <div className="bg-[#fbfbfb] border border-[#e2e2e2] rounded-[20px] size-[28px] flex items-center justify-center shrink-0 overflow-hidden group-hover:bg-[#f0f0f0] transition-colors">
                <Icon className="size-[14px] text-[#404040]" />
              </div>
              <span className="font-[family-name:var(--font-figtree)] font-medium text-[14px] text-[#404040] whitespace-nowrap group-hover:text-[#1a1a1a] transition-colors">
                {item.label}
              </span>
            </Link>
          );
        })}
      </div>
    </>
  );
}
