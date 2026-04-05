'use client';

import React from 'react';
import { AlertTriangle } from 'lucide-react';

interface FeatureUnavailablePanelProps {
  title: string;
  description: string;
  actionLabel?: string;
  onAction?: () => void;
}

export default function FeatureUnavailablePanel({
  title,
  description,
  actionLabel,
  onAction,
}: FeatureUnavailablePanelProps) {
  return (
    <div className="min-h-screen bg-[#f9f9f9] flex items-center justify-center p-6">
      <div className="w-full max-w-2xl rounded-3xl bg-white border border-slate-200 shadow-xl p-8 sm:p-10">
        <div className="inline-flex items-center gap-2 rounded-full bg-rose-50 text-rose-600 px-3 py-1.5 text-xs font-extrabold tracking-wider uppercase mb-6">
          <AlertTriangle className="w-4 h-4" />
          Feature unavailable
        </div>

        <h1 className="text-3xl sm:text-4xl font-black text-[#1c1917] tracking-tight leading-tight mb-4">
          {title}
        </h1>

        <p className="text-base sm:text-lg font-medium text-slate-600 leading-relaxed max-w-xl mb-8">
          {description}
        </p>

        {actionLabel && onAction && (
          <button
            onClick={onAction}
            className="px-6 py-3 rounded-xl bg-[#1c1917] text-white font-extrabold text-sm tracking-wide hover:bg-black transition-colors"
          >
            {actionLabel}
          </button>
        )}
      </div>
    </div>
  );
}
