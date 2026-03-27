import React from 'react';
import DashboardSidebar from '@/src/components/UserDashboard/DashboardSidebar';
import NotificationItem from '@/src/components/UserDashboard/NotificationItem';

export default function NotificationsPage() {
  return (
    <div className="min-h-screen bg-[var(--bg,#f6f4f1)] flex relative overflow-x-hidden">
      <DashboardSidebar />
      
      {/* Main Content Area - Padded left to account for sidebar */}
      <main className="flex-1 ml-[240px] pl-[42px] pr-[42px] pt-[42px] flex flex-col items-start">
        <div className="w-full max-w-[1116px] flex flex-col items-start min-h-screen">
          
          <div className="flex flex-col gap-[4px] mb-[32px]">
            <h1 className="font-[family-name:var(--font-fjalla)] font-normal text-[40px] text-[var(--heading,#1a1a1a)] tracking-[0.8px] leading-[57.6px]">
              Notifications
            </h1>
            <p className="font-[family-name:var(--font-fjalla)] font-normal text-[33px] text-[var(--sub-head,#3a3a3a)] tracking-[0.66px] leading-[48.6px]">
              Stay updated with new content, updates, and important activity from creators.
            </p>
          </div>

          <div className="flex flex-col gap-[16px] w-full mb-[42px]">
            {/* Today Section */}
            <div className="flex flex-col gap-[8px] w-full">
              <p className="font-[family-name:var(--font-figtree)] font-medium text-[16px] leading-[25.8px] tracking-[0.32px] text-[#3a3a3a] mb-2">
                Today
              </p>
              <div className="flex flex-col gap-[4px] w-full">
                {Array.from({ length: 4 }).map((_, i) => (
                  <NotificationItem 
                    key={`today-${i}`} 
                    message="Smith has posted a new video post" 
                    time="23 Jan, 2025 | 2:00pm" 
                  />
                ))}
              </div>
            </div>

            {/* Yesterday Section */}
            <div className="flex flex-col gap-[8px] w-full mt-4">
              <p className="font-[family-name:var(--font-figtree)] font-medium text-[16px] leading-[25.8px] tracking-[0.32px] text-[#3a3a3a] mb-2">
                Yesterday
              </p>
              <div className="flex flex-col gap-[4px] w-full">
                {Array.from({ length: 4 }).map((_, i) => (
                  <NotificationItem 
                    key={`yesterday-${i}`} 
                    message="Smith has posted a new video post" 
                    time="23 Jan, 2025 | 2:00pm" 
                  />
                ))}
              </div>
            </div>
          </div>

        </div>
      </main>
    </div>
  );
}
