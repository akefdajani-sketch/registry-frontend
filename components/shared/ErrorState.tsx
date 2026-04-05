export default function ErrorState({ title = 'Something went wrong', description }: { title?: string; description?: string }) {
  return (
    <div className="notice" style={{ borderColor: 'rgba(220,38,38,.22)', background: 'rgba(239,68,68,.08)' }}>
      <strong>{title}</strong>{description ? <div style={{ marginTop: 8 }}>{description}</div> : null}
    </div>
  );
}
