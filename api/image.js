export default async function handler(request, response) {
  const id = String(request.query.id || "");
  if (!/^[\w-]{20,}$/.test(id)) return response.status(400).end();
  try {
    const upstream = await fetch(`https://drive.google.com/thumbnail?id=${id}&sz=w2000`, {
      redirect: "follow", signal: AbortSignal.timeout(10000),
    });
    const type = upstream.headers.get("content-type") || "";
    if (!upstream.ok || !type.startsWith("image/")) return response.status(404).end();
    response.setHeader("Content-Type", type);
    response.setHeader("Cache-Control", "public, s-maxage=3600, stale-while-revalidate=86400");
    return response.status(200).send(Buffer.from(await upstream.arrayBuffer()));
  } catch {
    return response.status(502).end();
  }
}
