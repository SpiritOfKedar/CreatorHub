import DashboardSidebar from '@/src/components/UserDashboard/DashboardSidebar';
import HelpSupportContent from '@/src/components/UserDashboard/HelpSupportContent';

export default function HelpPage() {
  return (
    <div className="min-h-screen bg-[var(--bg,#f6f4f1)] flex">
      <DashboardSidebar />
      <main className="flex-1 ml-[240px] min-h-screen overflow-y-auto">
        <HelpSupportContent />
      </main>
    </div>
  );
}
