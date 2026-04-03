import { fetchJson } from '../../../../lib/api';

async function getTenantDues(tenantId: string) {
  return fetchJson<{ dues: any[] }>(`/api/due-center/tenant/${tenantId}`).catch(() => ({ dues: [] }));
}

export default async function TenantDuesPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const data = await getTenantDues(id);

  return (
    <main className="page">
      <section className="page__header">
        <div>
          <h1 className="page__title">Tenant Dues</h1>
          <p className="page__subtitle">Tenant ID: {id}</p>
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
