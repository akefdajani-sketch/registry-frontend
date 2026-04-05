'use client';

import { useEffect, useMemo, useState } from 'react';
import { buildApiUrl, fetchJson } from '../../../lib/api';

export default function NewAgreementPage() {
  const [lookups, setLookups] = useState<{ properties: any[]; owners: any[]; tenants: any[] }>({ properties: [], owners: [], tenants: [] });
  const [status, setStatus] = useState('');
  const [createdId, setCreatedId] = useState('');
  const [form, setForm] = useState({
    municipalityId: '', propertyId: '', unitId: '', ownerId: '', tenantId: '', agreementType: 'rental', agreementStatus: 'active',
    startDate: '', endDate: '', recurringUntil: '', paymentFrequency: 'monthly', rentAmount: '', depositDue: '', autoGenerateObligations: true,
  });

  useEffect(() => {
    Promise.all([
      fetchJson<{ items: any[] }>('/api/properties').catch(() => ({ items: [] })),
      fetchJson<{ items: any[] }>('/api/owners').catch(() => ({ items: [] })),
      fetchJson<{ items: any[] }>('/api/tenants').catch(() => ({ items: [] })),
    ]).then(([properties, owners, tenants]) => {
      setLookups({ properties: properties.items, owners: owners.items, tenants: tenants.items });
      const inferredMunicipality = properties.items[0]?.municipality_id || owners.items[0]?.municipality_id || tenants.items[0]?.municipality_id || '';
      setForm((prev) => ({ ...prev, municipalityId: prev.municipalityId || inferredMunicipality }));
    });
  }, []);

  const selectedProperty = useMemo(() => lookups.properties.find((p) => p.id === form.propertyId), [lookups.properties, form.propertyId]);

  async function submit() {
    setStatus('Saving agreement...');
    setCreatedId('');
    try {
      const payload = {
        ...form,
        ownerId: form.ownerId || selectedProperty?.owner_id || null,
        rentAmount: form.rentAmount ? Number(form.rentAmount) : null,
        depositDue: form.depositDue ? Number(form.depositDue) : null,
      };

      const res = await fetch(buildApiUrl('/api/agreements'), {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data?.error || data?.message || 'Could not save agreement');
      setCreatedId(data?.agreement?.id || '');
      setStatus(data?.message || 'Agreement created successfully');
    } catch (error: any) {
      setStatus(error.message || 'Could not save agreement');
    }
  }

  return (
    <main className="page">
      <section className="page__header">
        <div>
          <h1 className="page__title">Create Agreement</h1>
          <p className="page__subtitle">Create a real rental agreement and generate obligations.</p>
        </div>
      </section>

      {status ? <div className="notice">{status}{createdId ? <> — <a href={`/agreements/${createdId}`}>Open agreement</a></> : null}</div> : null}

      <div className="form">
        <input className="input" placeholder="Municipality ID" value={form.municipalityId} onChange={(e) => setForm({ ...form, municipalityId: e.target.value })} />
        <select className="select" value={form.propertyId} onChange={(e) => setForm({ ...form, propertyId: e.target.value })}>
          <option value="">Select property</option>
          {lookups.properties.map((property) => <option key={property.id} value={property.id}>{property.title}</option>)}
        </select>
        <select className="select" value={form.ownerId} onChange={(e) => setForm({ ...form, ownerId: e.target.value })}>
          <option value="">Select owner</option>
          {lookups.owners.map((owner) => <option key={owner.id} value={owner.id}>{owner.full_name}</option>)}
        </select>
        <select className="select" value={form.tenantId} onChange={(e) => setForm({ ...form, tenantId: e.target.value })}>
          <option value="">Select tenant</option>
          {lookups.tenants.map((tenant) => <option key={tenant.id} value={tenant.id}>{tenant.full_name}</option>)}
        </select>
        <div className="grid grid--two">
          <input type="date" className="input" value={form.startDate} onChange={(e) => setForm({ ...form, startDate: e.target.value })} />
          <input type="date" className="input" value={form.endDate} onChange={(e) => setForm({ ...form, endDate: e.target.value })} />
        </div>
        <input type="date" className="input" value={form.recurringUntil} onChange={(e) => setForm({ ...form, recurringUntil: e.target.value })} />
        <div className="grid grid--two">
          <input className="input" placeholder="Rent Amount" value={form.rentAmount} onChange={(e) => setForm({ ...form, rentAmount: e.target.value })} />
          <input className="input" placeholder="Deposit Due" value={form.depositDue} onChange={(e) => setForm({ ...form, depositDue: e.target.value })} />
        </div>
        <label className="card"><input type="checkbox" checked={form.autoGenerateObligations} onChange={(e) => setForm({ ...form, autoGenerateObligations: e.target.checked })} /> Auto-generate rent obligations</label>
        <button onClick={submit} className="button button--primary">Save Agreement</button>
      </div>
    </main>
  );
}
