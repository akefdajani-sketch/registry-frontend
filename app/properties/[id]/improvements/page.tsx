import { fetchJson } from '../../../../lib/api';

type TimelineItem = { id: string; title: string; category_label?: string | null; improvement_type?: string | null; estimated_cost?: number | null; actual_cost?: number | null; status?: string | null };

async function getTimeline(propertyId: string) {
  return fetchJson<{ items: TimelineItem[] }>(`/api/properties/${propertyId}/improvement-timeline`).catch(() => ({ items: [] }));
}

export default async function PropertyImprovementsPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const data = await getTimeline(id);

  return (
    <main className="page">
      <section className="page__header">
        <div>
          <h1 className="page__title">Property Improvements</h1>
          <p className="page__subtitle">Timeline of renovation and improvement work.</p>
        </div>
      </section>

      <section className="stack">
        {data.items.length ? data.items.map((item) => (
          <a key={item.id} href={`/improvements/${item.id}`} className="card card--link">
            <h2 className="card__title">{item.title}</h2>
            <div className="card__label">{item.category_label || item.improvement_type || 'General'}</div>
            <div>Estimated: {item.estimated_cost ?? '-'} | Actual: {item.actual_cost ?? '-'}</div>
            <div className="card__label">Status: {item.status || 'planned'}</div>
          </a>
        )) : <div className="empty">This backend route is not implemented yet. Once <code>/api/properties/:id/improvement-timeline</code> is added, this list will populate automatically.</div>}
      </section>
    </main>
  );
}
