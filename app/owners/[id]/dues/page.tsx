import { fetchJson } from '../../../../lib/api';
import EmptyState from '../../../../components/shared/EmptyState';
import ErrorState from '../../../../components/shared/ErrorState';

export default async function OwnerDuesPage({ params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params;
    const data = await fetchJson<{ dues: any[] }>(`/api/due-center/owner/${id}`);
    return (
      <main className="page">
        <section className="page__header">
          <div>
            <h1 className="page__title">Owner Dues</h1>
            <p className="page__subtitle">Owner ID: {id}</p>
          </div>
        </section>
        {data.dues.length ? <section className="stack">
          {data.dues.map((item) => (
            <article key={item.id} className="card">
              <h2 className="card__title">{item.title}</h2>
              <div className="card__label">{item.obligation_type} | Status {item.status}</div>
              <div>Amount: {item.amount_due} | Remaining: {item.amount_remaining}</div>
            </article>
          ))}
        </section> : <EmptyState title="No owner dues" description="No dues are currently assigned to this owner." />}
      </main>
    );
  } catch (error: any) {
    return <main className="page"><ErrorState title="Owner dues failed to load" description={error?.message || 'Unknown error'} /></main>;
  }
}
