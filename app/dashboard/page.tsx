import Link from 'next/link';
import { fetchJson } from '../../lib/api';

type Property = { id: string; title: string; property_type: string };

type PropertiesResponse = { items: Property[] };

type HealthResponse = { ok: boolean; service: string };

async function getDashboardData() {
  const [health, properties] = await Promise.all([
    fetchJson<HealthResponse>('/health').catch(() => ({ ok: false, service: 'unreachable' })),
    fetchJson<PropertiesResponse>('/api/properties').catch(() => ({ items: [] })),
  ]);

  return { health, properties };
}

export default async function DashboardPage() {
  const { health, properties } = await getDashboardData();
  const cards = [
    { label: 'Total Properties', value: properties.items.length },
    { label: 'API Status', value: health.ok ? 'Online' : 'Offline' },
    { label: 'Agreement Flow', value: 'Ready for wiring' },
    { label: 'Due Center', value: 'Shell live' },
  ];

  return (
    <main className="page">
      <section className="page__header">
        <div>
          <h1 className="page__title">Municipality Dashboard</h1>
          <p className="page__subtitle">
            Live registry shell connected to the deployed backend.
          </p>
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
            <div className="notice">Frontend deployment is live and the dashboard is now wired to the backend health and properties endpoints.</div>
            <div className="empty">Next recommended step: finish the backend agreement, dues, improvements, and media routes so these pages can render real records instead of scaffold shells.</div>
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
}
