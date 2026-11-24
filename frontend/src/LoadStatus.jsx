export default function LoadStatus({ resource, label }) {
  if (resource.loading) return <p role="status">Loading {label}…</p>;
  if (!resource.error) return null;
  return (
    <div role="alert">
      <p className="error">{resource.error}</p>
      <button type="button" onClick={resource.reload}>Retry loading {label}</button>
    </div>
  );
}
