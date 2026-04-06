"use client";

import PlanCard from './PlanCard';
import * as constants from '../utils/subscriptionConstants';
import * as subscriptionHelpers from '../utils/subscriptionHelpers';

export default function PlanCardGrid({ currentSubscription, onSelectPlan, disabled = false }) {
  const currentPlan = currentSubscription?.plan || 'free';
  const currentStatus = currentSubscription?.status || 'active';

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      {constants.PLAN_ORDER.map((id) => {
        const plan = constants.PLANS[id];
        const isCurrentPlan = currentPlan === id;
        return (
          <PlanCard
            key={id}
            plan={plan}
            isCurrentPlan={isCurrentPlan}
            currentStatus={currentStatus}
            onSelect={() => onSelectPlan(id)}
            disabled={disabled}
            periodEndLabel={subscriptionHelpers.formatPeriodEnd(currentSubscription?.currentPeriodEnd)}
          />
        );
      })}
    </div>
  );
}
