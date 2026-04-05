import { fetchJson } from '../../../lib/api';
import ApplyPaymentForm from '../../../components/payments/ApplyPaymentForm';
import EmptyState from '../../../components/shared/EmptyState';
import ErrorState from '../../../components/shared/ErrorState';

type AgreementResponse = { agreement: any; obligations: any[]; payments: any[] };

export default async function AgreementDetailPage({ params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params;
    const data = await fetchJson<AgreementResponse>(`/api/agreements/${id}`);

    return (
      <main className="page">
        <section className="page__header">
          <div>
            <h1 className="page__title">Agreement</h1>
            <p className="page__subtitle">{data.agreement.reference_number || data.agreement.id}</p>
          </div>
        </section>

        <section className="grid grid--cards">
          <article className="card"><div className="card__label">Type</div><div className="metric" style={{fontSize:'1.2rem'}}>{data.agreement.agreement_type}</div></article>
          <article className="card"><div className="card__label">Status</div><div className="metric" style={{fontSize:'1.2rem'}}>{data.agreement.agreement_status}</div></article>
          <article className="card"><div className="card__label">Rent</div><div className="metric" style={{fontSize:'1.2rem'}}>{data.agreement.rent_amount ?? '-'} JOD</div></article>
        </section>

        <section className="grid grid--two">
          <article className="card">
            <h2 className="card__title">Obligations</h2>
            <div className="stack">
              {data.obligations.length ? data.obligations.map((item) => (
                <div key={item.id} className="card">
                  <div className="card__title">{item.title}</div>
                  <div className="card__label">Due: {item.amount_due} | Paid: {item.amount_paid} | Remaining: {item.amount_remaining}</div>
                  <div className="card__label">Status: {item.status}</div>
                  <ApplyPaymentForm municipalityId={data.agreement.municipality_id} obligationId={item.id} />
                </div>
              )) : <EmptyState title="No obligations" description="This agreement has no obligations yet." />}
            </div>
          </article>
          <article className="card">
            <h2 className="card__title">Payments</h2>
            <div className="stack">
              {data.payments.length ? data.payments.map((item) => (
                <div key={item.id} className="card">
                  <div>{item.amount_paid} {item.currency_code || 'JOD'}</div>
                  <div className="card__label">{item.payment_method} • {item.paid_at || item.created_at}</div>
                </div>
              )) : <EmptyState title="No payments" description="No payments have been posted yet." />}
            </div>
          </article>
        </section>
      </main>
    );
  } catch (error: any) {
    return <main className="page"><ErrorState title="Agreement failed to load" description={error?.message || 'Unknown error'} /></main>;
  }
}
