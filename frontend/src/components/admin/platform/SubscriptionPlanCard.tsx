'use client';

import React from 'react';
import { Check } from 'lucide-react';

interface SubscriptionPlan {
  id: string;
  tierName: string;
  planName: string;
  price: number | string;
  frequency: string;
  features: string[];
  isRecommended: boolean;
}

interface Props {
  plan: SubscriptionPlan;
  delay?: number;
  onEdit?: () => void;
}

export function SubscriptionPlanCard({ plan, delay = 0, onEdit }: Props) {
  return (
    <div
      className="relative bg-white rounded-xl flex flex-col justify-between"
      style={{
        padding: '32px 24px 24px',
        boxShadow: plan.isRecommended ? '0 10px 25px rgba(0,0,0,0.08)' : '0 1px 3px rgba(0,0,0,0.06)',
        border: plan.isRecommended ? 'none' : '1px solid #F3F4F6',
        animation: `cardFadeUp 0.6s ease-out ${delay}ms both`,
        marginTop: plan.isRecommended ? 12 : 24, // Lift slightly to accommodate the badge, but keep visual balance
        marginBottom: plan.isRecommended ? 12 : 0,
      }}
    >
      {/* Absolute Recommended Badge */}
      {plan.isRecommended && (
        <div
          style={{
            position: 'absolute',
            top: -12,
            left: '50%',
            transform: 'translateX(-50%)',
            background: '#111827',
            color: 'white',
            fontSize: 10,
            fontWeight: 800,
            letterSpacing: '0.05em',
            padding: '6px 16px',
            borderRadius: 999,
          }}
        >
          Recommended
        </div>
      )}

      <div>
        <p style={{ fontSize: 11, fontWeight: 800, color: '#6B7280', letterSpacing: '0.05em', textTransform: 'uppercase', marginBottom: 12 }}>
          {plan.tierName}
        </p>
        <h3 style={{ fontSize: 24, fontWeight: 700, color: '#111827', marginBottom: 24 }}>
          {plan.planName}
        </h3>

        <div className="flex items-end gap-1 mb-6">
          <span style={{ fontSize: 32, fontWeight: 800, color: '#111827', lineHeight: 1 }}>
            {plan.price === 'Custom' ? 'Custom' : typeof plan.price === 'number' ? `₹${plan.price}` : plan.price}
          </span>
          {plan.frequency && (
            <span style={{ fontSize: 13, fontWeight: 600, color: '#6B7280', marginBottom: 4 }}>
              {plan.frequency}
            </span>
          )}
        </div>

        <ul className="space-y-4 mb-8">
          {plan.features.map((feature, i) => (
            <li key={i} className="flex items-start gap-3">
              <div style={{ marginTop: 2 }}>
                <Check size={14} color="#6B7280" />
              </div>
              <span style={{ fontSize: 13, fontWeight: 500, color: '#4B5563', lineHeight: 1.4 }}>
                {feature}
              </span>
            </li>
          ))}
        </ul>
      </div>

      <button
        onClick={onEdit}
        style={{
          width: '100%',
          padding: '12px 0',
          background: plan.isRecommended ? '#111827' : '#F9FAFB',
          color: plan.isRecommended ? 'white' : '#111827',
          border: plan.isRecommended ? 'none' : '1px solid #E5E7EB',
          borderRadius: 8,
          fontSize: 13,
          fontWeight: 700,
          cursor: 'pointer',
          transition: 'all 0.15s ease',
        }}
      >
        Edit
      </button>
    </div>
  );
}
