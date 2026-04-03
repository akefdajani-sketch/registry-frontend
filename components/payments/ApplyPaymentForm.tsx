'use client';

import { useState } from 'react';
import { buildApiUrl } from '../../lib/api';

export default function ApplyPaymentForm({ municipalityId, obligationId }: { municipalityId: string; obligationId: string }) {
  const [amountPaid, setAmountPaid] = useState('');
  const [paymentMethod, setPaymentMethod] = useState('cash');
  const [status, setStatus] = useState('');

  async function submit() {
    setStatus('Saving payment...');
    try {
      const res = await fetch(buildApiUrl('/api/payments'), {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ municipalityId, obligationId, amountPaid: Number(amountPaid), paymentMethod }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data?.error || data?.message || 'Payment failed');
      setStatus(data?.message || 'Payment request saved. The current backend still returns a stub response.');
    } catch (error: any) {
      setStatus(error.message || 'Payment failed');
    }
  }

  return (
    <div className="stack">
      <input className="input" placeholder="Amount" value={amountPaid} onChange={(e) => setAmountPaid(e.target.value)} />
      <select className="select" value={paymentMethod} onChange={(e) => setPaymentMethod(e.target.value)}>
        <option value="cash">Cash</option>
        <option value="card">Card</option>
        <option value="bank_transfer">Bank Transfer</option>
        <option value="cliq">CliQ</option>
        <option value="efawateer">eFAWATEER</option>
        <option value="other">Other</option>
      </select>
      <button onClick={submit} className="button button--primary">Save Payment</button>
      {status ? <div className="notice">{status}</div> : null}
    </div>
  );
}
