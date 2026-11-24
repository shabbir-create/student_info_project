export async function requestPortal(path, options) {
  let response;
  try {
    response = await fetch(`/api/${path}`, options);
  } catch (error) {
    if (error.name === "AbortError") throw error;
    throw new Error("Could not reach the portal. Check your connection and try again.");
  }
  if (!response.headers.get("content-type")?.includes("application/json")) {
    throw new Error("The portal API is unavailable. Please try again shortly.");
  }
  const body = await response.json();
  if (!response.ok) throw new Error(body.message || "The request failed. Please try again.");
  return body;
}
