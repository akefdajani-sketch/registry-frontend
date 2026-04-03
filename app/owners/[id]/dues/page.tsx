import { fetchJson } from '../../../../lib/api';

async function getOwnerDues(ownerId: string) {
  return fetchJson<{ dues: any[] }>(`/api/due-center/owner/${ownerId}`).catch(() => ({ dues: [] }));
}

export default async function OwnerDuesPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const data = await getOwnerDues(id);

  return (
    <main className="page">
      <section className="page__header">
        <div>
          <h1 className="page__title">Owner Dues</h1>
          <p className="page__subtitle">Owner ID: {id}</p>
        </div>
      </section>
      {data.dues.length ? data.dues.map((item) => (
        <article key={item.id} className="card">
          <h2 className="card__title">{item.title}</h2>
          <div className="card__label">{item.obligation_type} | Status {item.status}</div>
        </article>
      )) : <div className="empty">This endpoint is not yet available in the current backend build.</div>}
    </main>
  );
}
