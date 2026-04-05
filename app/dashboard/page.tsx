import Link from 'next/link';
import { fetchJson } from '../../lib/api';
import ErrorState from '../../components/shared/ErrorState';

type Property = { id: string; title: string; property_type: string };
type PropertiesResponse = { items: Property[] };
type HealthResponse = { ok: boolean; service: string };

export default async function DashboardPage() {
  try {
    const [health, properties] = await Promise.all([
      fetchJson<HealthResponse>('/health'),
      fetchJson<PropertiesResponse>('/api/properties'),
    ]);

    const cards = [
      { label: 'Total Properties', value: properties.items.length },
      { label: 'API Status', value: health.ok ? 'Online' : 'Offline' },
      { label: 'Service', value: health.service },
      { label: 'Operational Core', value: 'Connected' },
    ];

    return (
      <main className="page">
        <section className="page__header">
          <div>
            <h1 className="page__title">Municipality Dashboard</h1>
            <p className="page__subtitle">Live registry shell connected to the deployed backend.</p>
          </div>
          <div className="pill-row">
            <Link href="/properties" className="pill">Browse Properties</Link>
            <Link href="/agreements/new" className="pill">Create Agreement</Link>
          </div>
        </section>

        <section className="grid grid--cards">
          {cards.map((card) => (
            <article key={card.label} className="card">
              <div className="card__label">{card.label}</div>
              <p className="metric">{card.value}</p>
            </article>
          ))}
        </section>

        <section className="grid grid--two">
          <article className="card">
            <h2 className="card__title">What is working</h2>
            <div className="stack">
              <div className="notice">Backend health and property count are now wired to live endpoints.</div>
              <div className="empty">Next move: use the create flows for agreements, dues, improvements, and media, then verify the property record updates end to end.</div>
            </div>
          </article>
          <article className="card">
            <h2 className="card__title">Recent properties</h2>
            <div className="stack">
              {properties.items.length ? properties.items.slice(0, 5).map((property) => (
                <Link key={property.id} href={`/properties/${property.id}`} className="card card--link">
                  <strong>{property.title}</strong>
                  <div className="card__label">{property.property_type}</div>
                </Link>
              )) : <div className="empty">No properties found yet in the registry database.</div>}
            </div>
          </article>
        </section>
      </main>
    );
  } catch (error: any) {
    return <main className="page"><ErrorState title="Dashboard failed to load" description={error?.message || 'Unknown error'} /></main>;
  }
}
