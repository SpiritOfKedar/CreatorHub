"use client";

import { useEffect, useState } from 'react';
import { X } from 'lucide-react';

/**
 * @param {{ open: boolean, admin: any, onClose: () => void, onSave: (updates:any) => void, loading?: boolean }} props
 */
export default function EditAdminModal({ open, admin, onClose, onSave, loading }) {
  const [form, setForm] = useState({ name: '', role: 'moderator', status: 'active' });

  useEffect(() => {
    if (admin) {
      setForm({
        name: admin.name || '',
        role: admin.role || 'moderator',
        status: admin.status || 'active',
      });
    }
  }, [admin]);

  if (!open || !admin) return null;

  const isSuperTarget = admin.role === 'super_admin';

  const submit = (e) => {
    e.preventDefault();
    onSave(form);
  };

  return (
    <div className="fixed inset-0 z-[220] flex items-center justify-center bg-black/40 p-4">
      <form onSubmit={submit} className="w-full max-w-xl rounded-2xl bg-white p-6 shadow-2xl">
        <div className="mb-5 flex items-center justify-between">
          <h3 className="text-xl font-bold text-slate-900">Edit Admin</h3>
          <button type="button" onClick={onClose} className="rounded p-1 text-slate-400 hover:text-slate-700"><X className="h-5 w-5" /></button>
        </div>

        <div className="space-y-4">
          <div>
            <label className="mb-1 block text-sm font-semibold">Name</label>
            <input className="w-full rounded-xl border border-slate-300 px-4 py-3" value={form.name} onChange={(e) => setForm((p) => ({ ...p, name: e.target.value }))} />
          </div>

          <div>
            <label className="mb-1 block text-sm font-semibold">Role</label>
            <select
              className="w-full rounded-xl border border-slate-300 px-4 py-3"
              value={form.role}
              disabled={isSuperTarget}
              onChange={(e) => setForm((p) => ({ ...p, role: e.target.value }))}
            >
              <option value="moderator">Moderator</option>
              <option value="support">Support</option>
              <option value="finance">Finance</option>
              {isSuperTarget ? <option value="super_admin">Super Admin</option> : null}
            </select>
          </div>

          <div>
            <label className="mb-1 block text-sm font-semibold">Status</label>
            <select className="w-full rounded-xl border border-slate-300 px-4 py-3" value={form.status} onChange={(e) => setForm((p) => ({ ...p, status: e.target.value }))}>
              <option value="active">Active</option>
              <option value="inactive">Inactive</option>
            </select>
          </div>
        </div>

        <div className="mt-6 flex items-center justify-end gap-3">
          <button type="button" onClick={onClose} className="rounded-xl border border-slate-300 px-4 py-2 text-sm font-semibold">Cancel</button>
          <button disabled={loading} className="rounded-xl bg-slate-900 px-4 py-2 text-sm font-semibold text-white disabled:opacity-50">
            {loading ? 'Saving...' : 'Save Changes'}
          </button>
        </div>
      </form>
    </div>
  );
}
