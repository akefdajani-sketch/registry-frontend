'use client';

import { useState } from 'react';

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

  async function submit() {
    const payload = { ...form, amountDue: Number(form.amountDue) };

    const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/dues`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });

    const data = await res.json();
    console.log(data);
    alert('Due created');
  }

  return (
    <main style={{ padding: 24, maxWidth: 780 }}>
      <h1 style={{ fontSize: 28, marginBottom: 20 }}>Create Due</h1>
      <div style={{ display: 'grid', gap: 12 }}>
        <input style={inputStyle} placeholder="Municipality ID" onChange={(e) => setForm({ ...form, municipalityId: e.target.value })} />
        <input style={inputStyle} placeholder="Property ID" onChange={(e) => setForm({ ...form, propertyId: e.target.value })} />
        <select style={inputStyle} value={form.obligationType} onChange={(e) => setForm({ ...form, obligationType: e.target.value })}>
          <option value="electricity">Electricity</option>
          <option value="water">Water</option>
          <option value="sewage">Sewage</option>
          <option value="property_tax">Property Tax</option>
          <option value="municipality_fee">Municipality Fee</option>
          <option value="maintenance">Maintenance</option>
          <option value="custom">Custom</option>
        </select>
        <input style={inputStyle} placeholder="Title" onChange={(e) => setForm({ ...form, title: e.target.value })} />
        <input style={inputStyle} placeholder="Amount Due" onChange={(e) => setForm({ ...form, amountDue: e.target.value })} />
        <input type="date" style={inputStyle} onChange={(e) => setForm({ ...form, dueDate: e.target.value })} />
        <input style={inputStyle} placeholder="Provider Name" onChange={(e) => setForm({ ...form, providerName: e.target.value })} />
        <input style={inputStyle} placeholder="External Reference" onChange={(e) => setForm({ ...form, externalReference: e.target.value })} />
        <button onClick={submit} style={buttonStyle}>Save Due</button>
      </div>
    </main>
  );
}

const inputStyle: React.CSSProperties = { width: '100%', border: '1px solid #ddd', borderRadius: 12, padding: 12 };
const buttonStyle: React.CSSProperties = { border: '1px solid #ddd', borderRadius: 999, padding: '12px 20px', width: 'fit-content', background: '#fff', cursor: 'pointer' };
