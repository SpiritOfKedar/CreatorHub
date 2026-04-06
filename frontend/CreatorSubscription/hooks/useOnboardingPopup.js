"use client";

import { useEffect, useState } from 'react';
import api from '@/src/lib/api';

export function useOnboardingPopup(enabled = true) {
  const [showPopup, setShowPopup] = useState(false);
  const [isExistingCreator, setIsExistingCreator] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!enabled) {
      setLoading(false);
      setShowPopup(false);
      return;
    }

    let active = true;

    const run = async () => {
      setLoading(true);
      try {
        const res = await api.get('/creator/subscription/onboarding-status');
        if (!active) return;
        setShowPopup(Boolean(res.data?.showOnboarding));
        setIsExistingCreator(Boolean(res.data?.isExistingCreator));
      } catch (_err) {
        if (active) setShowPopup(false);
      } finally {
        if (active) setLoading(false);
      }
    };

    run();
    return () => {
      active = false;
    };
  }, [enabled]);

  const dismissPopup = async () => {
    try {
      await api.post('/creator/subscription/free');
    } catch (_err) {
      // non-blocking
    }
    setShowPopup(false);
  };

  return {
    showPopup,
    isExistingCreator,
    loading,
    dismissPopup,
    setShowPopup,
  };
}
