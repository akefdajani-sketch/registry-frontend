import { fetchJson } from '../../lib/api';
import EmptyState from '../../components/shared/EmptyState';
import ErrorState from '../../components/shared/ErrorState';

export default async function OwnersPage() {
  try {
    const data = await fetchJson<{ items: any[] }>('/api/owners');
    return (
      <main className="page">
        <section className="page__header">
          <div>
            <h1 className="page__title">Owners</h1>
            <p className="page__subtitle">Registry owners loaded from the backend.</p>
          </div>
        </section>
        {data.items.length ? <section className="stack">
          {data.items.map((owner) => (
            <a key={owner.id} href={`/owners/${owner.id}/dues`} className="card card--link">
              <h2 className="card__title">{owner.full_name}</h2>
              <div className="card__label">{owner.email || '-'} | {owner.phone || '-'}</div>
            </a>
          ))}
        </section> : <EmptyState title="No owners yet" description="Create or seed owners to populate this page." />}
      </main>
    );
  } catch (error: any) {
    return <main className="page"><ErrorState title="Owners failed to load" description={error?.message || 'Unknown error'} /></main>;
  }
}
