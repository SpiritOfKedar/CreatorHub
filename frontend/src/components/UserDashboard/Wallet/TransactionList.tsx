"use client";

import React, { useState } from 'react';
import TransactionItem, { Transaction } from './TransactionItem';
import { FileText } from 'lucide-react';

interface TransactionListProps {
  transactions: Transaction[];
}

const TABS = ['All', 'Purchases', 'Credits Added', 'Refunds'];

export default function TransactionList({ transactions }: TransactionListProps) {
  const [activeTab, setActiveTab] = useState('All');

  const filteredTransactions = transactions.filter(t => {
    if (activeTab === 'All') return true;
    if (activeTab === 'Purchases') return t.type === 'purchase';
    if (activeTab === 'Credits Added') return t.type === 'credit';
    if (activeTab === 'Refunds') return t.type === 'refund';
    return true;
  });

  return (
    <div className="flex flex-col gap-[8px] items-start w-full max-w-[1116px]">
      <p className="font-[family-name:var(--font-figtree)] font-medium text-[16px] leading-[25.8px] tracking-[0.32px] text-[var(--sub-head,#3a3a3a)] mb-[8px]">
        View your transactions
      </p>

      {/* Tabs Row */}
      <div className="flex gap-[8px] items-start mb-[16px]">
        {TABS.map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`
              h-[40px] px-[12px] rounded-[32px] flex items-center justify-center border transition-colors shadow-[0px_1px_4px_0px_rgba(238,238,238,0.25)] bg-[#fcfaf7]
              ${activeTab === tab 
                ? 'border-[var(--cta,#f95c4b)]' 
                : 'border-[var(--alt-sec,#e4ded2)] hover:border-[#d2d8e3]'
              }
            `}
          >
            <span className={`
              font-[family-name:var(--font-figtree)] font-medium text-[13px] leading-[18.3px] tracking-[0.26px]
              ${activeTab === tab ? 'text-[var(--cta,#f95c4b)]' : 'text-[var(--sub-head,#3a3a3a)]'}
            `}>
              {tab}
            </span>
          </button>
        ))}
      </div>

      {/* Transactions List */}
      <div className="flex flex-col gap-[4px] w-full">
        {filteredTransactions.length > 0 ? (
          filteredTransactions.map((tx) => (
            <TransactionItem key={tx.id} transaction={tx} />
          ))
        ) : (
          <div className="flex flex-col items-center justify-center p-12 text-center rounded-[8px] border border-dashed border-[#d2d8e3] bg-transparent mt-4">
            <FileText className="size-8 text-[#aaa] mb-4" />
            <p className="font-[family-name:var(--font-figtree)] font-medium text-[16px] text-[#5a5a5a]">
              No transactions found
            </p>
            <p className="font-[family-name:var(--font-figtree)] text-[14px] text-[#9a9a9a] max-w-sm mt-2">
              You haven't made any {activeTab.toLowerCase()} yet.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
