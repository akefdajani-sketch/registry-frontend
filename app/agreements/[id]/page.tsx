async function getAgreement(id: string) {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/agreements/${id}`, {
    cache: 'no-store',
  });
  return res.json();
}

export default async function AgreementDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const data = await getAgreement(id);

  return (
    <main style={{ padding: 24 }}>
      <div style={{ marginBottom: 24 }}>
        <h1 style={{ fontSize: 28, marginBottom: 8 }}>Agreement</h1>
        <p style={{ fontSize: 14, opacity: 0.7 }}>{data.agreement?.reference_number || data.agreement?.id}</p>
      </div>

      <section style={{ display: 'grid', gap: 16, gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', marginBottom: 24 }}>
        <div style={cardStyle}><div style={labelStyle}>Type</div><div>{data.agreement?.agreement_type}</div></div>
        <div style={cardStyle}><div style={labelStyle}>Status</div><div>{data.agreement?.agreement_status}</div></div>
        <div style={cardStyle}><div style={labelStyle}>Rent</div><div>{data.agreement?.rent_amount ?? '-'} JOD</div></div>
      </section>

      <section style={{ display: 'grid', gap: 12 }}>
        <h2 style={{ fontSize: 22 }}>Obligations</h2>
        {data.obligations?.map((item: any) => (
          <div key={item.id} style={cardStyle}>
            <div style={{ fontWeight: 600 }}>{item.title}</div>
            <div style={{ fontSize: 14, opacity: 0.7 }}>Due: {item.amount_due} | Paid: {item.amount_paid} | Remaining: {item.amount_remaining}</div>
          </div>
        ))}
      </section>
    </main>
  );
}

const cardStyle: React.CSSProperties = { border: '1px solid #ddd', borderRadius: 16, padding: 16 };
const labelStyle: React.CSSProperties = { fontSize: 14, opacity: 0.7, marginBottom: 8 };
