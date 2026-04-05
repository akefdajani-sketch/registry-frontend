export default function LoadingState({ title = 'Loading...' }: { title?: string }) {
  return <div className="notice">{title}</div>;
}
