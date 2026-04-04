"use client";

import { useCallback, useEffect, useMemo, useState } from 'react';
import api from '@/src/lib/api';

/**
 * Fetch, filter and paginate admin list.
 */
export function useAdmins() {
  const [admins, setAdmins] = useState([]);
  const [stats, setStats] = useState({ super_admin: 0, moderator: 0, support: 0, finance: 0 });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [filters, setFilters] = useState({ role: 'all', status: 'all' });
  const [sortBy, setSortBy] = useState('lastActive');
  const [page, setPage] = useState(1);
  const [limit] = useState(10);
  const [pagination, setPagination] = useState({ page: 1, pages: 1, total: 0, limit: 10 });
  const [requester, setRequester] = useState(null);

  const fetchAdmins = useCallback(async () => {
    setLoading(true);
    setError('');
    try {
      const { data } = await api.get('/admin-management', {
        params: {
          role: filters.role,
          status: filters.status,
          sortBy,
          page,
          limit,
        },
      });

      setAdmins(data?.admins || []);
      setStats(data?.stats || { super_admin: 0, moderator: 0, support: 0, finance: 0 });
      setPagination(data?.pagination || { page: 1, pages: 1, total: 0, limit });
      setRequester(data?.requester || null);
    } catch (err) {
      setError(err?.response?.data?.message || 'Failed to fetch admins');
    } finally {
      setLoading(false);
    }
  }, [filters.role, filters.status, limit, page, sortBy]);

  useEffect(() => {
    fetchAdmins();
  }, [fetchAdmins]);

  const applyFilters = useCallback((next) => {
    setPage(1);
    setFilters((prev) => ({ ...prev, ...next }));
  }, []);

  const refresh = useCallback(() => {
    fetchAdmins();
  }, [fetchAdmins]);

  const nextPage = useCallback(() => {
    setPage((p) => (p < (pagination.pages || 1) ? p + 1 : p));
  }, [pagination.pages]);

  const prevPage = useCallback(() => {
    setPage((p) => (p > 1 ? p - 1 : p));
  }, []);

  const apiState = useMemo(
    () => ({ admins, stats, loading, error, filters, sortBy, page, pagination, requester }),
    [admins, stats, loading, error, filters, sortBy, page, pagination, requester]
  );

  return {
    ...apiState,
    setSortBy,
    applyFilters,
    refresh,
    nextPage,
    prevPage,
  };
}
