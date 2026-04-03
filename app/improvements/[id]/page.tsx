async function getImprovement(id: string) {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/improvements/${id}`, {
    cache: 'no-store',
  });
  return res.json();
}

export default async function ImprovementDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const data = await getImprovement(id);

  return (
    <main style={{ padding: 24 }}>
      <h1 style={{ fontSize: 28, marginBottom: 20 }}>Improvement Detail</h1>

      <section style={{ ...cardStyle, marginBottom: 20 }}>
        <div style={{ fontWeight: 600, marginBottom: 8 }}>{data.improvement?.title}</div>
        <div style={{ fontSize: 14, opacity: 0.7, marginBottom: 8 }}>{data.improvement?.status}</div>
        <div style={{ fontSize: 14 }}>Estimated: {data.improvement?.estimated_cost ?? '-'} | Actual: {data.improvement?.actual_cost ?? '-'}</div>
      </section>

      <section style={{ marginBottom: 20 }}>
        <h2 style={{ fontSize: 22, marginBottom: 12 }}>Materials</h2>
        <div style={{ display: 'grid', gap: 12 }}>
          {data.materials?.map((item: any) => (
            <div key={item.id} style={cardStyle}>{item.material_name}</div>
          ))}
        </div>
      </section>

      <section>
        <h2 style={{ fontSize: 22, marginBottom: 12 }}>Notes</h2>
        <div style={{ display: 'grid', gap: 12 }}>
          {data.notes?.map((item: any) => (
            <div key={item.id} style={cardStyle}>{item.title}</div>
          ))}
        </div>
      </section>
    </main>
  );
}

const cardStyle: React.CSSProperties = { border: '1px solid #ddd', borderRadius: 16, padding: 16 };
