"use client";

import { useMemo, useState } from 'react';
import toast from 'react-hot-toast';
import { useSubscription } from '../hooks/useSubscription';
import CurrentPlanBanner from './CurrentPlanBanner';
import PlanCardGrid from './PlanCardGrid';
import UpgradeConfirmModal from './UpgradeConfirmModal';
import EnterpriseFormModal from './EnterpriseFormModal';

export default function SubscriptionPage() {
  const { subscription, loading, error, upgradeToPro, cancelPro, refresh } = useSubscription();
  const [showUpgradeModal, setShowUpgradeModal] = useState(false);
  const [showEnterpriseModal, setShowEnterpriseModal] = useState(false);

  const currentPlan = useMemo(() => subscription?.plan || 'free', [subscription?.plan]);

  const onSelectPlan = (plan) => {
    if (plan === 'free') {
      toast('You are on Free plan');
      return;
    }
    if (plan === 'pro') {
      setShowUpgradeModal(true);
      return;
    }
    setShowEnterpriseModal(true);
  };

  if (loading) {
    return <div className="p-6 text-sm text-slate-500">Loading subscription...</div>;
  }

  return (
    <div className="p-6 md:p-8 space-y-6 bg-slate-100 min-h-full">
      <div>
        <h1 className="text-2xl font-bold text-slate-900">Subscription</h1>
        <p className="text-sm text-slate-600 mt-1">Manage your CreatorHub plan.</p>
      </div>

      <CurrentPlanBanner subscription={subscription} onCancelPro={currentPlan === 'pro' ? cancelPro : undefined} />

      {error ? <p className="text-sm text-red-600">{error}</p> : null}

      <div>
        <h2 className="text-lg font-semibold text-slate-900">Choose a Plan</h2>
        <p className="text-sm text-slate-600 mt-1">Upgrade or change your plan at any time.</p>
      </div>

      <PlanCardGrid currentSubscription={subscription} onSelectPlan={onSelectPlan} />

      <p className="text-xs text-slate-500">
        Platform fees are deducted automatically from each transaction on your content.
      </p>

      {showUpgradeModal ? (
        <UpgradeConfirmModal
          plan="pro"
          onConfirm={async () => {
            await upgradeToPro();
            setShowUpgradeModal(false);
          }}
          onCancel={() => setShowUpgradeModal(false)}
        />
      ) : null}

      {showEnterpriseModal ? (
        <EnterpriseFormModal
          onSuccess={async () => {
            await refresh();
            setShowEnterpriseModal(false);
          }}
          onClose={() => setShowEnterpriseModal(false)}
        />
      ) : null}
    </div>
  );
}
