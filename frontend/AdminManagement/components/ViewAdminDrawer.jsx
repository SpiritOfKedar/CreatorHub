"use client";

import { X } from 'lucide-react';
import RoleBadge from './RoleBadge';

const helpers = require('../utils/adminHelpers');

/**
 * @param {{ open: boolean, admin: any, onClose: () => void }} props
 */
export default function ViewAdminDrawer({ open, admin, onClose }) {
  if (!open || !admin) return null;

  return (
    <div className="fixed inset-0 z-[230]">
      <div className="absolute inset-0 bg-black/30" onClick={onClose} />
      <div className="absolute right-0 top-0 h-full w-full max-w-md bg-white p-6 shadow-2xl">
        <div className="mb-6 flex items-center justify-between">
          <h3 className="text-xl font-bold text-slate-900">Admin Details</h3>
          <button onClick={onClose} className="rounded p-1 text-slate-400 hover:text-slate-700"><X className="h-5 w-5" /></button>
        </div>

        <div className="space-y-5 text-sm">
          <div className="flex items-center gap-3">
            <div className="flex h-12 w-12 items-center justify-center rounded-full text-sm font-bold text-white" style={{ background: admin.avatarColor }}>
              {admin.avatarInitials || helpers.getInitials(admin.name)}
            </div>
            <div>
              <p className="font-bold text-slate-900">{admin.name}</p>
              <p className="text-slate-500">{admin.email}</p>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <Info label="Username" value={admin.username} />
            <Info label="Status" value={admin.status} />
            <div>
              <p className="mb-1 text-xs font-semibold uppercase tracking-wide text-slate-500">Role</p>
              <RoleBadge role={admin.role} />
            </div>
            <Info label="Last Active" value={helpers.formatLastActive(admin.lastActiveAt)} />
            <Info label="Added On" value={helpers.formatAddedOn(admin.createdAt)} />
            <Info label="Added By" value={admin.addedByName || 'System'} />
          </div>
        </div>
      </div>
    </div>
  );
}

function Info({ label, value }) {
  return (
    <div>
      <p className="mb-1 text-xs font-semibold uppercase tracking-wide text-slate-500">{label}</p>
      <p className="font-semibold text-slate-800">{value || '—'}</p>
    </div>
  );
}
