export default async function handler(request, response) {
  const endpoint = process.env.CONTENT_WEB_APP_URL;
  if (!endpoint) return response.status(503).json({ error: "CONTENT_WEB_APP_URL is not configured" });

  try {
    const url = new URL(endpoint);
    url.searchParams.set("mode", process.env.VERCEL_ENV === "preview" ? "preview" : "published");
    const upstream = await fetch(url, { redirect: "follow", signal: AbortSignal.timeout(10000) });
    if (!upstream.ok) throw new Error(`Content source returned ${upstream.status}`);
    const content = await upstream.json();
    if (!content?.general?.businessName || content.error) throw new Error(content?.error || "Invalid content");
    response.setHeader("Cache-Control", "public, s-maxage=60, stale-while-revalidate=300");
    return response.status(200).json(content);
  } catch (error) {
    return response.status(502).json({ error: "Content source unavailable" });
  }
}
