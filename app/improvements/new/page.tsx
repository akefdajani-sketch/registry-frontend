'use client';

import { useEffect, useState } from 'react';
import { buildApiUrl, fetchJson } from '../../../lib/api';

export default function NewImprovementPage() {
  const [status, setStatus] = useState('');
  const [properties, setProperties] = useState<any[]>([]);
  const [contractors, setContractors] = useState<any[]>([]);
  const [form, setForm] = useState({ municipalityId: '', propertyId: '', contractorId: '', title: '', description: '', estimatedCost: '', actualCost: '', startDate: '', endDate: '', status: 'planned' });

  useEffect(() => {
    Promise.all([
      fetchJson<{ items: any[] }>('/api/properties').catch(() => ({ items: [] })),
      fetchJson<{ items: any[] }>('/api/contractors').catch(() => ({ items: [] })),
    ]).then(([properties, contractors]) => {
      setProperties(properties.items);
      setContractors(contractors.items);
      setForm((prev) => ({ ...prev, municipalityId: prev.municipalityId || properties.items[0]?.municipality_id || contractors.items[0]?.municipality_id || '' }));
    });
  }, []);

  async function submit() {
    setStatus('Saving improvement...');
    try {
      const payload = { ...form, estimatedCost: form.estimatedCost ? Number(form.estimatedCost) : null, actualCost: form.actualCost ? Number(form.actualCost) : null };
      const res = await fetch(buildApiUrl('/api/improvements'), {
        method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(payload),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data?.error || data?.message || 'Could not save improvement');
      setStatus(data?.message || 'Improvement created successfully');
    } catch (error: any) {
      setStatus(error.message || 'Could not save improvement');
    }
  }

  return (
    <main className="page">
      <section className="page__header">
        <div>
          <h1 className="page__title">Create Improvement</h1>
          <p className="page__subtitle">Track renovation, blueprint, and value-add work.</p>
        </div>
      </section>

      {status ? <div className="notice">{status}</div> : null}

      <div className="form">
        <input className="input" placeholder="Municipality ID" value={form.municipalityId} onChange={(e) => setForm({ ...form, municipalityId: e.target.value })} />
        <select className="select" value={form.propertyId} onChange={(e) => setForm({ ...form, propertyId: e.target.value })}>
          <option value="">Select property</option>
          {properties.map((property) => <option key={property.id} value={property.id}>{property.title}</option>)}
        </select>
        <select className="select" value={form.contractorId} onChange={(e) => setForm({ ...form, contractorId: e.target.value })}>
          <option value="">Select contractor</option>
          {contractors.map((contractor) => <option key={contractor.id} value={contractor.id}>{contractor.company_name}</option>)}
        </select>
        <input className="input" placeholder="Title" value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} />
        <textarea className="textarea" placeholder="Description" value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} />
        <div className="grid grid--two">
          <input className="input" placeholder="Estimated Cost" value={form.estimatedCost} onChange={(e) => setForm({ ...form, estimatedCost: e.target.value })} />
          <input className="input" placeholder="Actual Cost" value={form.actualCost} onChange={(e) => setForm({ ...form, actualCost: e.target.value })} />
        </div>
        <div className="grid grid--two">
          <input type="date" className="input" value={form.startDate} onChange={(e) => setForm({ ...form, startDate: e.target.value })} />
          <input type="date" className="input" value={form.endDate} onChange={(e) => setForm({ ...form, endDate: e.target.value })} />
        </div>
        <select className="select" value={form.status} onChange={(e) => setForm({ ...form, status: e.target.value })}>
          <option value="planned">Planned</option>
          <option value="in_progress">In Progress</option>
          <option value="completed">Completed</option>
          <option value="cancelled">Cancelled</option>
        </select>
        <button onClick={submit} className="button button--primary">Save Improvement</button>
      </div>
    </main>
  );
}
