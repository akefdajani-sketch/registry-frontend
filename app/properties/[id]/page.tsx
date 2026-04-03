async function getProperty(id: string) {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/properties/${id}`, {
    cache: 'no-store',
  });
  return res.json();
}

export default async function PropertyDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const data = await getProperty(id);

  return (
    <main style={{ padding: 24 }}>
      <div style={{ marginBottom: 24 }}>
        <h1 style={{ fontSize: 28, marginBottom: 8 }}>{data.property.title}</h1>
        <p style={{ fontSize: 14, opacity: 0.7 }}>{data.property.property_type}</p>
      </div>

      <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap', marginBottom: 24 }}>
        <a href={`/properties/${id}`} style={pillStyle}>Overview</a>
        <a href={`/properties/${id}/obligations`} style={pillStyle}>Obligations</a>
        <a href={`/properties/${id}/due-center`} style={pillStyle}>Due Center</a>
        <a href={`/properties/${id}/improvements`} style={pillStyle}>Improvements</a>
        <a href={`/properties/${id}/media`} style={pillStyle}>Media</a>
      </div>

      <section style={{ display: 'grid', gap: 16, gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))' }}>
        <div style={cardStyle}><div style={labelStyle}>Owner</div><div>{data.property.owner_id ?? 'Unassigned'}</div></div>
        <div style={cardStyle}><div style={labelStyle}>Registry Status</div><div>{data.property.registry_status}</div></div>
        <div style={cardStyle}><div style={labelStyle}>Area</div><div>{data.property.total_area_sqm ?? '-'} sqm</div></div>
      </section>
    </main>
  );
}

const pillStyle: React.CSSProperties = {
  border: '1px solid #ddd',
  borderRadius: 999,
  padding: '10px 16px',
  fontSize: 14,
};
const cardStyle: React.CSSProperties = { border: '1px solid #ddd', borderRadius: 16, padding: 16 };
const labelStyle: React.CSSProperties = { fontSize: 14, opacity: 0.7, marginBottom: 8 };
