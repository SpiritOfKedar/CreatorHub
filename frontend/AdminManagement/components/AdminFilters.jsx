"use client";

/**
 * @param {{
 *  filters: {role: string, status: string},
 *  sortBy: 'lastActive'|'recentlyAdded',
 *  onFilterChange: (next: {role?: string, status?: string}) => void,
 *  onSortChange: (next: 'lastActive'|'recentlyAdded') => void
 * }} props
 */
export default function AdminFilters({ filters, sortBy, onFilterChange, onSortChange }) {
  return (
    <div className="flex flex-col gap-4 rounded-2xl border border-slate-200 bg-white p-4 md:flex-row md:items-center md:justify-between">
      <div className="flex items-center gap-3">
        <select
          className="rounded-full border border-slate-300 bg-white px-4 py-2 text-sm"
          value={filters.role}
          onChange={(e) => onFilterChange({ role: e.target.value })}
        >
          <option value="all">Role: All</option>
          <option value="super_admin">Super Admin</option>
          <option value="moderator">Moderator</option>
          <option value="support">Support</option>
          <option value="finance">Finance</option>
        </select>

        <select
          className="rounded-full border border-slate-300 bg-white px-4 py-2 text-sm"
          value={filters.status}
          onChange={(e) => onFilterChange({ status: e.target.value })}
        >
          <option value="all">Status: All</option>
          <option value="active">Active</option>
          <option value="inactive">Inactive</option>
        </select>
      </div>

      <div className="flex items-center gap-3 text-sm">
        <span className="text-slate-500">Sort By</span>
        <button
          className={`rounded px-1 ${sortBy === 'lastActive' ? 'font-bold text-slate-900' : 'text-slate-500'}`}
          onClick={() => onSortChange('lastActive')}
        >
          Last Active
        </button>
        <button
          className={`rounded px-1 ${sortBy === 'recentlyAdded' ? 'font-bold text-slate-900' : 'text-slate-500'}`}
          onClick={() => onSortChange('recentlyAdded')}
        >
          Recently Added
        </button>
      </div>
    </div>
  );
}
