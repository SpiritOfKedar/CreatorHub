"use client";

import { Check } from 'lucide-react';

export default function PlanCard({ plan, isCurrentPlan, currentStatus, onSelect, disabled, periodEndLabel }) {
  const ctaLabel = (() => {
    if (isCurrentPlan && currentStatus === 'active') return 'Current Plan';
    if (isCurrentPlan && currentStatus === 'pending') return 'Pending Approval';
    if (isCurrentPlan && currentStatus === 'cancelled') return `Cancels on ${periodEndLabel || '—'}`;
    return plan.ctaUpgrade;
  })();

  const filled = isCurrentPlan || plan.recommended;

  return (
    <div className={`relative rounded-2xl border border-slate-200 bg-white p-8 ${plan.recommended && !isCurrentPlan ? 'shadow-xl -translate-y-2' : 'shadow-sm'} ${isCurrentPlan ? 'ring-2 ring-slate-900' : ''}`}>
      {plan.recommended && !isCurrentPlan ? (
        <div className="absolute -top-6 left-1/2 -translate-x-1/2 rounded-full bg-slate-900 text-white px-6 py-2 text-sm font-semibold">
          Recommended
        </div>
      ) : null}

      <p className="text-sm font-semibold tracking-wide text-slate-500 uppercase">{plan.tagline}</p>
      <h3 className="mt-5 text-5xl font-bold text-slate-900">{plan.label}</h3>
      <div className="mt-6 flex items-end gap-2">
        <p className="text-7xl leading-none font-extrabold text-slate-900">{plan.priceLabel}</p>
        <p className="text-4xl font-semibold text-slate-500">{plan.period}</p>
      </div>

      <ul className="mt-8 space-y-4">
        {plan.features.map((feature) => (
          <li key={feature} className="flex items-center gap-3 text-3xl text-slate-600">
            <Check className="w-6 h-6 text-slate-500" />
            <span>{feature}</span>
          </li>
        ))}
      </ul>

      <button
        type="button"
        onClick={onSelect}
        disabled={disabled || isCurrentPlan}
        className={`mt-10 w-full rounded-2xl py-4 text-3xl font-semibold border ${filled ? 'bg-slate-900 text-white border-slate-900' : 'bg-transparent text-slate-900 border-slate-300'} disabled:opacity-70`}
      >
        {ctaLabel}
      </button>
    </div>
  );
}
