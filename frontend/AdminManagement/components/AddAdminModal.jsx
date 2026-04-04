"use client";

import { useMemo, useState } from 'react';
import { Eye, EyeOff, X } from 'lucide-react';
import { z } from 'zod';
import toast from 'react-hot-toast';

const { ASSIGNABLE_ROLES } = require('../utils/adminConstants');

const schema = z.object({
  name: z.string().min(2).max(60).regex(/^[a-zA-Z\s'-]+$/),
  email: z.string().email('Enter a valid email address'),
  username: z
    .string()
    .min(3)
    .max(30)
    .regex(/^[a-z0-9_]+$/, 'Lowercase letters, numbers and underscores only'),
  password: z
    .string()
    .min(8)
    .regex(/[A-Z]/, 'Must contain an uppercase letter')
    .regex(/[0-9]/, 'Must contain a number')
    .regex(/[^a-zA-Z0-9]/, 'Must contain a special character'),
  role: z.enum(['moderator', 'support', 'finance']),
});

const strength = (value) => {
  if (!value || value.length < 8) return { label: 'weak', className: 'bg-red-500 w-1/3' };
  const checks = [/[A-Z]/.test(value), /[0-9]/.test(value), /[^a-zA-Z0-9]/.test(value)].filter(Boolean).length;
  if (checks <= 1) return { label: 'fair', className: 'bg-amber-500 w-2/3' };
  if (checks === 2) return { label: 'fair', className: 'bg-amber-500 w-2/3' };
  return { label: 'strong', className: 'bg-emerald-500 w-full' };
};

/**
 * @param {{open: boolean, onClose: () => void, useAddAdmin: any, onSuccess: () => void}} props
 */
export default function AddAdminModal({ open, onClose, useAddAdmin, onSuccess }) {
  const [showPassword, setShowPassword] = useState(false);
  const [values, setValues] = useState({ name: '', email: '', username: '', password: '', role: 'moderator' });
  const [errors, setErrors] = useState({});

  const pwdStrength = useMemo(() => strength(values.password), [values.password]);

  if (!open) return null;

  const setField = (field, value) => {
    setValues((p) => ({ ...p, [field]: value }));
    setErrors((p) => ({ ...p, [field]: '' }));
  };

  const submit = async (e) => {
    e.preventDefault();
    setErrors({});

    const parsed = schema.safeParse(values);
    if (!parsed.success) {
      const next = {};
      for (const issue of parsed.error.issues) {
        const key = issue.path[0];
        if (!next[key]) next[key] = issue.message;
      }
      setErrors(next);
      return;
    }

    const result = await useAddAdmin.submitAdmin(parsed.data);
    if (!result.ok) {
      setErrors((prev) => ({ ...prev, ...useAddAdmin.fieldErrors }));
      return;
    }

    toast.success('Admin added successfully.');
    useAddAdmin.reset();
    setValues({ name: '', email: '', username: '', password: '', role: 'moderator' });
    onClose();
    onSuccess();
  };

  return (
    <div className="fixed inset-0 z-[220] flex items-center justify-center bg-black/40 p-4">
      <form onSubmit={submit} className="w-full max-w-xl rounded-2xl bg-white p-6 shadow-2xl">
        <div className="mb-5 flex items-center justify-between">
          <h3 className="text-xl font-bold text-slate-900">Add New Admin</h3>
          <button type="button" onClick={onClose} className="rounded p-1 text-slate-400 hover:text-slate-700"><X className="h-5 w-5" /></button>
        </div>

        <div className="space-y-4">
          <div>
            <label className="mb-1 block text-sm font-semibold">Name *</label>
            <input className="w-full rounded-xl border border-slate-300 px-4 py-3" value={values.name} onChange={(e) => setField('name', e.target.value)} />
            {errors.name ? <p className="mt-1 text-xs text-red-600">{errors.name}</p> : null}
          </div>

          <div>
            <label className="mb-1 block text-sm font-semibold">Email *</label>
            <input
              type="email"
              placeholder="admin@gmail.com"
              className="w-full rounded-xl border border-slate-300 px-4 py-3"
              value={values.email}
              onChange={(e) => setField('email', e.target.value)}
            />
            {errors.email ? <p className="mt-1 text-xs text-red-600">{errors.email}</p> : null}
          </div>

          <div>
            <label className="mb-1 block text-sm font-semibold">Username *</label>
            <input className="w-full rounded-xl border border-slate-300 px-4 py-3" value={values.username} onChange={(e) => setField('username', e.target.value)} />
            {errors.username || useAddAdmin.fieldErrors?.username ? <p className="mt-1 text-xs text-red-600">{errors.username || useAddAdmin.fieldErrors?.username}</p> : null}
          </div>

          <div>
            <label className="mb-1 block text-sm font-semibold">Password *</label>
            <div className="relative">
              <input type={showPassword ? 'text' : 'password'} className="w-full rounded-xl border border-slate-300 px-4 py-3 pr-10" value={values.password} onChange={(e) => setField('password', e.target.value)} />
              <button type="button" onClick={() => setShowPassword((p) => !p)} className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500">
                {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
              </button>
            </div>
            <div className="mt-2 h-2 rounded-full bg-slate-200">
              <div className={`h-2 rounded-full ${pwdStrength.className}`} />
            </div>
            <p className="mt-1 text-xs text-slate-500 capitalize">{pwdStrength.label}</p>
            {errors.password ? <p className="mt-1 text-xs text-red-600">{errors.password}</p> : null}
          </div>

          <div>
            <label className="mb-1 block text-sm font-semibold">Role *</label>
            <div className="mt-2 flex flex-wrap gap-4">
              {ASSIGNABLE_ROLES.map((role) => (
                <label key={role} className="inline-flex items-center gap-2 text-sm">
                  <input
                    type="radio"
                    name="role"
                    value={role}
                    checked={values.role === role}
                    onChange={(e) => setField('role', e.target.value)}
                  />
                  <span className="capitalize">{role}</span>
                </label>
              ))}
            </div>
            <p className="mt-1 text-xs text-slate-500">Super Admin role not available here.</p>
            {errors.role ? <p className="mt-1 text-xs text-red-600">{errors.role}</p> : null}
          </div>
        </div>

        <div className="mt-6 flex items-center justify-end gap-3">
          <button type="button" onClick={onClose} className="rounded-xl border border-slate-300 px-4 py-2 text-sm font-semibold">Cancel</button>
          <button disabled={useAddAdmin.loading} className="rounded-xl bg-slate-900 px-4 py-2 text-sm font-semibold text-white disabled:opacity-50">
            {useAddAdmin.loading ? 'Adding...' : 'Add Admin →'}
          </button>
        </div>
        {useAddAdmin.error ? (
          <p className="mt-3 text-xs text-red-600">{useAddAdmin.error}</p>
        ) : null}
      </form>
    </div>
  );
}
