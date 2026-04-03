import { fetchJson } from '../../../../lib/api';

type DueSummary = { obligation_type: string; status: string; total_due: number; total_paid: number; total_remaining: number };
type Due = { id: string; title: string; obligation_type: string; due_date?: string | null; status: string; amount_due: number; amount_remaining: number; responsible_party_type?: string | null };

async function getDueCenter(propertyId: string) {
  return fetchJson<{ dues: Due[]; summary: DueSummary[] }>(`/api/due-center/property/${propertyId}`).catch(() => ({ dues: [], summary: [] }));
}

export default async function PropertyDueCenterPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const data = await getDueCenter(id);

  return (
    <main className="page">
      <section className="page__header">
        <div>
          <h1 className="page__title">Property Due Center</h1>
          <p className="page__subtitle">Unified view of all dues linked to this property.</p>
        </div>
      </section>

      <section className="grid grid--two">
        {data.summary.length ? data.summary.map((row, index) => (
          <article key={`${row.obligation_type}-${index}`} className="card">
            <h2 className="card__title">{row.obligation_type}</h2>
            <div className="card__label">Status: {row.status}</div>
            <div>Due: {row.total_due} | Paid: {row.total_paid} | Remaining: {row.total_remaining}</div>
          </article>
        )) : <div className="empty">No due summary is available yet. The current backend still returns an empty stub response for this endpoint.</div>}
      </section>

      <section className="stack">
        {data.dues.map((item) => (
          <article key={item.id} className="card">
            <h2 className="card__title">{item.title}</h2>
            <div className="card__label">{item.obligation_type} | Due {item.due_date || '-'} | Status {item.status}</div>
            <div>Amount: {item.amount_due} | Remaining: {item.amount_remaining}</div>
            <div className="card__label">Responsible: {item.responsible_party_type || 'unassigned'}</div>
          </article>
        ))}
      </section>
    </main>
  );
}
