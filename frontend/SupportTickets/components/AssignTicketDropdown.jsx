"use client";

import { useEffect, useState } from 'react';
import api from '@/src/lib/api';

/**
 * @param {{ticketId:string, currentAssignee?:string, onAssigned:(adminId:string)=>void}} props
 */
export default function AssignTicketDropdown({ ticketId, currentAssignee, onAssigned }) {
  const [admins, setAdmins] = useState([]);

  useEffect(() => {
    api
      .get('/admin-management', { params: { status: 'active', page: 1, limit: 100 } })
      .then((res) => {
        const allAdmins = Array.isArray(res.data?.admins) ? res.data.admins : [];
        const assignable = allAdmins.filter((admin) => ['support', 'moderator'].includes(admin?.role));
        setAdmins(assignable);
      })
      .catch(() => setAdmins([]));
  }, []);

  return (
    <select
      value={currentAssignee || ''}
      onChange={(e) => onAssigned(e.target.value || 'auto')}
      className="rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm"
    >
      <option value="">Auto-assign</option>
      {admins.map((admin) => (
        <option key={admin._id} value={admin._id}>
          {admin.name} ({admin.role})
        </option>
      ))}
    </select>
  );
}
