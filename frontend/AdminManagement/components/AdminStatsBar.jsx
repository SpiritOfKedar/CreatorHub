"use client";

import { DollarSign, HelpCircle, Shield, ShieldCheck } from 'lucide-react';

const { ROLE_DESCRIPTIONS } = require('../utils/adminConstants');

const CARDS = [
  { key: 'super_admin', label: 'Super Admin', icon: Shield },
  { key: 'moderator', label: 'Moderator', icon: ShieldCheck },
  { key: 'support', label: 'Support', icon: HelpCircle },
  { key: 'finance', label: 'Finance', icon: DollarSign },
];

/**
 * @param {{ stats: {super_admin:number, moderator:number, support:number, finance:number} }} props
 */
export default function AdminStatsBar({ stats }) {
  return (
    <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
      {CARDS.map((card) => {
        const Icon = card.icon;
        return (
          <div key={card.key} className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
            <div className="mb-6 flex items-center justify-between">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-slate-100">
                <Icon className="h-5 w-5 text-slate-600" />
              </div>
              <span className="text-3xl font-bold text-slate-900">{stats?.[card.key] || 0}</span>
            </div>
            <h3 className="text-sm font-bold text-slate-900">{card.label}</h3>
            <p className="mt-1 text-xs text-slate-500">{ROLE_DESCRIPTIONS[card.key]}</p>
          </div>
        );
      })}
    </div>
  );
}
