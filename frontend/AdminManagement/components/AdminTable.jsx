"use client";

import AdminTableRow from './AdminTableRow';

/**
 * @param {{
 *  admins: any[],
 *  loading: boolean,
 *  currentAdminId?: string,
 *  currentAdminRole?: string,
 *  onView: (id: string) => void,
 *  onEdit: (id: string) => void,
 *  onDelete: (admin: any) => void,
 *  page: number,
 *  pages: number,
 *  onPrev: () => void,
 *  onNext: () => void,
 * }} props
 */
export default function AdminTable({
  admins,
  loading,
  currentAdminId,
  currentAdminRole,
  onView,
  onEdit,
  onDelete,
  page,
  pages,
  onPrev,
  onNext,
}) {
  return (
    <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
      <div className="overflow-x-auto">
        <table className="min-w-full">
          <thead className="bg-slate-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-bold uppercase text-slate-500">Admin</th>
              <th className="px-6 py-3 text-left text-xs font-bold uppercase text-slate-500">Role</th>
              <th className="px-6 py-3 text-left text-xs font-bold uppercase text-slate-500">Status</th>
              <th className="px-6 py-3 text-left text-xs font-bold uppercase text-slate-500">Last Active</th>
              <th className="px-6 py-3 text-left text-xs font-bold uppercase text-slate-500">Added On</th>
              <th className="px-6 py-3 text-right text-xs font-bold uppercase text-slate-500">Actions</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr><td className="px-6 py-8 text-sm text-slate-500" colSpan={6}>Loading admins...</td></tr>
            ) : admins.length === 0 ? (
              <tr><td className="px-6 py-8 text-sm text-slate-500" colSpan={6}>No admins found.</td></tr>
            ) : (
              admins.map((admin) => (
                <AdminTableRow
                  key={admin._id}
                  admin={admin}
                  currentAdminId={currentAdminId}
                  currentAdminRole={currentAdminRole}
                  onView={onView}
                  onEdit={onEdit}
                  onDelete={onDelete}
                />
              ))
            )}
          </tbody>
        </table>
      </div>

      <div className="flex items-center justify-between border-t border-slate-100 px-6 py-3 text-sm">
        <span className="text-slate-500">Page {page} of {pages}</span>
        <div className="flex gap-2">
          <button onClick={onPrev} disabled={page <= 1} className="rounded border border-slate-300 px-3 py-1 disabled:opacity-50">Prev</button>
          <button onClick={onNext} disabled={page >= pages} className="rounded border border-slate-300 px-3 py-1 disabled:opacity-50">Next</button>
        </div>
      </div>
    </div>
  );
}
