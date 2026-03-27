"use client";

import React from 'react';
import PurchaseItem, { PurchaseItemData } from './PurchaseItem';

interface PurchaseGroupProps {
  label: string;
  items: PurchaseItemData[];
  selectedId?: number | null;
  onSelect?: (item: PurchaseItemData) => void;
}

export default function PurchaseGroup({ label, items, selectedId, onSelect }: PurchaseGroupProps) {
  return (
    <div className="flex flex-col gap-[4px] w-full">
      {/* Section Label */}
      <p className="font-[family-name:var(--font-figtree)] font-semibold text-[16px] leading-[25.8px] tracking-[0.32px] text-[var(--heading,#1a1a1a)] mb-[8px]">
        {label}
      </p>

      {/* Items */}
      <div className="bg-[#faf8f5] border border-[var(--alt-sec,#e4ded2)] rounded-[12px] flex flex-col divide-y divide-[#e4ded2] overflow-hidden">
        {items.map((item) => (
          <PurchaseItem
            key={item.id}
            item={item}
            isSelected={selectedId === item.id}
            onClick={() => onSelect?.(item)}
          />
        ))}
      </div>
    </div>
  );
}
