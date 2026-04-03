async function getDueCenter(propertyId: string) {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/due-center/property/${propertyId}`,
    { cache: 'no-store' }
  );
  return res.json();
}

export default async function PropertyDueCenterPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const data = await getDueCenter(id);

  return (
    <main style={{ padding: 24 }}>
      <h1 style={{ fontSize: 28, marginBottom: 20 }}>Property Due Center</h1>

      <section style={{ display: 'grid', gap: 16, gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', marginBottom: 24 }}>
        {data.summary?.map((row: any, index: number) => (
          <div key={index} style={cardStyle}>
            <div style={{ fontWeight: 600 }}>{row.obligation_type}</div>
            <div style={{ fontSize: 14, opacity: 0.7 }}>Status: {row.status}</div>
            <div style={{ fontSize: 14 }}>Due: {row.total_due} | Paid: {row.total_paid} | Remaining: {row.total_remaining}</div>
          </div>
        ))}
      </section>

      <section style={{ display: 'grid', gap: 12 }}>
        {data.dues?.map((item: any) => (
          <div key={item.id} style={cardStyle}>
            <div style={{ fontWeight: 600 }}>{item.title}</div>
            <div style={{ fontSize: 14, opacity: 0.7 }}>
              {item.obligation_type} | Due {item.due_date || '-'} | Status {item.status}
            </div>
            <div style={{ fontSize: 14 }}>Amount: {item.amount_due} | Remaining: {item.amount_remaining}</div>
            <div style={{ fontSize: 14, opacity: 0.7 }}>Responsible: {item.responsible_party_type}</div>
          </div>
        ))}
      </section>
    </main>
  );
}

const cardStyle: React.CSSProperties = { border: '1px solid #ddd', borderRadius: 16, padding: 16 };
