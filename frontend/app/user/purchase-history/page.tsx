import DashboardSidebar from '@/src/components/UserDashboard/DashboardSidebar';
import PurchaseHistoryContent from '@/src/components/UserDashboard/PurchaseHistory/PurchaseHistoryContent';

export default function PurchaseHistoryPage() {
  return (
    <div className="min-h-screen bg-[var(--bg,#f6f4f1)] flex">
      <DashboardSidebar />
      <main className="flex-1 ml-[240px] min-h-screen overflow-y-auto">
        <PurchaseHistoryContent />
      </main>
    </div>
  );
}
