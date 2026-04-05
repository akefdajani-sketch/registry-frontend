export default function EmptyState({ title = 'No data found', description }: { title?: string; description?: string }) {
  return (
    <div className="empty">
      <strong>{title}</strong>{description ? <div style={{ marginTop: 8 }}>{description}</div> : null}
    </div>
  );
}
