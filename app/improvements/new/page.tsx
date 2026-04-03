'use client';

import { useState } from 'react';
import { buildApiUrl } from '../../../lib/api';

export default function NewImprovementPage() {
  const [form, setForm] = useState({
    municipalityId: '',
    propertyId: '',
    title: '',
    description: '',
    estimatedCost: '',
    actualCost: '',
    startDate: '',
    endDate: '',
    status: 'planned',
  });
  const [status, setStatus] = useState('');

  async function submit() {
    setStatus('Saving improvement...');
    try {
      const payload = {
        ...form,
        estimatedCost: form.estimatedCost ? Number(form.estimatedCost) : null,
        actualCost: form.actualCost ? Number(form.actualCost) : null,
      };

      const res = await fetch(buildApiUrl('/api/improvements'), {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data?.error || data?.message || 'Could not save improvement');
      }
      setStatus(data?.message || 'Improvement request saved. The backend currently returns a stub response.');
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
        <input className="input" placeholder="Municipality ID" onChange={(e) => setForm({ ...form, municipalityId: e.target.value })} />
        <input className="input" placeholder="Property ID" onChange={(e) => setForm({ ...form, propertyId: e.target.value })} />
        <input className="input" placeholder="Title" onChange={(e) => setForm({ ...form, title: e.target.value })} />
        <textarea className="textarea" placeholder="Description" onChange={(e) => setForm({ ...form, description: e.target.value })} />
        <input className="input" placeholder="Estimated Cost" onChange={(e) => setForm({ ...form, estimatedCost: e.target.value })} />
        <input className="input" placeholder="Actual Cost" onChange={(e) => setForm({ ...form, actualCost: e.target.value })} />
        <input type="date" className="input" onChange={(e) => setForm({ ...form, startDate: e.target.value })} />
        <input type="date" className="input" onChange={(e) => setForm({ ...form, endDate: e.target.value })} />
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
