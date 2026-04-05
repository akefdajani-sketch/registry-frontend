import { fetchJson } from '../../../../lib/api';
import EmptyState from '../../../../components/shared/EmptyState';
import ErrorState from '../../../../components/shared/ErrorState';

type PropertyDetail = { property: { title: string }; obligations: any[] };

export default async function PropertyObligationsPage({ params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params;
    const data = await fetchJson<PropertyDetail>(`/api/properties/${id}`);

    return (
      <main className="page">
        <section className="page__header">
          <div>
            <h1 className="page__title">Property Obligations</h1>
            <p className="page__subtitle">{data.property.title}</p>
          </div>
        </section>

        {data.obligations.length ? <section className="stack">
          {data.obligations.map((item) => (
            <article key={item.id} className="card">
              <h2 className="card__title">{item.title}</h2>
              <div className="card__label">{item.obligation_type} | Due {item.due_date || '-'} | Status {item.status}</div>
              <div>Amount: {item.amount_due} | Paid: {item.amount_paid} | Remaining: {item.amount_remaining}</div>
            </article>
          ))}
        </section> : <EmptyState title="No obligations" description="This property has no obligations yet." />}
      </main>
    );
  } catch (error: any) {
    return <main className="page"><ErrorState title="Obligations failed to load" description={error?.message || 'Unknown error'} /></main>;
  }
}
