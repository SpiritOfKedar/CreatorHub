import React from 'react';
import DashboardSidebar from '@/src/components/UserDashboard/DashboardSidebar';
import BalanceCard from '@/src/components/UserDashboard/Wallet/BalanceCard';
import TransactionList from '@/src/components/UserDashboard/Wallet/TransactionList';
import { Transaction } from '@/src/components/UserDashboard/Wallet/TransactionItem';

// Mock data matching the Figma 466:94327 design specs
const MOCK_TRANSACTIONS: Transaction[] = [
  ...Array.from({ length: 6 }).map((_, i) => ({
    id: `tx-${i}`,
    title: 'Enrolled for this new even by creator name',
    date: '23 Jan, 2025',
    time: '3 : 25 pm',
    amount: 1500,
    image: '/assets/wallet/event-thumb.png',
    type: 'purchase' as 'purchase',
  }))
];

export default function WalletPage() {
  return (
    <div className="min-h-screen bg-[var(--bg,#f6f4f1)] flex relative overflow-x-hidden">
      <DashboardSidebar />
      
      {/* Main Content Area - Padded left to account for sidebar */}
      <main className="flex-1 ml-[240px] pl-[42px] pr-[42px] pt-[42px] pb-[60px] flex flex-col items-start min-h-screen">
        
        {/* Header Area */}
        <div className="flex flex-col gap-[4px] mb-[42px] mt-1 relative">
          <h1 className="font-[family-name:var(--font-fjalla)] font-normal text-[40px] text-[var(--heading,#1a1a1a)] tracking-[0.8px] leading-[57.6px]">
            My wallet
          </h1>
          <p className="font-[family-name:var(--font-fjalla)] font-normal text-[33px] text-[var(--sub-head,#3a3a3a)] tracking-[0.66px] leading-[48.6px]">
            Add, use, and track your credits for quick and seamless purchases.
          </p>
        </div>

        {/* Balance Card */}
        <BalanceCard balance={4500} />

        {/* Transactions Section */}
        <TransactionList transactions={MOCK_TRANSACTIONS} />

      </main>
    </div>
  );
}
