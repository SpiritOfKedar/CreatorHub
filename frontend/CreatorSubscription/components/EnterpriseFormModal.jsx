"use client";

import { useMemo, useState } from 'react';
import { CheckCircle2, AlertCircle } from 'lucide-react';
import { useEnterpriseForm } from '../hooks/useEnterpriseForm';

function InputField({ label, value, onChange, onBlur, error, touched, placeholder }) {
  const isError = touched && error;
  const isValid = touched && !error && String(value || '').trim().length > 0;

  return (
    <div className="space-y-1">
      <label className="text-xs font-semibold tracking-wide text-slate-500 uppercase">{label}</label>
      <div className={`relative rounded-lg border bg-white ${isError ? 'border-red-500' : isValid ? 'border-emerald-500' : 'border-slate-300'}`}>
        <input
          value={value}
          onChange={(e) => onChange(e.target.value)}
          onBlur={onBlur}
          placeholder={placeholder}
          className="w-full px-3 py-2.5 rounded-lg outline-none text-sm text-slate-800"
        />
        {isValid ? <CheckCircle2 className="absolute right-3 top-2.5 w-4 h-4 text-emerald-600" /> : null}
        {isError ? <AlertCircle className="absolute right-3 top-2.5 w-4 h-4 text-red-600" /> : null}
      </div>
      {isError ? <p className="text-xs text-red-600">{error}</p> : null}
    </div>
  );
}

export default function EnterpriseFormModal({ onSuccess, onClose }) {
  const [form, setForm] = useState({
    agencyName: '',
    gstin: '',
    address: '',
    email: '',
    managerName: '',
    phone: '',
  });
  const [touched, setTouched] = useState({});
  const { loading, error, fieldErrors, submitEnterpriseForm } = useEnterpriseForm(onSuccess);

  const fields = useMemo(() => ([
    { key: 'agencyName', label: 'Agency Name *', placeholder: 'Agency legal name' },
    { key: 'gstin', label: 'GSTIN Number *', placeholder: '22AAAAA0000A1Z5' },
    { key: 'address', label: 'Address *', placeholder: 'Business address' },
    { key: 'email', label: 'Business Email *', placeholder: 'name@company.com' },
    { key: 'managerName', label: 'Manager Name *', placeholder: 'Point of contact' },
    { key: 'phone', label: 'Phone Number *', placeholder: '10-digit mobile number' },
  ]), []);

  return (
    <div className="fixed inset-0 z-[150] bg-slate-900/50 flex items-center justify-center p-4">
      <div className="w-full max-w-2xl bg-white rounded-2xl border border-slate-200 p-6">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-xl font-semibold text-slate-900">Enterprise / Premium Plan</h3>
            <p className="text-sm text-slate-600 mt-1">Our team will reach out within 2 business days.</p>
          </div>
          <button type="button" onClick={onClose} className="text-slate-500 hover:text-slate-700">✕</button>
        </div>

        <div className="my-4 h-px bg-slate-200" />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {fields.map((field) => (
            <InputField
              key={field.key}
              label={field.label}
              value={form[field.key]}
              placeholder={field.placeholder}
              error={fieldErrors[field.key]}
              touched={touched[field.key]}
              onBlur={() => setTouched((prev) => ({ ...prev, [field.key]: true }))}
              onChange={(value) => setForm((prev) => ({ ...prev, [field.key]: value }))}
            />
          ))}
        </div>

        {error ? <p className="text-sm text-red-600 mt-3">{error}</p> : null}

        <div className="mt-5 flex justify-end gap-3">
          <button type="button" onClick={onClose} className="rounded-lg border border-slate-300 px-4 py-2 text-sm font-semibold text-slate-700">Cancel</button>
          <button type="button" disabled={loading} onClick={() => submitEnterpriseForm(form)} className="rounded-lg bg-slate-900 text-white px-4 py-2 text-sm font-semibold disabled:opacity-60">
            {loading ? 'Submitting...' : 'Submit Request →'}
          </button>
        </div>
      </div>
    </div>
  );
}
