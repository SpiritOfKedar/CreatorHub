"use client";

import React from 'react';
import { MoreHorizontal } from 'lucide-react';

export interface PurchaseItemData {
  id: number;
  title: string;
  price: string;
  date: string;
  time: string;
  thumbnail: string;
}

interface PurchaseItemProps {
  item: PurchaseItemData;
  isSelected?: boolean;
  onClick?: () => void;
}

export default function PurchaseItem({ item, isSelected, onClick }: PurchaseItemProps) {
  return (
    <div
      onClick={onClick}
      className={`flex items-center gap-[16px] px-[20px] py-[16px] w-full transition-colors rounded-[8px] group cursor-pointer ${
        isSelected
          ? 'bg-[var(--cta,#f95c4b)]'
          : 'hover:bg-[#f6f4f1]'
      }`}
    >
      {/* Thumbnail */}
      <div className="size-[60px] rounded-[8px] overflow-hidden shrink-0 bg-[#e0e0e0]">
        <img
          src={item.thumbnail}
          alt={item.title}
          className="w-full h-full object-cover"
        />
      </div>

      {/* Info */}
      <div className="flex flex-col gap-[4px] flex-1 min-w-0">
        <p className={`font-[family-name:var(--font-figtree)] font-semibold text-[16px] leading-[25.8px] tracking-[0.32px] truncate ${isSelected ? 'text-white' : 'text-[var(--heading,#1a1a1a)]'}`}>
          {item.title}
        </p>
        <p className={`font-[family-name:var(--font-figtree)] font-bold text-[16px] leading-[25.8px] tracking-[0.32px] ${isSelected ? 'text-white' : 'text-[var(--heading,#1a1a1a)]'}`}>
          {item.price}
        </p>
        <p className={`font-[family-name:var(--font-figtree)] font-medium text-[13px] leading-[18.3px] tracking-[0.26px] ${isSelected ? 'text-white/80' : 'text-[var(--place-holder,#9a9a9a)]'}`}>
          {item.date}  |  {item.time}
        </p>
      </div>

      {/* 3 dots */}
      <button className={`size-[24px] flex items-center justify-center shrink-0 transition-opacity ${isSelected ? 'text-white opacity-100' : 'text-[#9a9a9a] hover:text-[#1a1a1a] opacity-0 group-hover:opacity-100'}`}>
        <MoreHorizontal className="size-[20px]" />
      </button>
    </div>
  );
}

