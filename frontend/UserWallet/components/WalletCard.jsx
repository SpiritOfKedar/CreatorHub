"use client";

import React from 'react';
import { formatCurrency } from '../utils/walletHelpers';

/**
 * Displays current wallet balance.
 * @param {{ balance: number, loading?: boolean, onAddFundsClick?: () => void }} props
 * @returns {JSX.Element}
 */
export function WalletCard({ balance, loading = false, onAddFundsClick }) {
  return (
    <div className="rounded-2xl border border-[#e4ded2] bg-white p-5 shadow-sm">
      <p className="text-sm text-[#5a5a5a]">Current Balance</p>
      <h3 className="mt-1 text-3xl font-semibold text-[#1a1a1a]">
        {loading ? 'Loading...' : formatCurrency(balance)}
      </h3>

      <button
        type="button"
        onClick={onAddFundsClick}
        disabled={loading}
        className="mt-4 rounded-full bg-[#f95c4b] px-5 py-2 text-sm font-medium text-white disabled:opacity-60"
      >
        {loading ? 'Please wait...' : 'Add Funds'}
      </button>
    </div>
  );
}
