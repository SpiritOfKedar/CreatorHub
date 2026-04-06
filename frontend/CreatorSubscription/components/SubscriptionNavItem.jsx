"use client";

import Link from 'next/link';
import { Sparkles } from 'lucide-react';
import * as subscriptionHelpers from '../utils/subscriptionHelpers';

export default function SubscriptionNavItem({ currentPlan, status, className }) {
  const badge = subscriptionHelpers.getPlanBadgeLabel(currentPlan, status);

  return (
    <Link href="/creator/subscription" className={className}>
      <span className="flex items-center gap-4">
        <Sparkles className="w-5 h-5 stroke-[1.5]" /> Subscription
      </span>
      {badge ? (
        <span className={`ml-auto px-2 py-0.5 rounded-full text-[10px] font-bold tracking-wide ${badge === 'PENDING' ? 'bg-amber-100 text-amber-700' : 'bg-slate-200 text-slate-700'}`}>
          {badge}
        </span>
      ) : null}
    </Link>
  );
}
