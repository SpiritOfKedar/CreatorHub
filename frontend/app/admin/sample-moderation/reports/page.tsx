'use client';

import { useEffect, useState } from 'react';
import api from '@/src/lib/api';
import toast from 'react-hot-toast';

const BAN_OPTIONS = ['1w', '2w', '1m', 'permanent'];

type ReportRow = {
  _id: string;
  targetId?: string;
  targetType?: 'post' | 'user' | 'dm';
  reason?: string;
  status?: string;
  additionalReportersCount?: number;
};

type ReportDetail = ReportRow & {
  reporterComment?: string;
  targetContent?: {
    _id?: string;
    title?: string;
    description?: string;
  } | null;
};

export default function SampleModerationReportsPage() {
  const [status, setStatus] = useState('pending');
  const [reports, setReports] = useState<ReportRow[]>([]);
  const [selected, setSelected] = useState<ReportDetail | null>(null);
  const [reason, setReason] = useState('Policy violation');
  const [loading, setLoading] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const load = async () => {
    setLoading(true);
    try {
      const { data } = await api.get('/moderation/sample/reports', { params: { status, page: 1, limit: 50 } });
      setReports(Array.isArray(data?.items) ? data.items : []);
    } catch (error: any) {
      toast.error(error?.response?.data?.message || 'Failed to load reports queue');
      setReports([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    load();
  }, [status]);

  const openReport = async (id: string) => {
    try {
      const { data } = await api.get(`/moderation/sample/reports/${id}`);
      setSelected(data || null);
    } catch (error: any) {
      toast.error(error?.response?.data?.message || 'Failed to load report details');
      setSelected(null);
    }
  };

  const resolve = async (action: 'ban' | 'dismiss' | 'lock_post', duration?: string) => {
    if (!selected?._id) return;
    setSubmitting(true);
    try {
      await api.patch(`/moderation/admin/reports/${selected._id}/resolve`, {
        action,
        banDuration: duration,
        reason,
      });
      toast.success('Report action applied');
      setSelected(null);
      await load();
    } catch (error: any) {
      toast.error(error?.response?.data?.message || 'Failed to apply report action');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="p-6 space-y-6">
      <h1 className="text-2xl font-bold">Sample Moderation · Reports Queue</h1>

      <div className="flex gap-2 flex-wrap">
        {['pending', 'under_review', 'resolved', 'dismissed'].map((s) => (
          <button
            key={s}
            className={`px-3 py-2 rounded-lg ${status === s ? 'bg-slate-900 text-white' : 'bg-slate-100 text-slate-700'}`}
            onClick={() => setStatus(s)}
          >
            {s}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <div className="bg-white rounded-2xl border overflow-hidden">
          <table className="w-full text-sm">
            <thead className="bg-slate-50">
              <tr>
                <th className="p-3 text-left">Type</th>
                <th className="p-3 text-left">Reason</th>
                <th className="p-3 text-left">Status</th>
                <th className="p-3 text-left">Action</th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr><td className="p-3 text-slate-500" colSpan={4}>Loading reports...</td></tr>
              ) : reports.length === 0 ? (
                <tr><td className="p-3 text-slate-500" colSpan={4}>No reports found.</td></tr>
              ) : reports.map((row) => (
                <tr key={row._id} className="border-t">
                  <td className="p-3">{row.targetType}</td>
                  <td className="p-3">{row.reason}</td>
                  <td className="p-3">{row.status}</td>
                  <td className="p-3">
                    <button className="text-blue-600" onClick={() => openReport(row._id)}>Open</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="bg-white rounded-2xl border p-4">
          {selected ? (
            <>
              <h3 className="font-semibold">Report Detail</h3>
              <p className="text-sm mt-2">Reason: {selected.reason}</p>
              <p className="text-sm">Comment: {selected.reporterComment || 'N/A'}</p>
              <p className="text-sm">Additional reporters: {selected.additionalReportersCount || 0}</p>

              {selected.targetType === 'post' && selected.targetId ? (
                <div className="mt-3 flex flex-wrap gap-2">
                  <a
                    href={`/user/posts/${selected.targetId}`}
                    target="_blank"
                    rel="noreferrer"
                    className="px-3 py-2 rounded-lg bg-blue-600 text-white text-sm"
                  >
                    Open Reported Post
                  </a>
                </div>
              ) : null}

              {selected.targetContent?.title ? (
                <p className="text-sm mt-3 text-slate-700">Reported content: {selected.targetContent.title}</p>
              ) : null}
              {selected.targetContent?.description ? (
                <p className="text-sm mt-1 text-slate-600 line-clamp-3">{selected.targetContent.description}</p>
              ) : null}

              <textarea className="w-full border rounded-lg p-2 mt-3" value={reason} onChange={(e) => setReason(e.target.value)} />

              <div className="grid grid-cols-2 gap-2 mt-3">
                {BAN_OPTIONS.map((duration) => (
                  <button
                    key={duration}
                    className="px-3 py-2 rounded-lg border hover:bg-slate-50 disabled:opacity-50"
                    onClick={() => resolve('ban', duration)}
                    disabled={submitting}
                  >
                    Ban {duration}
                  </button>
                ))}
              </div>

              {selected.targetType === 'post' ? (
                <button
                  className="mt-3 px-4 py-2 rounded-lg bg-amber-600 text-white disabled:opacity-50"
                  onClick={() => resolve('lock_post')}
                  disabled={submitting}
                >
                  Lock Post
                </button>
              ) : null}

              <button className="mt-3 ml-2 px-4 py-2 rounded-lg bg-slate-900 text-white disabled:opacity-50" onClick={() => resolve('dismiss')} disabled={submitting}>
                Dismiss
              </button>
            </>
          ) : (
            <p className="text-sm text-slate-500">Select a report to view detail.</p>
          )}
        </div>
      </div>
    </div>
  );
}
