import React from 'react';
import DashboardSidebar from '@/src/components/UserDashboard/DashboardSidebar';
import LibraryCard from '@/src/components/UserDashboard/LibraryCard';

export default function LibraryPage() {
  return (
    <div className="min-h-screen bg-[var(--bg,#f6f4f1)] flex relative overflow-x-hidden">
      <DashboardSidebar />
      
      {/* Main Content Area - Padded left to account for sidebar */}
      <main className="flex-1 ml-[240px] pl-[42px] pr-[42px] pt-[42px] flex flex-col items-start">
        <div className="w-full max-w-[1116px] flex flex-col items-start min-h-screen">
          
          <div className="flex flex-col gap-[4px] mb-[32px]">
            <h1 className="font-[family-name:var(--font-fjalla)] font-normal text-[40px] text-[var(--heading,#1a1a1a)] tracking-[0.8px] leading-[57.6px]">
              Your Library
            </h1>
            <p className="font-[family-name:var(--font-fjalla)] font-normal text-[33px] text-[var(--sub-head,#3a3a3a)] tracking-[0.66px] leading-[48.6px]">
              View and access all the posts and content you’ve bookmarked to explore later.
            </p>
          </div>

          {/* Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-[16px] w-full mb-[42px]">
            {Array.from({ length: 6 }).map((_, i) => (
              <LibraryCard key={i} />
            ))}
          </div>

        </div>
      </main>
    </div>
  );
}
