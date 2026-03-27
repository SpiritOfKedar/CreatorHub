"use client";

import React, { useState } from 'react';
import SettingsAccountTab from './SettingsAccountTab';
import SettingsNotificationsTab from './SettingsNotificationsTab';
import SettingsSystemTab from './SettingsSystemTab';

const TABS = ['Account', 'Notifications', 'System'] as const;
type Tab = typeof TABS[number];

export default function SettingsContent() {
  const [activeTab, setActiveTab] = useState<Tab>('Account');

  return (
    <div className="flex flex-col items-start w-full px-[42px] py-[42px]">
      {/* Page Title */}
      <h1 className="font-[family-name:var(--font-fjalla)] font-normal text-[40px] leading-[57.6px] tracking-[0.8px] text-[var(--heading,#1a1a1a)]">
        Settings
      </h1>
      <p className="font-[family-name:var(--font-figtree)] font-semibold text-[19px] leading-[29.2px] tracking-[0.38px] text-[#757575] mb-[24px]">
        Manage your account, preferences, and security in one place.
      </p>

      {/* Tab Bar */}
      <div className="flex items-center gap-[24px] border-b border-[#e4ded2] w-full mb-[32px]">
        {TABS.map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`pb-[12px] font-[family-name:var(--font-figtree)] font-medium text-[16px] tracking-[0.32px] transition-colors relative ${
              activeTab === tab
                ? 'text-[var(--cta,#f95c4b)]'
                : 'text-[#757575] hover:text-[var(--heading,#1a1a1a)]'
            }`}
          >
            {tab}
            {activeTab === tab && (
              <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-[var(--cta,#f95c4b)] rounded-t-full" />
            )}
          </button>
        ))}
      </div>

      {/* Active Tab Content */}
      {activeTab === 'Account' && <SettingsAccountTab />}
      {activeTab === 'Notifications' && <SettingsNotificationsTab />}
      {activeTab === 'System' && <SettingsSystemTab />}
    </div>
  );
}
