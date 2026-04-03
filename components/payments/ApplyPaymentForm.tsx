'use client';

import { useState } from 'react';

export default function ApplyPaymentForm({
  municipalityId,
  obligationId,
}: {
  municipalityId: string;
  obligationId: string;
}) {
  const [amountPaid, setAmountPaid] = useState('');
  const [paymentMethod, setPaymentMethod] = useState('cash');

  async function submit() {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/payments`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        municipalityId,
        obligationId,
        amountPaid: Number(amountPaid),
        paymentMethod,
      }),
    });

    const data = await res.json();
    console.log(data);
    alert('Payment saved');
  }

  return (
    <div style={{ display: 'grid', gap: 12, border: '1px solid #ddd', borderRadius: 16, padding: 16 }}>
      <h3 style={{ margin: 0 }}>Apply Payment</h3>
      <input
        style={inputStyle}
        placeholder="Amount"
        value={amountPaid}
        onChange={(e) => setAmountPaid(e.target.value)}
      />
      <select style={inputStyle} value={paymentMethod} onChange={(e) => setPaymentMethod(e.target.value)}>
        <option value="cash">Cash</option>
        <option value="card">Card</option>
        <option value="bank_transfer">Bank Transfer</option>
        <option value="cliq">CliQ</option>
        <option value="efawateer">eFAWATEER</option>
        <option value="other">Other</option>
      </select>
      <button onClick={submit} style={buttonStyle}>Save Payment</button>
    </div>
  );
}

const inputStyle: React.CSSProperties = { width: '100%', border: '1px solid #ddd', borderRadius: 12, padding: 12 };
const buttonStyle: React.CSSProperties = { border: '1px solid #ddd', borderRadius: 999, padding: '10px 16px', width: 'fit-content', background: '#fff', cursor: 'pointer' };
