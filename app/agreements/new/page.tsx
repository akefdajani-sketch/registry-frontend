'use client';

import { useState } from 'react';

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

  async function submit() {
    const payload = {
      ...form,
      rentAmount: form.rentAmount ? Number(form.rentAmount) : null,
      depositDue: form.depositDue ? Number(form.depositDue) : null,
    };

    const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/agreements`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });

    const data = await res.json();
    console.log(data);
    alert('Agreement created');
  }

  return (
    <main style={{ padding: 24, maxWidth: 780 }}>
      <h1 style={{ fontSize: 28, marginBottom: 20 }}>Create Agreement</h1>
      <div style={{ display: 'grid', gap: 12 }}>
        {[
          ['Municipality ID', 'municipalityId'],
          ['Property ID', 'propertyId'],
          ['Owner ID', 'ownerId'],
          ['Tenant ID', 'tenantId'],
          ['Rent Amount', 'rentAmount'],
          ['Deposit Due', 'depositDue'],
        ].map(([label, key]) => (
          <input key={key} style={inputStyle} placeholder={label} onChange={(e) => setForm({ ...form, [key]: e.target.value })} />
        ))}
        <input type="date" style={inputStyle} onChange={(e) => setForm({ ...form, startDate: e.target.value })} />
        <input type="date" style={inputStyle} onChange={(e) => setForm({ ...form, endDate: e.target.value })} />
        <input type="date" style={inputStyle} onChange={(e) => setForm({ ...form, recurringUntil: e.target.value })} />
        <button onClick={submit} style={buttonStyle}>Save Agreement</button>
      </div>
    </main>
  );
}

const inputStyle: React.CSSProperties = { width: '100%', border: '1px solid #ddd', borderRadius: 12, padding: 12 };
const buttonStyle: React.CSSProperties = { border: '1px solid #ddd', borderRadius: 999, padding: '12px 20px', width: 'fit-content', background: '#fff', cursor: 'pointer' };
