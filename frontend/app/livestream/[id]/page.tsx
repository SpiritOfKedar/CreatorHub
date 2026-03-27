import React from 'react';
import Link from 'next/link';
import { ChevronLeft } from 'lucide-react';
import DashboardSidebar from '@/src/components/UserDashboard/DashboardSidebar';
import LivestreamPlayer from '@/src/components/CreatorProfile/LivestreamPlayer';
import CreatorHeader from '@/src/components/CreatorProfile/CreatorHeader';
import LivestreamComments from '@/src/components/CreatorProfile/LivestreamComments';

export default function CreatorProfilePage() {
  return (
    <div className="min-h-screen bg-[var(--bg,#f6f4f1)] flex relative overflow-x-hidden">
      <DashboardSidebar />
      
      {/* Main Content Area - Padded left to account for sidebar */}
      <main className="flex-1 ml-[240px] pl-[42px] pr-[42px] pt-[42px] pb-[60px] flex flex-col items-start min-h-screen relative">
        
        {/* Back Button positioned absolute top-left */}
        <div className="absolute top-[42px] left-[42px]">
          <Link href="/user/creator" className="flex items-center gap-[4px] px-[8px] py-[4px] border border-[var(--input-field-border,#d8d1c7)] rounded-[36px] bg-[var(--bg-2,#faf8f5)] hover:bg-[#f0f0f0] transition-colors shadow-sm">
            <ChevronLeft className="size-[20px] text-[var(--heading,#1a1a1a)]" />
            <span className="font-[family-name:var(--font-figtree)] font-medium text-[16px] leading-[25.8px] tracking-[0.32px] text-[var(--heading,#1a1a1a)] pr-2">
              Back
            </span>
          </Link>
        </div>

        {/* Livestream Content Container */}
        <div className="w-full flex flex-col items-start mt-[76px] pb-[42px] max-w-[1116px]">
          
          {/* Main Stream Title */}
          <h1 className="font-[family-name:var(--font-fjalla)] font-normal text-[40px] leading-[57.6px] tracking-[0.8px] text-[var(--heading,#1a1a1a)] mb-[24px]">
            Transform your body in just 30 days with simple home workouts and a guided nutrition plan.
          </h1>

          {/* Sub components stacked linearly */}
          <LivestreamPlayer />
          <CreatorHeader />
          <LivestreamComments />

        </div>
      </main>
    </div>
  );
}
