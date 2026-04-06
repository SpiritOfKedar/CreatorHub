"use client";

import * as subscriptionHelpers from '../utils/subscriptionHelpers';

export default function CurrentPlanBanner({ subscription, onCancelPro }) {
  const plan = subscription?.plan || 'free';
  const status = subscription?.status || 'active';

  let content = 'Free Plan · No expiry · 15% Platform Fee';
  if (plan === 'pro' && status === 'active') {
    content = `Pro Plan · Active until ${subscriptionHelpers.formatPeriodEnd(subscription?.currentPeriodEnd)} · 8% Platform Fee`;
  } else if (plan === 'pro' && status === 'cancelled') {
    content = `Pro Plan · Cancels on ${subscriptionHelpers.formatPeriodEnd(subscription?.currentPeriodEnd)} · 8% Platform Fee`;
  } else if (plan === 'premium' && status === 'pending') {
    content = 'Premium Plan · Pending admin approval';
  } else if (plan === 'premium' && status === 'active') {
    content = 'Premium Plan · Custom pricing · 5% Platform Fee';
  }

  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-4 flex items-center justify-between gap-3">
      <p className="text-sm font-medium text-slate-700">{content}</p>
      {plan === 'pro' && status === 'active' && onCancelPro ? (
        <button type="button" className="text-sm text-slate-500 hover:text-slate-700 underline" onClick={onCancelPro}>
          Cancel Plan
        </button>
      ) : null}
    </div>
  );
}
