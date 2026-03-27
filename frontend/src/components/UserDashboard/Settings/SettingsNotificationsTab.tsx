"use client";

import React, { useState } from 'react';

const NOTIFICATION_TOGGLES = [
  { id: "comments", label: "Comment replies and reactions", defaultEnabled: true },
  { id: "posts", label: "Posts from creators", defaultEnabled: false },
  { id: "product_updates", label: "Product updates and community announcements", defaultEnabled: false },
  { id: "special_offers", label: "Special offers and promotions", defaultEnabled: false },
  { id: "notification_1", label: "Notification name", defaultEnabled: false },
  { id: "notification_2", label: "notification name", defaultEnabled: false },
];

export default function SettingsNotificationsTab() {
  const [toggles, setToggles] = useState<Record<string, boolean>>(
    Object.fromEntries(NOTIFICATION_TOGGLES.map((t) => [t.id, t.defaultEnabled]))
  );

  const handleToggle = (id: string) => {
    setToggles((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  return (
    <div className="flex flex-col gap-[24px] w-full max-w-[760px]">
      {/* General */}
      <div className="bg-[#faf8f5] border border-[var(--alt-sec,#e4ded2)] rounded-[12px] p-[24px] flex flex-col gap-[4px]">
        <p className="font-[family-name:var(--font-figtree)] font-bold text-[16px] text-[var(--heading,#1a1a1a)] mb-[8px]">
          General
        </p>
        {NOTIFICATION_TOGGLES.map((item) => (
          <div
            key={item.id}
            className="flex items-center justify-between py-[14px] border-b border-[#e4ded2] last:border-b-0"
          >
            <p className="font-[family-name:var(--font-figtree)] font-medium text-[14px] text-[var(--heading,#1a1a1a)]">
              {item.label}
            </p>
            {/* Toggle Switch */}
            <button
              onClick={() => handleToggle(item.id)}
              className={`relative w-[44px] h-[24px] rounded-full shrink-0 transition-colors duration-200 ${
                toggles[item.id] ? 'bg-[var(--cta,#f95c4b)]' : 'bg-[#d0d0d0]'
              }`}
            >
              <div
                className={`absolute top-[3px] size-[18px] rounded-full bg-white shadow-sm transition-transform duration-200 ${
                  toggles[item.id] ? 'translate-x-[23px]' : 'translate-x-[3px]'
                }`}
              />
            </button>
          </div>
        ))}
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
