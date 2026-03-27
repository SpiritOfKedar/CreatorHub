import Image from 'next/image';
import DashboardSidebar from '@/src/components/UserDashboard/DashboardSidebar';
import ProfileBanner from '@/src/components/CreatorProfile/ProfileBanner';
import ProfileHeader from '@/src/components/CreatorProfile/ProfileHeader';
import ProfileActions from '@/src/components/CreatorProfile/ProfileActions';
import ConnectedLinks from '@/src/components/CreatorProfile/ConnectedLinks';
import ContentTabs from '@/src/components/CreatorProfile/ContentTabs';
import ProfileContentFeed from '@/src/components/CreatorProfile/ProfileContentFeed';

export default function CreatorProfilePage() {
  return (
    <div className="flex min-h-screen bg-[#f6f4f1] w-full">
      {/* Fixed Sidebar */}
      <DashboardSidebar />

      {/* Main Layout Area - Offset by Sidebar width */}
      <main className="flex-1 flex flex-col pl-[240px] relative w-full overflow-x-hidden">
        
        {/* Banner covers the top full width of the view */}
        <ProfileBanner />

        {/* Padding container for the overlapping avatar and rest of the content */}
        <div className="relative px-[42px] pt-[92px] pb-[64px] flex flex-col w-full max-w-[1400px]">
          
          {/* Overlapping Avatar */}
          <div className="absolute left-[42px] top-[-72px] rounded-[68px] w-[140px] h-[140px] border-4 border-[#f6f4f1] shadow-sm z-10 shrink-0 bg-white">
            <Image 
              src="/assets/creator/avatar.png" 
              alt="Andrea Nelson" 
              fill 
              className="object-cover rounded-[68px]" 
            />
          </div>

          <div className="flex flex-col items-start w-full relative">
            
            {/* Action Buttons floating top right */}
            <div className="absolute right-[42px] top-[-48px]">
              <ProfileActions />
            </div>

            {/* Main Content Stacked Vertically */}
            <div className="flex flex-col gap-[24px] items-start w-full mt-[16px]">
              
              <div className="flex flex-col gap-[24px] shrink-0 w-full max-w-[400px]">
                <ProfileHeader />
                <ConnectedLinks />
              </div>

              <div className="flex flex-col gap-[24px] items-start w-full mt-[24px]">
                <ContentTabs />
                <ProfileContentFeed />
              </div>
            </div>
            
          </div>
          
        </div>
      </main>
    </div>
  );
}
