import { fetchJson } from '../../../lib/api';
import EmptyState from '../../../components/shared/EmptyState';
import ErrorState from '../../../components/shared/ErrorState';

type ImprovementResponse = { improvement: any; materials: any[]; media: any[]; notes: any[] };

export default async function ImprovementDetailPage({ params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params;
    const data = await fetchJson<ImprovementResponse>(`/api/improvements/${id}`);

    return (
      <main className="page">
        <section className="page__header">
          <div>
            <h1 className="page__title">{data.improvement?.title || 'Improvement Detail'}</h1>
            <p className="page__subtitle">Improvement ID: {id}</p>
          </div>
        </section>

        <section className="grid grid--two">
          <article className="card">
            <h2 className="card__title">Overview</h2>
            <div className="stack">
              <div className="card__label">{data.improvement?.status || '—'}</div>
              <div>Estimated: {data.improvement?.estimated_cost ?? '-'} | Actual: {data.improvement?.actual_cost ?? '-'}</div>
              <div>Start: {data.improvement?.start_date || '-'} | End: {data.improvement?.end_date || '-'}</div>
              <div>Contractor ID: {data.improvement?.contractor_id || '—'}</div>
            </div>
          </article>
          <article className="card">
            <h2 className="card__title">Materials</h2>
            <div className="stack">
              {data.materials.length ? data.materials.map((item) => (
                <div key={item.id} className="card">{item.material_name} {item.total_cost ? `• ${item.total_cost}` : ''}</div>
              )) : <EmptyState title="No materials yet" description="Add materials from the backend or extend the UI with a material form." />}
            </div>
          </article>
        </section>

        <section className="grid grid--two">
          <article className="card">
            <h2 className="card__title">Media</h2>
            <div className="stack">
              {data.media.length ? data.media.map((item) => (
                <div key={item.id} className="card">{item.file_name}</div>
              )) : <EmptyState title="No media yet" />}
            </div>
          </article>
          <article className="card">
            <h2 className="card__title">Notes</h2>
            <div className="stack">
              {data.notes.length ? data.notes.map((item) => (
                <div key={item.id} className="card">{item.title}</div>
              )) : <EmptyState title="No value notes yet" />}
            </div>
          </article>
        </section>
      </main>
    );
  } catch (error: any) {
    return <main className="page"><ErrorState title="Improvement failed to load" description={error?.message || 'Unknown error'} /></main>;
  }
}
