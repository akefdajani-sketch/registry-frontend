import { fetchJson } from '../../lib/api';
import EmptyState from '../../components/shared/EmptyState';
import ErrorState from '../../components/shared/ErrorState';

export default async function TenantsPage() {
  try {
    const data = await fetchJson<{ items: any[] }>('/api/tenants');
    return (
      <main className="page">
        <section className="page__header">
          <div>
            <h1 className="page__title">Tenants</h1>
            <p className="page__subtitle">Registry tenants loaded from the backend.</p>
          </div>
        </section>
        {data.items.length ? <section className="stack">
          {data.items.map((tenant) => (
            <a key={tenant.id} href={`/tenants/${tenant.id}/dues`} className="card card--link">
              <h2 className="card__title">{tenant.full_name}</h2>
              <div className="card__label">{tenant.email || '-'} | {tenant.phone || '-'}</div>
            </a>
          ))}
        </section> : <EmptyState title="No tenants yet" description="Create or seed tenants to populate this page." />}
      </main>
    );
  } catch (error: any) {
    return <main className="page"><ErrorState title="Tenants failed to load" description={error?.message || 'Unknown error'} /></main>;
  }
}
