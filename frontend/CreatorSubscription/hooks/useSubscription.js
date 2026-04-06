"use client";

import { useCallback, useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import api from '@/src/lib/api';

export function useSubscription() {
  const [subscription, setSubscription] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const refresh = useCallback(async () => {
    setLoading(true);
    setError('');
    try {
      const res = await api.get('/creator/subscription');
      setSubscription(res.data?.subscription || null);
      return res.data?.subscription || null;
    } catch (err) {
      const msg = err?.response?.data?.message || 'Failed to load subscription';
      setError(msg);
      return null;
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    refresh();
  }, [refresh]);

  const upgradeToPro = useCallback(async () => {
    try {
      await api.post('/creator/subscription/pro');
      toast.success('Pro plan activated');
      await refresh();
    } catch (err) {
      toast.error(err?.response?.data?.message || 'Unable to activate Pro plan');
    }
  }, [refresh]);

  const cancelPro = useCallback(async () => {
    try {
      await api.delete('/creator/subscription/pro');
      toast.success('Pro cancellation scheduled');
      await refresh();
    } catch (err) {
      toast.error(err?.response?.data?.message || 'Unable to cancel Pro plan');
    }
  }, [refresh]);

  return {
    subscription,
    loading,
    error,
    upgradeToPro,
    cancelPro,
    refresh,
  };
}
