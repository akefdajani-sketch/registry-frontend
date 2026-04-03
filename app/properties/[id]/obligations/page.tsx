async function getProperty(id: string) {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/properties/${id}`, {
    cache: 'no-store',
  });
  return res.json();
}

export default async function PropertyObligationsPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const data = await getProperty(id);

  return (
    <main style={{ padding: 24 }}>
      <h1 style={{ fontSize: 28, marginBottom: 20 }}>Property Obligations</h1>

      <div style={{ display: 'grid', gap: 16, gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', marginBottom: 24 }}>
        <div style={cardStyle}>Total Due: {data.ledgerSummary?.total_due ?? 0}</div>
        <div style={cardStyle}>Total Paid: {data.ledgerSummary?.total_paid ?? 0}</div>
        <div style={cardStyle}>Remaining: {data.ledgerSummary?.total_remaining ?? 0}</div>
      </div>

      <div style={{ display: 'grid', gap: 12 }}>
        {data.obligations?.map((item: any) => (
          <div key={item.id} style={cardStyle}>
            <div style={{ fontWeight: 600 }}>{item.title}</div>
            <div style={{ fontSize: 14, opacity: 0.7 }}>
              {item.obligation_type} | Due {item.due_date || '-'} | Status {item.status}
            </div>
            <div style={{ fontSize: 14 }}>
              Amount: {item.amount_due} | Paid: {item.amount_paid} | Remaining: {item.amount_remaining}
            </div>
          </div>
        ))}
      </div>
    </main>
  );
}

const cardStyle: React.CSSProperties = { border: '1px solid #ddd', borderRadius: 16, padding: 16 };
