"use client";

import { useState } from 'react';
import api from '@/src/lib/api';

/**
 * Add admin form submission state.
 */
export function useAddAdmin() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [fieldErrors, setFieldErrors] = useState({});
  const [success, setSuccess] = useState(false);

  const submitAdmin = async (payload) => {
    setLoading(true);
    setError('');
    setSuccess(false);
    setFieldErrors({});

    try {
      await api.post('/admin-management', payload);
      setSuccess(true);
      return { ok: true };
    } catch (err) {
      const message = err?.response?.data?.message || 'Failed to create admin';
      setError(message);

      if (message.toLowerCase().includes('username')) {
        setFieldErrors({ username: message });
      }

      return { ok: false, message };
    } finally {
      setLoading(false);
    }
  };

  const reset = () => {
    setLoading(false);
    setError('');
    setFieldErrors({});
    setSuccess(false);
  };

  return {
    loading,
    error,
    fieldErrors,
    success,
    submitAdmin,
    reset,
  };
}
