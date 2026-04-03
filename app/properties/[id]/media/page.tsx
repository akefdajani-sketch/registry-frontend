import UploadMediaButton from '../../../../components/media/UploadMediaButton';

export default async function PropertyMediaPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  return (
    <main style={{ padding: 24 }}>
      <h1 style={{ fontSize: 28, marginBottom: 20 }}>Property Media</h1>
      <p style={{ marginBottom: 16 }}>Use this page to upload property images and documents.</p>
      <UploadMediaButton
        municipalityId="REPLACE_WITH_MUNICIPALITY_ID"
        entityType="property"
        entityId={id}
        mediaCategory="property_image"
      />
    </main>
  );
}
