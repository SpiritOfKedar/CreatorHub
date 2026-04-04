"use client";

import { Edit2, Eye, Trash2 } from 'lucide-react';
import RoleBadge from './RoleBadge';

const helpers = require('../utils/adminHelpers');

/**
 * @param {{
 * admin: any,
 * currentAdminId?: string,
 * currentAdminRole?: string,
 * onView: (id: string) => void,
 * onEdit: (id: string) => void,
 * onDelete: (admin: any) => void
 * }} props
 */
export default function AdminTableRow({ admin, currentAdminId, currentAdminRole, onView, onEdit, onDelete }) {
  const isSelf = String(admin._id) === String(currentAdminId);
  const restricted = admin.role === 'super_admin' && currentAdminRole !== 'super_admin';

  return (
    <tr className="border-t border-slate-100 hover:bg-slate-50">
      <td className="px-6 py-4">
        <div className="flex items-center gap-3">
          <div
            className="flex h-10 w-10 items-center justify-center rounded-full text-xs font-bold text-white"
            style={{ background: admin.avatarColor }}
          >
            {admin.avatarInitials || helpers.getInitials(admin.name)}
          </div>
          <div>
            <p className="text-sm font-bold text-slate-900">
              {admin.name} {isSelf ? <span className="text-xs font-semibold text-slate-500">(You)</span> : null}
            </p>
            <p className="text-xs text-slate-500">{admin.email}</p>
          </div>
        </div>
      </td>
      <td className="px-6 py-4"><RoleBadge role={admin.role} /></td>
      <td className="px-6 py-4">
        <div className="inline-flex items-center gap-2 text-sm font-semibold text-slate-700">
          <span className={`h-2 w-2 rounded-full ${admin.status === 'active' ? 'bg-emerald-500' : 'bg-slate-400'}`} />
          {admin.status === 'active' ? 'Active' : 'Inactive'}
        </div>
      </td>
      <td className="px-6 py-4 text-sm text-slate-600">{helpers.formatLastActive(admin.lastActiveAt)}</td>
      <td className="px-6 py-4 text-sm text-slate-600">{helpers.formatAddedOn(admin.createdAt)}</td>
      <td className="px-6 py-4">
        <div className="flex items-center justify-end gap-2">
          <button
            onClick={() => onView(admin._id)}
            disabled={restricted}
            className="rounded-md border border-slate-200 p-2 text-slate-500 hover:text-slate-900 disabled:opacity-40"
          >
            <Eye className="h-4 w-4" />
          </button>
          <button
            onClick={() => onEdit(admin._id)}
            disabled={restricted}
            className="rounded-md border border-slate-200 p-2 text-slate-500 hover:text-slate-900 disabled:opacity-40"
          >
            <Edit2 className="h-4 w-4" />
          </button>
          <button
            onClick={() => onDelete(admin)}
            disabled={restricted || isSelf}
            className="rounded-md border border-slate-200 p-2 text-slate-500 hover:text-red-600 disabled:opacity-40"
          >
            <Trash2 className="h-4 w-4" />
          </button>
        </div>
      </td>
    </tr>
  );
}
