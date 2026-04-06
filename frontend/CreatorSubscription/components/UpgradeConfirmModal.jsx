"use client";

export default function UpgradeConfirmModal({ plan, onConfirm, onCancel, loading = false }) {
  if (!plan) return null;

  return (
    <div className="fixed inset-0 z-[140] flex items-center justify-center bg-slate-900/40 p-4">
      <div className="w-full max-w-lg rounded-2xl bg-white border border-slate-200 p-6">
        <div className="flex items-center justify-between">
          <h3 className="text-xl font-semibold text-slate-900">Upgrade to Pro</h3>
          <button type="button" onClick={onCancel} className="text-slate-500 hover:text-slate-700">✕</button>
        </div>
        <div className="my-4 h-px bg-slate-200" />
        <p className="text-sm text-slate-600">You will be charged ₹499/month.</p>
        <p className="text-sm text-slate-600 mt-1">Your platform fee drops from 15% → 8% immediately.</p>

        <div className="mt-6 flex justify-end gap-3">
          <button type="button" onClick={onCancel} className="rounded-lg border border-slate-300 px-4 py-2 text-sm font-semibold text-slate-700">
            Cancel
          </button>
          <button type="button" onClick={onConfirm} disabled={loading} className="rounded-lg bg-slate-900 px-4 py-2 text-sm font-semibold text-white disabled:opacity-60">
            {loading ? 'Upgrading...' : 'Confirm & Upgrade →'}
          </button>
        </div>
      </div>
    </div>
  );
}
