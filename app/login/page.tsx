export default function LoginPage() {
  return (
    <main className="page">
      <section className="page__header">
        <div>
          <h1 className="page__title">Registry Login</h1>
          <p className="page__subtitle">Authentication shell reserved for the next phase.</p>
        </div>
      </section>
      <div className="notice">This deployment is currently focused on wiring the registry frontend to the real backend. Login and RBAC can be layered in after the CRUD flows are live.</div>
    </main>
  );
}
