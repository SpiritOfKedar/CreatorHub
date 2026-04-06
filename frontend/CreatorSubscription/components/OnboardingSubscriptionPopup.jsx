"use client";

import { useState } from 'react';
import PlanCardGrid from './PlanCardGrid';
import UpgradeConfirmModal from './UpgradeConfirmModal';
import EnterpriseFormModal from './EnterpriseFormModal';

export default function OnboardingSubscriptionPopup({
  isExistingCreator,
  subscription,
  onSkip,
  onActivateFree,
  onActivatePro,
  onEnterpriseSubmitted,
}) {
  const [showUpgradeModal, setShowUpgradeModal] = useState(false);
  const [showEnterpriseModal, setShowEnterpriseModal] = useState(false);
  const [loading, setLoading] = useState(false);

  const heading = isExistingCreator ? 'Choose Your Plan' : 'Welcome to CreatorHub 👋';
  const subtext = isExistingCreator
    ? "We've added subscription plans to CreatorHub. You're currently on the Free plan — upgrade anytime to unlock lower platform fees."
    : 'Choose a plan to get started. You can always change this later.';
  const skipText = isExistingCreator ? 'Keep Free Plan' : 'Skip for now → Free plan';

  const onSelectPlan = (plan) => {
    if (plan === 'free') {
      onActivateFree();
      return;
    }
    if (plan === 'pro') {
      setShowUpgradeModal(true);
      return;
    }
    setShowEnterpriseModal(true);
  };

  const confirmPro = async () => {
    setLoading(true);
    await onActivatePro();
    setLoading(false);
    setShowUpgradeModal(false);
  };

  const enterpriseSuccess = async () => {
    await onEnterpriseSubmitted();
    setShowEnterpriseModal(false);
  };

  return (
    <div className="fixed inset-0 z-[120] bg-slate-900/50 p-4 overflow-y-auto">
      <div className="max-w-6xl mx-auto mt-8 bg-slate-100 rounded-3xl border border-slate-200 p-6 md:p-8">
        <h2 className="text-2xl font-bold text-slate-900">{heading}</h2>
        <p className="text-sm text-slate-600 mt-2 max-w-3xl">{subtext}</p>

        <div className="mt-6">
          <PlanCardGrid currentSubscription={subscription} onSelectPlan={onSelectPlan} disabled={loading} />
        </div>

        <div className="mt-5 text-center">
          <button type="button" onClick={onSkip} className="text-sm font-semibold text-slate-600 hover:text-slate-800 underline underline-offset-2">
            {skipText}
          </button>
        </div>
      </div>

      {showUpgradeModal ? (
        <UpgradeConfirmModal plan="pro" onConfirm={confirmPro} onCancel={() => setShowUpgradeModal(false)} loading={loading} />
      ) : null}

      {showEnterpriseModal ? (
        <EnterpriseFormModal onSuccess={enterpriseSuccess} onClose={() => setShowEnterpriseModal(false)} />
      ) : null}
    </div>
  );
}
