import Link from 'next/link';
import { fetchJson } from '../../../lib/api';
import ErrorState from '../../../components/shared/ErrorState';

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
  ledgerSummary: { total_due: string | number; total_paid: string | number; total_remaining: string | number };
  obligations: any[];
  payments: any[];
  improvements: any[];
  media: any[];
};

export default async function PropertyDetailPage({ params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params;
    const data = await fetchJson<PropertyDetail>(`/api/properties/${id}`);
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
          <article className="card"><dl className="kv"><dt>Total Due</dt><dd>{data.ledgerSummary.total_due}</dd></dl></article>
          <article className="card"><dl className="kv"><dt>Total Paid</dt><dd>{data.ledgerSummary.total_paid}</dd></dl></article>
          <article className="card"><dl className="kv"><dt>Remaining</dt><dd>{data.ledgerSummary.total_remaining}</dd></dl></article>
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
              <span className="card__label">Owner ID: {property.owner_id || 'Unassigned'}</span>
            </div>
          </article>
        </section>
      </main>
    );
  } catch (error: any) {
    return <main className="page"><ErrorState title="Property detail failed to load" description={error?.message || 'Unknown error'} /></main>;
  }
}
