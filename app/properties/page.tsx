async function getProperties() {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/properties`, {
    cache: 'no-store',
  });
  return res.json();
}

export default async function PropertiesPage() {
  const data = await getProperties();

  return (
    <main style={{ padding: 24 }}>
      <h1 style={{ fontSize: 28, marginBottom: 20 }}>Properties</h1>
      <div style={{ display: 'grid', gap: 16 }}>
        {data.items?.map((property: any) => (
          <a
            key={property.id}
            href={`/properties/${property.id}`}
            style={{
              border: '1px solid #ddd',
              borderRadius: 16,
              padding: 16,
              display: 'block',
            }}
          >
            <div style={{ fontWeight: 600 }}>{property.title}</div>
            <div style={{ fontSize: 14, opacity: 0.7 }}>{property.property_type}</div>
          </a>
        ))}
      </div>
    </main>
  );
}
