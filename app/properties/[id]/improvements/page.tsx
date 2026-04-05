import { fetchJson } from '../../../../lib/api';
import EmptyState from '../../../../components/shared/EmptyState';
import ErrorState from '../../../../components/shared/ErrorState';

type TimelineItem = { id: string; title: string; category_label?: string | null; contractor_company?: string | null; improvement_type?: string | null; estimated_cost?: number | null; actual_cost?: number | null; status?: string | null };

export default async function PropertyImprovementsPage({ params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params;
    const data = await fetchJson<{ items: TimelineItem[] }>(`/api/properties/${id}/improvement-timeline`);

    return (
      <main className="page">
        <section className="page__header">
          <div>
            <h1 className="page__title">Property Improvements</h1>
            <p className="page__subtitle">Timeline of renovation and improvement work.</p>
          </div>
        </section>

        {data.items.length ? <section className="stack">
          {data.items.map((item) => (
            <a key={item.id} href={`/improvements/${item.id}`} className="card card--link">
              <h2 className="card__title">{item.title}</h2>
              <div className="card__label">{item.category_label || item.improvement_type || 'General'}</div>
              <div>{item.contractor_company ? `Contractor: ${item.contractor_company} • ` : ''}Estimated: {item.estimated_cost ?? '-'} | Actual: {item.actual_cost ?? '-'}</div>
              <div className="card__label">Status: {item.status || 'planned'}</div>
            </a>
          ))}
        </section> : <EmptyState title="No improvements yet" description="This property has no recorded improvement history." />}
      </main>
    );
  } catch (error: any) {
    return <main className="page"><ErrorState title="Improvements failed to load" description={error?.message || 'Unknown error'} /></main>;
  }
}
