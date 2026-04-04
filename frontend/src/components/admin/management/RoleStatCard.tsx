'use client';

import React from 'react';
import { DollarSign, HelpCircle, Shield, ShieldCheck } from 'lucide-react';

interface LegacyStat {
	role: string;
	count: number;
	description: string;
	iconName?: string;
}

const pickIcon = (iconName?: string) => {
	switch (iconName) {
		case 'ShieldCheck':
			return <ShieldCheck className="h-5 w-5 text-slate-600" />;
		case 'HelpCircle':
			return <HelpCircle className="h-5 w-5 text-slate-600" />;
		case 'DollarSign':
			return <DollarSign className="h-5 w-5 text-slate-600" />;
		default:
			return <Shield className="h-5 w-5 text-slate-600" />;
	}
};

export function RoleStatCard({ stat }: { stat: LegacyStat }) {
	return (
		<div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
			<div className="mb-6 flex items-center justify-between">
				<div className="flex h-10 w-10 items-center justify-center rounded-xl bg-slate-100">{pickIcon(stat.iconName)}</div>
				<span className="text-3xl font-bold text-slate-900">{stat.count || 0}</span>
			</div>
			<h4 className="text-sm font-bold text-slate-900">{stat.role}</h4>
			<p className="mt-1 text-xs text-slate-500">{stat.description}</p>
		</div>
	);
}
