async function getTimeline(propertyId: string) {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/properties/${propertyId}/improvement-timeline`,
    { cache: 'no-store' }
  );
  return res.json();
}

export default async function PropertyImprovementsPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const data = await getTimeline(id);

  return (
    <main style={{ padding: 24 }}>
      <h1 style={{ fontSize: 28, marginBottom: 20 }}>Property Improvements</h1>
      <div style={{ display: 'grid', gap: 12 }}>
        {data.items?.map((item: any) => (
          <a key={item.id} href={`/improvements/${item.id}`} style={cardStyle}>
            <div style={{ fontWeight: 600 }}>{item.title}</div>
            <div style={{ fontSize: 14, opacity: 0.7 }}>{item.category_label || item.improvement_type || 'General'}</div>
            <div style={{ fontSize: 14 }}>Estimated: {item.estimated_cost ?? '-'} | Actual: {item.actual_cost ?? '-'}</div>
            <div style={{ fontSize: 14, opacity: 0.7 }}>Status: {item.status}</div>
          </a>
        ))}
      </div>
    </main>
  );
}

const cardStyle: React.CSSProperties = { border: '1px solid #ddd', borderRadius: 16, padding: 16, display: 'block' };
