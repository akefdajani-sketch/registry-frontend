'use client';

import { useState } from 'react';

export default function NewImprovementPage() {
  const [form, setForm] = useState({
    municipalityId: '',
    propertyId: '',
    title: '',
    description: '',
    estimatedCost: '',
    actualCost: '',
    status: 'planned',
  });

  async function submit() {
    const payload = {
      ...form,
      estimatedCost: form.estimatedCost ? Number(form.estimatedCost) : null,
      actualCost: form.actualCost ? Number(form.actualCost) : null,
    };

    const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/improvements`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });

    const data = await res.json();
    console.log(data);
    alert('Improvement created');
  }

  return (
    <main style={{ padding: 24, maxWidth: 780 }}>
      <h1 style={{ fontSize: 28, marginBottom: 20 }}>Create Improvement</h1>
      <div style={{ display: 'grid', gap: 12 }}>
        <input style={inputStyle} placeholder="Municipality ID" onChange={(e) => setForm({ ...form, municipalityId: e.target.value })} />
        <input style={inputStyle} placeholder="Property ID" onChange={(e) => setForm({ ...form, propertyId: e.target.value })} />
        <input style={inputStyle} placeholder="Title" onChange={(e) => setForm({ ...form, title: e.target.value })} />
        <textarea style={{ ...inputStyle, minHeight: 120 }} placeholder="Description" onChange={(e) => setForm({ ...form, description: e.target.value })} />
        <input style={inputStyle} placeholder="Estimated Cost" onChange={(e) => setForm({ ...form, estimatedCost: e.target.value })} />
        <input style={inputStyle} placeholder="Actual Cost" onChange={(e) => setForm({ ...form, actualCost: e.target.value })} />
        <select style={inputStyle} value={form.status} onChange={(e) => setForm({ ...form, status: e.target.value })}>
          <option value="planned">Planned</option>
          <option value="in_progress">In Progress</option>
          <option value="completed">Completed</option>
          <option value="cancelled">Cancelled</option>
        </select>
        <button onClick={submit} style={buttonStyle}>Save Improvement</button>
      </div>
    </main>
  );
}

const inputStyle: React.CSSProperties = { width: '100%', border: '1px solid #ddd', borderRadius: 12, padding: 12 };
const buttonStyle: React.CSSProperties = { border: '1px solid #ddd', borderRadius: 999, padding: '12px 20px', width: 'fit-content', background: '#fff', cursor: 'pointer' };
