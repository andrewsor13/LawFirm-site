export async function safeFetcher<T>(url: string): Promise<T | null> {
  try {
    const res = await fetch(url);
    if (!res.ok) {
      console.warn(`⚠️ Fetch failed for ${url} — Status: ${res.status}`);
      return null;
    }
    return await res.json();
  } catch (err) {
    console.error(`❌ Fetch error for ${url}:`, err);
    return null;
  }
}
