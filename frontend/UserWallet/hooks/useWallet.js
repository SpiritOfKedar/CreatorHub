"use client";

import { useCallback, useEffect, useState } from 'react';
import {
  sortTransactionsByLatest,
  validateDeductAmount,
  validateTopUpAmount
} from '../utils/walletHelpers';

/**
 * Wallet hook for balance + transactions state and wallet actions.
 * @returns {{
 *  balance: number,
 *  transactions: Array,
 *  loading: boolean,
 *  error: string,
 *  addFunds: (amount: number) => Promise<{success: boolean, message?: string}>,
 *  deductFunds: (amount: number, contentId?: string) => Promise<{success: boolean, message?: string}>,
 *  refreshBalance: () => Promise<void>
 * }}
 */
export function useWallet() {
  const [balance, setBalance] = useState(0);
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const getAuthHeaders = useCallback(() => {
    const token = typeof window !== 'undefined' ? localStorage.getItem('token') : null;
    return token ? { Authorization: `Bearer ${token}` } : {};
  }, []);

  const parseResponse = async (res, fallbackMessage) => {
    const contentType = res.headers.get('content-type') || '';

    if (contentType.includes('application/json')) {
      const json = await res.json();
      return {
        data: json,
        message: json?.message || fallbackMessage
      };
    }

    const text = await res.text();
    return {
      data: null,
      message: text?.trim() || fallbackMessage
    };
  };

  /**
   * Loads latest wallet balance and transactions.
   */
  const refreshBalance = useCallback(async () => {
    setLoading(true);
    setError('');

    try {
      const res = await fetch('/api/wallet/balance', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          ...getAuthHeaders()
        }
      });

      const { data, message } = await parseResponse(res, 'Failed to fetch wallet balance.');

      if (!res.ok) {
        throw new Error(message);
      }

      setBalance(Number(data?.balance) || 0);
      setTransactions(sortTransactionsByLatest(data?.transactions || []));
    } catch (err) {
      setError(err?.message || 'Failed to fetch wallet balance.');
    } finally {
      setLoading(false);
    }
  }, [getAuthHeaders]);

  useEffect(() => {
    void refreshBalance();
  }, [refreshBalance]);

  /**
   * Adds funds to wallet.
   * @param {number} amount
   * @returns {Promise<{success: boolean, message?: string}>}
   */
  const addFunds = useCallback(async (amount) => {
    const parsedAmount = Number(amount);
    const validation = validateTopUpAmount(parsedAmount);

    if (!validation.valid) {
      setError(validation.message);
      return { success: false, message: validation.message };
    }

    setLoading(true);
    setError('');

    try {
      const res = await fetch('/api/wallet/add-funds', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          ...getAuthHeaders()
        },
        body: JSON.stringify({ amount: parsedAmount })
      });

      const { data, message } = await parseResponse(res, 'Failed to add funds.');

      if (!res.ok) {
        throw new Error(message);
      }

      setBalance(Number(data?.balance) || 0);
      await refreshBalance();
      return { success: true };
    } catch (err) {
      const message = err?.message || 'Failed to add funds.';
      setError(message);
      return { success: false, message };
    } finally {
      setLoading(false);
    }
  }, [getAuthHeaders, refreshBalance]);

  /**
   * Deducts funds from wallet for premium unlock.
   * @param {number} amount
   * @param {string} contentId
   * @returns {Promise<{success: boolean, message?: string}>}
   */
  const deductFunds = useCallback(async (amount, contentId) => {
    const parsedAmount = Number(amount);
    const validation = validateDeductAmount(parsedAmount);

    if (!validation.valid) {
      setError(validation.message);
      return { success: false, message: validation.message };
    }

    setLoading(true);
    setError('');

    try {
      const res = await fetch('/api/wallet/deduct-funds', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          ...getAuthHeaders()
        },
        body: JSON.stringify({ amount: parsedAmount, contentId })
      });

      const { data, message } = await parseResponse(res, 'Failed to unlock content.');

      if (!res.ok) {
        throw new Error(message);
      }

      setBalance(Number(data?.balance) || 0);
      await refreshBalance();
      return { success: true };
    } catch (err) {
      const message = err?.message || 'Failed to unlock content.';
      setError(message);
      return { success: false, message };
    } finally {
      setLoading(false);
    }
  }, [getAuthHeaders, refreshBalance]);

  return {
    balance,
    transactions,
    loading,
    error,
    addFunds,
    deductFunds,
    refreshBalance
  };
}
