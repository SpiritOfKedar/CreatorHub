"use client";

/**
 * @param {{ open: boolean, admin: any, onClose: () => void, onConfirm: () => void, loading?: boolean }} props
 */
export default function ConfirmDeleteModal({ open, admin, onClose, onConfirm, loading }) {
  if (!open || !admin) return null;

  return (
    <div className="fixed inset-0 z-[240] flex items-center justify-center bg-black/40 p-4">
      <div className="w-full max-w-md rounded-2xl bg-white p-6 shadow-2xl">
        <h3 className="text-lg font-bold text-slate-900">Remove {admin.name}?</h3>
        <p className="mt-2 text-sm text-slate-600">
          This will revoke their access to CreatorHub admin panel immediately.
        </p>

        <div className="mt-6 flex items-center justify-end gap-3">
          <button onClick={onClose} className="rounded-xl border border-slate-300 px-4 py-2 text-sm font-semibold">Cancel</button>
          <button onClick={onConfirm} disabled={loading} className="rounded-xl bg-red-600 px-4 py-2 text-sm font-semibold text-white disabled:opacity-50">
            {loading ? 'Removing...' : 'Remove Admin'}
          </button>
        </div>
      </div>
    </div>
  );
}
