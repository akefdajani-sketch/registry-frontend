export default function DashboardPage() {
  return (
    <main style={{ padding: 24 }}>
      <h1 style={{ fontSize: 28, marginBottom: 20 }}>Municipality Dashboard</h1>
      <div
        style={{
          display: 'grid',
          gap: 16,
          gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
        }}
      >
        {['Total Properties', 'Active Agreements', 'Outstanding Obligations', 'Collected Revenue'].map((item) => (
          <div
            key={item}
            style={{ border: '1px solid #ddd', borderRadius: 16, padding: 16 }}
          >
            {item}
          </div>
        ))}
      </div>
    </main>
  );
}
