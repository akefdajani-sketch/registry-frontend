'use client';

import { useState } from 'react';
import { buildApiUrl } from '../../../lib/api';

export default function NewAgreementPage() {
  const [form, setForm] = useState({
    municipalityId: '',
    propertyId: '',
    unitId: '',
    ownerId: '',
    tenantId: '',
    agreementType: 'rental',
    agreementStatus: 'active',
    startDate: '',
    endDate: '',
    recurringUntil: '',
    paymentFrequency: 'monthly',
    rentAmount: '',
    depositDue: '',
    autoGenerateObligations: true,
  });
  const [status, setStatus] = useState<string>('');

  async function submit() {
    setStatus('Saving agreement...');
    try {
      const payload = {
        ...form,
        rentAmount: form.rentAmount ? Number(form.rentAmount) : null,
        depositDue: form.depositDue ? Number(form.depositDue) : null,
      };

      const res = await fetch(buildApiUrl('/api/agreements'), {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data?.error || data?.message || 'Could not save agreement');
      }

      setStatus(data?.message || 'Agreement request saved. The backend currently returns a stub response.');
    } catch (error: any) {
      setStatus(error.message || 'Could not save agreement');
    }
  }

  return (
    <main className="page">
      <section className="page__header">
        <div>
          <h1 className="page__title">Create Agreement</h1>
          <p className="page__subtitle">Live frontend form targeting the registry backend endpoint.</p>
        </div>
      </section>

      {status ? <div className="notice">{status}</div> : null}

      <div className="form">
        {[
          ['Municipality ID', 'municipalityId'],
          ['Property ID', 'propertyId'],
          ['Owner ID', 'ownerId'],
          ['Tenant ID', 'tenantId'],
          ['Rent Amount', 'rentAmount'],
          ['Deposit Due', 'depositDue'],
        ].map(([label, key]) => (
          <input key={key} className="input" placeholder={label} onChange={(e) => setForm({ ...form, [key]: e.target.value })} />
        ))}
        <input type="date" className="input" onChange={(e) => setForm({ ...form, startDate: e.target.value })} />
        <input type="date" className="input" onChange={(e) => setForm({ ...form, endDate: e.target.value })} />
        <input type="date" className="input" onChange={(e) => setForm({ ...form, recurringUntil: e.target.value })} />
        <button onClick={submit} className="button button--primary">Save Agreement</button>
      </div>
    </main>
  );
}
