'use client';

import { useState } from 'react';
import { buildApiUrl } from '../../../lib/api';

export default function NewDuePage() {
  const [form, setForm] = useState({
    municipalityId: '',
    propertyId: '',
    obligationType: 'electricity',
    title: '',
    amountDue: '',
    dueDate: '',
    providerName: '',
    externalReference: '',
  });
  const [status, setStatus] = useState('');

  async function submit() {
    setStatus('Saving due...');
    try {
      const res = await fetch(buildApiUrl('/api/dues'), {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...form, amountDue: Number(form.amountDue) }),
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data?.error || data?.message || 'Could not save due');
      }
      setStatus(data?.message || 'Due request saved. The backend currently returns a stub response.');
    } catch (error: any) {
      setStatus(error.message || 'Could not save due');
    }
  }

  return (
    <main className="page">
      <section className="page__header">
        <div>
          <h1 className="page__title">Create Due</h1>
          <p className="page__subtitle">Create a tax, utility, or custom property-linked due.</p>
        </div>
      </section>

      {status ? <div className="notice">{status}</div> : null}

      <div className="form">
        <input className="input" placeholder="Municipality ID" onChange={(e) => setForm({ ...form, municipalityId: e.target.value })} />
        <input className="input" placeholder="Property ID" onChange={(e) => setForm({ ...form, propertyId: e.target.value })} />
        <select className="select" value={form.obligationType} onChange={(e) => setForm({ ...form, obligationType: e.target.value })}>
          <option value="electricity">Electricity</option>
          <option value="water">Water</option>
          <option value="sewage">Sewage</option>
          <option value="property_tax">Property Tax</option>
          <option value="municipality_fee">Municipality Fee</option>
          <option value="maintenance">Maintenance</option>
          <option value="custom">Custom</option>
        </select>
        <input className="input" placeholder="Title" onChange={(e) => setForm({ ...form, title: e.target.value })} />
        <input className="input" placeholder="Amount Due" onChange={(e) => setForm({ ...form, amountDue: e.target.value })} />
        <input type="date" className="input" onChange={(e) => setForm({ ...form, dueDate: e.target.value })} />
        <input className="input" placeholder="Provider Name" onChange={(e) => setForm({ ...form, providerName: e.target.value })} />
        <input className="input" placeholder="External Reference" onChange={(e) => setForm({ ...form, externalReference: e.target.value })} />
        <button onClick={submit} className="button button--primary">Save Due</button>
      </div>
    </main>
  );
}
