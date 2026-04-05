'use client';

import { useEffect, useState } from 'react';
import { buildApiUrl, fetchJson } from '../../../lib/api';

export default function NewDuePage() {
  const [status, setStatus] = useState('');
  const [properties, setProperties] = useState<any[]>([]);
  const [form, setForm] = useState({ municipalityId: '', propertyId: '', obligationType: 'electricity', title: '', amountDue: '', dueDate: '', providerName: '', externalReference: '' });

  useEffect(() => {
    fetchJson<{ items: any[] }>('/api/properties').then((data) => {
      setProperties(data.items);
      setForm((prev) => ({ ...prev, municipalityId: prev.municipalityId || data.items[0]?.municipality_id || '' }));
    }).catch(() => {});
  }, []);

  async function submit() {
    setStatus('Saving due...');
    try {
      const payload = { ...form, amountDue: Number(form.amountDue) };
      const res = await fetch(buildApiUrl('/api/dues'), {
        method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(payload),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data?.error || data?.message || 'Could not save due');
      setStatus(data?.message || 'Due created successfully');
    } catch (error: any) {
      setStatus(error.message || 'Could not save due');
    }
  }

  return (
    <main className="page">
      <section className="page__header">
        <div>
          <h1 className="page__title">Create Due</h1>
          <p className="page__subtitle">Add a utility, tax, or custom obligation linked to a property.</p>
        </div>
      </section>

      {status ? <div className="notice">{status}</div> : null}

      <div className="form">
        <input className="input" placeholder="Municipality ID" value={form.municipalityId} onChange={(e) => setForm({ ...form, municipalityId: e.target.value })} />
        <select className="select" value={form.propertyId} onChange={(e) => setForm({ ...form, propertyId: e.target.value })}>
          <option value="">Select property</option>
          {properties.map((property) => <option key={property.id} value={property.id}>{property.title}</option>)}
        </select>
        <select className="select" value={form.obligationType} onChange={(e) => setForm({ ...form, obligationType: e.target.value })}>
          <option value="electricity">Electricity</option>
          <option value="water">Water</option>
          <option value="sewage">Sewage</option>
          <option value="property_tax">Property Tax</option>
          <option value="municipality_fee">Municipality Fee</option>
          <option value="maintenance">Maintenance</option>
          <option value="custom">Custom</option>
        </select>
        <input className="input" placeholder="Title" value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} />
        <input className="input" placeholder="Amount Due" value={form.amountDue} onChange={(e) => setForm({ ...form, amountDue: e.target.value })} />
        <input type="date" className="input" value={form.dueDate} onChange={(e) => setForm({ ...form, dueDate: e.target.value })} />
        <input className="input" placeholder="Provider Name" value={form.providerName} onChange={(e) => setForm({ ...form, providerName: e.target.value })} />
        <input className="input" placeholder="External Reference" value={form.externalReference} onChange={(e) => setForm({ ...form, externalReference: e.target.value })} />
        <button onClick={submit} className="button button--primary">Save Due</button>
      </div>
    </main>
  );
}
