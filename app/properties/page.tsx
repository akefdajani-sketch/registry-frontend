import Link from 'next/link';
import { fetchJson } from '../../lib/api';

type Property = {
  id: string;
  title: string;
  property_type: string;
  city?: string | null;
  region?: string | null;
  registry_status?: string | null;
};

async function getProperties() {
  return fetchJson<{ items: Property[] }>('/api/properties').catch(() => ({ items: [] }));
}

export default async function PropertiesPage() {
  const data = await getProperties();

  return (
    <main className="page">
      <section className="page__header">
        <div>
          <h1 className="page__title">Properties</h1>
          <p className="page__subtitle">Property records from the registry backend.</p>
        </div>
        <div className="pill-row">
          <Link href="/dashboard" className="pill">Back to Dashboard</Link>
        </div>
      </section>

      <section className="grid">
        {data.items.length ? data.items.map((property) => (
          <Link key={property.id} href={`/properties/${property.id}`} className="card card--link">
            <h2 className="card__title">{property.title}</h2>
            <div className="card__label">{property.property_type}</div>
            <div className="stack">
              <span>{[property.city, property.region].filter(Boolean).join(', ') || 'No location saved yet'}</span>
              <span className="card__label">Status: {property.registry_status || 'active'}</span>
            </div>
          </Link>
        )) : <div className="empty">No properties have been created yet. Insert a seed row or create one through the backend route.</div>}
      </section>
    </main>
  );
}
