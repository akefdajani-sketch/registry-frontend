import Link from 'next/link';

export default function NotFound() {
  return (
    <main className="page">
      <section className="page__header">
        <div>
          <h1 className="page__title">Page not found</h1>
          <p className="page__subtitle">The requested registry route does not exist in this build.</p>
        </div>
      </section>
      <Link href="/dashboard" className="pill">Back to Dashboard</Link>
    </main>
  );
}
