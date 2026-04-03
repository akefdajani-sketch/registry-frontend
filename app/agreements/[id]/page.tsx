import { fetchJson } from '../../../lib/api';
import ApplyPaymentForm from '../../../components/payments/ApplyPaymentForm';

type AgreementDetail = {
  agreement: any;
  obligations: any[];
  payments: any[];
};

async function getAgreement(id: string) {
  return fetchJson<AgreementDetail>(`/api/agreements/${id}`).catch(() => ({ agreement: null, obligations: [], payments: [] }));
}

export default async function AgreementDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const data = await getAgreement(id);

  return (
    <main className="page">
      <section className="page__header">
        <div>
          <h1 className="page__title">Agreement</h1>
          <p className="page__subtitle">{data.agreement?.reference_number || data.agreement?.id || id}</p>
        </div>
      </section>

      <section className="grid grid--cards">
        <article className="card"><div className="card__label">Type</div><div>{data.agreement?.agreement_type || 'Not available yet'}</div></article>
        <article className="card"><div className="card__label">Status</div><div>{data.agreement?.agreement_status || 'Stub response'}</div></article>
        <article className="card"><div className="card__label">Rent</div><div>{data.agreement?.rent_amount ?? '-'} JOD</div></article>
      </section>

      <section className="grid grid--two">
        <article className="card">
          <h2 className="card__title">Obligations</h2>
          <div className="stack">
            {data.obligations.length ? data.obligations.map((item) => (
              <div key={item.id} className="card">
                <strong>{item.title}</strong>
                <div className="card__label">Due: {item.amount_due} | Paid: {item.amount_paid} | Remaining: {item.amount_remaining}</div>
              </div>
            )) : <div className="empty">The backend currently returns an empty agreement payload. This page is already ready for the full response once implemented.</div>}
          </div>
        </article>
        <article className="card">
          <h2 className="card__title">Payment Action</h2>
          <ApplyPaymentForm municipalityId="REPLACE_WITH_MUNICIPALITY_ID" obligationId="REPLACE_WITH_OBLIGATION_ID" />
        </article>
      </section>
    </main>
  );
}
