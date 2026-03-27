"use client";

import React from 'react';
import { Eye, Play, Volume2, Maximize, Captions } from 'lucide-react';

export default function LivestreamPlayer() {
  return (
    <div className="relative w-full max-w-[1116px] h-[600px] rounded-[16px] overflow-hidden bg-[#2a2a2a] group">
      {/* Video Placeholder Image */}
      <img 
        src="https://images.unsplash.com/photo-1516280440503-6c9fa5c42d38?q=80&w=2070&auto=format&fit=crop" 
        alt="Stream Preview" 
        className="absolute inset-0 w-full h-full object-cover pointer-events-none"
      />

      {/* Top Overlay: Viewers & Live Badge */}
      <div className="absolute top-0 left-0 w-full flex justify-between items-start p-[16px]">
        {/* Viewers */}
        <div className="flex flex-col items-start justify-center text-white drop-shadow-md">
          <p className="font-[family-name:var(--font-figtree)] font-bold text-[16px] leading-[25.8px] tracking-[0.32px]">
            Viewers
          </p>
          <div className="flex items-center gap-[8px]">
            <Eye className="size-[20px]" />
            <p className="font-[family-name:var(--font-figtree)] font-bold text-[16px] leading-[25.8px] tracking-[0.32px]">
              11,520
            </p>
          </div>
        </div>

        {/* Live Badge */}
        <div className="bg-[var(--cta,#f95c4b)] px-[12px] py-[8px] rounded-[36px] flex items-center gap-[4px] shadow-md">
          <div className="bg-white/20 p-[4px] rounded-full flex items-center justify-center size-[16px]">
            <div className="bg-[var(--bg-2,#faf8f5)] size-[8px] rounded-full animate-pulse" />
          </div>
          <p className="font-[family-name:var(--font-figtree)] font-medium text-[13px] leading-[18.3px] tracking-[0.26px] text-[var(--bg-2,#faf8f5)] whitespace-nowrap">
            Live
          </p>
        </div>
      </div>

      {/* Bottom Controls Overlay */}
      <div className="absolute bottom-0 left-0 w-full h-[76px] bg-gradient-to-t from-black/60 to-transparent flex items-center p-[16px]">
        
        {/* Progress Bar */}
        <div className="absolute top-[0px] left-[12px] right-[12px] h-[4px] bg-white rounded-[8px] overflow-hidden">
          <div className="w-[20%] h-full bg-[var(--cta,#f95c4b)] rounded-[8px]" />
        </div>

        {/* Controls Layout */}
        <div className="flex w-full items-center justify-between mt-[8px]">
          {/* Left Controls */}
          <div className="flex items-center gap-[13px]">
            <button className="p-[8px] rounded-[32px] hover:bg-white/20 transition-colors text-white">
              <Play className="size-[28px] fill-current" />
            </button>
            <button className="p-[8px] rounded-[32px] hover:bg-white/20 transition-colors text-white">
              <Volume2 className="size-[28px] fill-current" />
            </button>
            <div className="h-[44px] flex items-center justify-center rounded-[32px] bg-black/40 backdrop-blur-sm px-[12px]">
              <span className="font-[family-name:var(--font-figtree)] font-medium text-[13px] leading-[18.3px] text-white tracking-[0.26px]">
                1:00 / 54:45
              </span>
            </div>
          </div>

          {/* Right Controls */}
          <div className="flex items-center gap-[8px]">
            <button className="p-[8px] rounded-[32px] hover:bg-white/20 transition-colors text-white">
              <Captions className="size-[28px]" />
            </button>
            <button className="p-[8px] rounded-[32px] hover:bg-white/20 transition-colors text-white">
              <Maximize className="size-[28px]" />
            </button>
          </div>
        </div>

      </div>
    </div>
  );
}
