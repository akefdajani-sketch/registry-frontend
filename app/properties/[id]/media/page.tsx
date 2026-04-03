import UploadMediaButton from '../../../../components/media/UploadMediaButton';

export default async function PropertyMediaPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;

  return (
    <main className="page">
      <section className="page__header">
        <div>
          <h1 className="page__title">Property Media</h1>
          <p className="page__subtitle">Upload images and documents linked to this property.</p>
        </div>
      </section>

      <div className="notice">Replace the placeholder municipality ID below with a real one from your seeded data before using uploads in production.</div>

      <UploadMediaButton
        municipalityId="REPLACE_WITH_MUNICIPALITY_ID"
        entityType="property"
        entityId={id}
        mediaCategory="property_image"
      />
    </main>
  );
}
