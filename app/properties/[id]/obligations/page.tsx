import { fetchJson } from '../../../../lib/api';

type PropertyDetail = {
  property: { title: string };
};

async function getProperty(id: string) {
  return fetchJson<PropertyDetail>(`/api/properties/${id}`);
}

export default async function PropertyObligationsPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const data = await getProperty(id);

  return (
    <main className="page">
      <section className="page__header">
        <div>
          <h1 className="page__title">Property Obligations</h1>
          <p className="page__subtitle">{data.property.title}</p>
        </div>
      </section>

      <div className="notice">The current registry backend does not yet return obligations from <code>/api/properties/:id</code>. This page is ready for the real ledger response once the backend route is expanded.</div>
    </main>
  );
}
