import { fetchJson } from '../../../lib/api';

type ImprovementResponse = {
  improvement: any;
  materials: any[];
  media: any[];
  notes: any[];
};

async function getImprovement(id: string) {
  return fetchJson<ImprovementResponse>(`/api/improvements/${id}`).catch(() => ({ improvement: null, materials: [], media: [], notes: [] }));
}

export default async function ImprovementDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const data = await getImprovement(id);

  return (
    <main className="page">
      <section className="page__header">
        <div>
          <h1 className="page__title">Improvement Detail</h1>
          <p className="page__subtitle">Improvement ID: {id}</p>
        </div>
      </section>

      <section className="grid grid--two">
        <article className="card">
          <h2 className="card__title">Overview</h2>
          <div className="stack">
            <div>{data.improvement?.title || 'Not available yet'}</div>
            <div className="card__label">{data.improvement?.status || 'Stub response'}</div>
            <div>Estimated: {data.improvement?.estimated_cost ?? '-'} | Actual: {data.improvement?.actual_cost ?? '-'}</div>
          </div>
        </article>
        <article className="card">
          <h2 className="card__title">Materials</h2>
          <div className="stack">
            {data.materials.length ? data.materials.map((item) => (
              <div key={item.id} className="card">{item.material_name}</div>
            )) : <div className="empty">The improvement detail endpoint is still a scaffold response.</div>}
          </div>
        </article>
      </section>

      <section className="card">
        <h2 className="card__title">Notes</h2>
        <div className="stack">
          {data.notes.length ? data.notes.map((item) => (
            <div key={item.id} className="card">{item.title}</div>
          )) : <div className="empty">No value notes returned yet.</div>}
        </div>
      </section>
    </main>
  );
}
