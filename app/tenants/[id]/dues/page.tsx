async function getTenantDues(tenantId: string) {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/due-center/tenant/${tenantId}`,
    { cache: 'no-store' }
  );
  return res.json();
}

export default async function TenantDuesPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const data = await getTenantDues(id);

  return (
    <main style={{ padding: 24 }}>
      <h1 style={{ fontSize: 28, marginBottom: 20 }}>Tenant Dues</h1>
      <div style={{ display: 'grid', gap: 12 }}>
        {data.dues?.map((item: any) => (
          <div key={item.id} style={cardStyle}>
            <div style={{ fontWeight: 600 }}>{item.title}</div>
            <div style={{ fontSize: 14, opacity: 0.7 }}>{item.obligation_type} | Status {item.status}</div>
            <div style={{ fontSize: 14 }}>Due: {item.amount_due} | Remaining: {item.amount_remaining}</div>
          </div>
        ))}
      </div>
    </main>
  );
}

const cardStyle: React.CSSProperties = { border: '1px solid #ddd', borderRadius: 16, padding: 16 };
