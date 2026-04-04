"use client";

import { useState } from 'react';
import api from '@/src/lib/api';
import toast from 'react-hot-toast';

/**
 * Admin row actions (view/edit/delete/update).
 * @param {{refresh: () => void}} deps
 */
export function useAdminActions({ refresh }) {
  const [viewingAdmin, setViewingAdmin] = useState(null);
  const [editingAdmin, setEditingAdmin] = useState(null);
  const [deletingAdmin, setDeletingAdmin] = useState(null);
  const [loading, setLoading] = useState(false);

  const viewAdmin = async (id) => {
    try {
      setLoading(true);
      const { data } = await api.get(`/admin-management/${id}`);
      setViewingAdmin(data);
    } catch (err) {
      toast.error(err?.response?.data?.message || 'Failed to load admin details');
    } finally {
      setLoading(false);
    }
  };

  const editAdmin = async (id) => {
    try {
      setLoading(true);
      const { data } = await api.get(`/admin-management/${id}`);
      setEditingAdmin(data);
    } catch (err) {
      toast.error(err?.response?.data?.message || 'Failed to load admin for edit');
    } finally {
      setLoading(false);
    }
  };

  const requestDeleteAdmin = (admin) => {
    setDeletingAdmin(admin);
  };

  const confirmDeleteAdmin = async () => {
    if (!deletingAdmin?._id) return;
    try {
      setLoading(true);
      await api.delete(`/admin-management/${deletingAdmin._id}`);
      toast.success('Admin removed');
      setDeletingAdmin(null);
      refresh();
    } catch (err) {
      toast.error(err?.response?.data?.message || 'Failed to remove admin');
    } finally {
      setLoading(false);
    }
  };

  const updateAdmin = async (id, updates) => {
    try {
      setLoading(true);
      await api.patch(`/admin-management/${id}`, updates);
      toast.success('Admin updated');
      setEditingAdmin(null);
      refresh();
    } catch (err) {
      toast.error(err?.response?.data?.message || 'Failed to update admin');
    } finally {
      setLoading(false);
    }
  };

  return {
    loading,
    viewingAdmin,
    setViewingAdmin,
    editingAdmin,
    setEditingAdmin,
    deletingAdmin,
    setDeletingAdmin,
    viewAdmin,
    editAdmin,
    requestDeleteAdmin,
    confirmDeleteAdmin,
    updateAdmin,
  };
}
