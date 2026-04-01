"use client";

import React from 'react';
import { formatCurrency, sortTransactionsByLatest } from '../utils/walletHelpers';

/**
 * Renders wallet transactions latest first.
 * @param {{ transactions?: Array<{ amount: number, type: 'credit'|'debit', createdAt: string, status: 'success'|'failed'|'pending' }> }} props
 * @returns {JSX.Element}
 */
export function TransactionList({ transactions = [] }) {
  const sorted = sortTransactionsByLatest(transactions);

  return (
    <div className="rounded-2xl border border-[#e4ded2] bg-white p-5 shadow-sm">
      <h3 className="text-lg font-semibold text-[#1a1a1a]">Transactions</h3>

      {sorted.length === 0 ? (
        <p className="mt-3 text-sm text-[#5a5a5a]">No transactions yet.</p>
      ) : (
        <ul className="mt-3 space-y-3">
          {sorted.map((tx, idx) => (
            <li key={`${tx.createdAt}-${idx}`} className="flex items-center justify-between rounded-xl border border-[#f0ede9] p-3">
              <div>
                <p className="text-sm font-medium text-[#1a1a1a]">
                  {tx.type === 'credit' ? 'Credit' : 'Debit'} • {tx.status}
                </p>
                <p className="text-xs text-[#777]">
                  {new Date(tx.createdAt).toLocaleString()}
                </p>
              </div>
              <p className={`text-sm font-semibold ${tx.type === 'credit' ? 'text-emerald-600' : 'text-[#f95c4b]'}`}>
                {tx.type === 'credit' ? '+' : '-'}{formatCurrency(tx.amount)}
              </p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
