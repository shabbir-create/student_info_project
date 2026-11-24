import { useEffect, useState } from "react";
import { requestPortal } from "./api";

export function usePortalData(path) {
  const [data, setData] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(Boolean(path));
  const [attempt, setAttempt] = useState(0);

  useEffect(() => {
    if (!path) return;
    const controller = new AbortController();
    setLoading(true);
    setError("");
    requestPortal(path, { signal: controller.signal })
      .then(value => { if (!controller.signal.aborted) setData(value); })
      .catch(failure => { if (!controller.signal.aborted) setError(failure.message); })
      .finally(() => { if (!controller.signal.aborted) setLoading(false); });
    return () => controller.abort();
  }, [path, attempt]);

  return { data, error, loading, reload: () => setAttempt(value => value + 1) };
}
