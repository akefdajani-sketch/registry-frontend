import Link from 'next/link';
import { fetchJson } from '../../../lib/api';

type PropertyDetail = {
  property: {
    id: string;
    title: string;
    property_type: string;
    owner_id?: string | null;
    registry_status?: string | null;
    total_area_sqm?: number | null;
    address_line_1?: string | null;
    city?: string | null;
    region?: string | null;
    postal_code?: string | null;
    plot_number?: string | null;
    parcel_number?: string | null;
  };
};

async function getProperty(id: string) {
  return fetchJson<PropertyDetail>(`/api/properties/${id}`);
}

export default async function PropertyDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const data = await getProperty(id);
  const property = data.property;

  return (
    <main className="page">
      <section className="page__header">
        <div>
          <h1 className="page__title">{property.title}</h1>
          <p className="page__subtitle">{property.property_type}</p>
        </div>
        <div className="pill-row">
          <Link href="/properties" className="pill">All Properties</Link>
          <Link href={`/properties/${id}/obligations`} className="pill">Obligations</Link>
          <Link href={`/properties/${id}/due-center`} className="pill">Due Center</Link>
          <Link href={`/properties/${id}/improvements`} className="pill">Improvements</Link>
          <Link href={`/properties/${id}/media`} className="pill">Media</Link>
        </div>
      </section>

      <section className="grid grid--cards">
        <article className="card"><dl className="kv"><dt>Owner ID</dt><dd>{property.owner_id || 'Unassigned'}</dd></dl></article>
        <article className="card"><dl className="kv"><dt>Registry Status</dt><dd>{property.registry_status || 'active'}</dd></dl></article>
        <article className="card"><dl className="kv"><dt>Area</dt><dd>{property.total_area_sqm ?? '-'} sqm</dd></dl></article>
      </section>

      <section className="grid grid--two">
        <article className="card">
          <h2 className="card__title">Address</h2>
          <div className="stack">
            <span>{property.address_line_1 || 'No street address saved'}</span>
            <span className="card__label">{[property.city, property.region, property.postal_code].filter(Boolean).join(', ') || 'City/region not saved yet'}</span>
          </div>
        </article>
        <article className="card">
          <h2 className="card__title">Registry identifiers</h2>
          <div className="stack">
            <span>Plot number: {property.plot_number || '—'}</span>
            <span>Parcel number: {property.parcel_number || '—'}</span>
            <span className="card__label">Property ID: {property.id}</span>
          </div>
        </article>
      </section>
    </main>
  );
}
