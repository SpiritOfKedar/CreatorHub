"use client";

import { useEffect, useMemo, useState } from 'react';
import { Plus } from 'lucide-react';
import api from '@/src/lib/api';
import { useAuthStore } from '@/src/store/useAuthStore';
import { useAdmins } from '../../../hooks/useAdmins';
import { useAddAdmin } from '../../../hooks/useAddAdmin';
import { useAdminActions } from '../../../hooks/useAdminActions';
import AdminStatsBar from '../../../components/AdminStatsBar';
import AdminFilters from '../../../components/AdminFilters';
import AdminTable from '../../../components/AdminTable';
import AddAdminModal from '../../../components/AddAdminModal';
import EditAdminModal from '../../../components/EditAdminModal';
import ViewAdminDrawer from '../../../components/ViewAdminDrawer';
import ConfirmDeleteModal from '../../../components/ConfirmDeleteModal';

export default function AdminManagementPageModule() {
  const user = useAuthStore((state) => state.user);
  const { admins, stats, loading, error, filters, sortBy, pagination, page, requester, applyFilters, setSortBy, refresh, nextPage, prevPage } = useAdmins();
  const addAdminState = useAddAdmin();
  const actions = useAdminActions({ refresh });
  const [addOpen, setAddOpen] = useState(false);

  useEffect(() => {
    api.patch('/admin-management/me/last-active').catch(() => {});
  }, []);

  const avatarInitials = useMemo(() => {
    const name = user?.name || 'Admin User';
    const parts = name.trim().split(/\s+/);
    if (parts.length === 1) return parts[0].slice(0, 2).toUpperCase();
    return `${parts[0][0]}${parts[parts.length - 1][0]}`.toUpperCase();
  }, [user?.name]);

  return (
    <div className="min-h-screen bg-[#f5f5f8] p-6">
      <div className="mb-6 flex items-center justify-between">
        <h2 className="text-lg font-semibold text-slate-800">Welcome, {user?.name || 'Admin'}</h2>
        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-slate-200 text-xs font-bold text-slate-700">
          {avatarInitials}
        </div>
      </div>

      <div className="mb-6 flex items-start justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Admin Management</h1>
          <p className="text-sm text-slate-500">Manage internal team access and permissions</p>
        </div>
        {requester?.role === 'super_admin' ? (
          <button onClick={() => setAddOpen(true)} className="inline-flex items-center gap-2 rounded-full bg-slate-900 px-4 py-2 text-sm font-semibold text-white">
            <Plus className="h-4 w-4" /> Add Admin
          </button>
        ) : null}
      </div>

      <div className="space-y-4">
        <AdminStatsBar stats={stats} />

        <AdminFilters
          filters={filters}
          sortBy={sortBy}
          onFilterChange={applyFilters}
          onSortChange={(value) => {
            setSortBy(value);
          }}
        />

        {error ? <p className="text-sm text-red-600">{error}</p> : null}

        <AdminTable
          admins={admins}
          loading={loading || actions.loading}
          currentAdminId={requester?._id}
          currentAdminRole={requester?.role}
          onView={actions.viewAdmin}
          onEdit={actions.editAdmin}
          onDelete={actions.requestDeleteAdmin}
          page={page}
          pages={pagination.pages || 1}
          onPrev={prevPage}
          onNext={nextPage}
        />
      </div>

      <AddAdminModal
        open={addOpen}
        onClose={() => setAddOpen(false)}
        useAddAdmin={addAdminState}
        onSuccess={refresh}
      />

      <EditAdminModal
        open={Boolean(actions.editingAdmin)}
        admin={actions.editingAdmin}
        onClose={() => actions.setEditingAdmin(null)}
        onSave={(updates) => actions.updateAdmin(actions.editingAdmin._id, updates)}
        loading={actions.loading}
      />

      <ViewAdminDrawer
        open={Boolean(actions.viewingAdmin)}
        admin={actions.viewingAdmin}
        onClose={() => actions.setViewingAdmin(null)}
      />

      <ConfirmDeleteModal
        open={Boolean(actions.deletingAdmin)}
        admin={actions.deletingAdmin}
        onClose={() => actions.setDeletingAdmin(null)}
        onConfirm={actions.confirmDeleteAdmin}
        loading={actions.loading}
      />
    </div>
  );
}
