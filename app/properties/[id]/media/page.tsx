import { fetchJson } from '../../../../lib/api';
import UploadMediaButton from '../../../../components/media/UploadMediaButton';
import EmptyState from '../../../../components/shared/EmptyState';
import ErrorState from '../../../../components/shared/ErrorState';

type PropertyResponse = { property: { municipality_id: string }; media: any[] };

export default async function PropertyMediaPage({ params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params;
    const data = await fetchJson<PropertyResponse>(`/api/properties/${id}`);

    return (
      <main className="page">
        <section className="page__header">
          <div>
            <h1 className="page__title">Property Media</h1>
            <p className="page__subtitle">Upload images and documents linked to this property.</p>
          </div>
        </section>

        <UploadMediaButton municipalityId={data.property.municipality_id} entityType="property" entityId={id} mediaCategory="property_image" />

        {data.media?.length ? <section className="stack">
          {data.media.map((item) => (
            <article key={item.id} className="card">
              <h2 className="card__title">{item.file_name}</h2>
              <div className="card__label">{item.media_category}</div>
              <div>{item.public_url || item.r2_key}</div>
            </article>
          ))}
        </section> : <EmptyState title="No media yet" description="Upload the first property image or blueprint." />}
      </main>
    );
  } catch (error: any) {
    return <main className="page"><ErrorState title="Property media failed to load" description={error?.message || 'Unknown error'} /></main>;
  }
}
