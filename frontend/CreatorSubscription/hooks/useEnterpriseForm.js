"use client";

import { useState } from 'react';
import { z } from 'zod';
import api from '@/src/lib/api';
import toast from 'react-hot-toast';

const enterpriseSchema = z.object({
  agencyName: z.string().trim().min(2).max(100),
  gstin: z.string().trim().regex(/^[0-9]{2}[A-Z]{5}[0-9]{4}[A-Z]{1}[1-9A-Z]{1}Z[0-9A-Z]{1}$/, 'Enter a valid 15-character GSTIN'),
  address: z.string().trim().min(10).max(300),
  email: z.string().trim().email(),
  managerName: z.string().trim().min(2).max(60),
  phone: z.string().trim().regex(/^[6-9]\d{9}$/, 'Enter a valid 10-digit Indian mobile number'),
});

export function useEnterpriseForm(onSuccess) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [fieldErrors, setFieldErrors] = useState({});
  const [success, setSuccess] = useState(false);

  const submitEnterpriseForm = async (formData) => {
    setLoading(true);
    setError('');
    setFieldErrors({});
    setSuccess(false);

    const parsed = enterpriseSchema.safeParse(formData);
    if (!parsed.success) {
      const next = {};
      parsed.error.issues.forEach((issue) => {
        const key = issue.path?.[0];
        if (typeof key === 'string' && !next[key]) next[key] = issue.message;
      });
      setFieldErrors(next);
      setLoading(false);
      return;
    }

    try {
      await api.post('/creator/subscription/enterprise', parsed.data);
      setSuccess(true);
      toast.success('Enterprise request submitted');
      if (onSuccess) onSuccess();
    } catch (err) {
      const message = err?.response?.data?.message || 'Failed to submit enterprise request';
      setError(message);
      toast.error(message);
    } finally {
      setLoading(false);
    }
  };

  const reset = () => {
    setError('');
    setFieldErrors({});
    setSuccess(false);
  };

  return {
    loading,
    error,
    fieldErrors,
    success,
    submitEnterpriseForm,
    reset,
  };
}
