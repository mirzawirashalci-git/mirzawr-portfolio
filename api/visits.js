// Visitor counter for mirzawr.com
// GET  /api/visits  -> { count }            (read only)
// POST /api/visits  -> { count }            (adds one visitor)
// Storage: Upstash Redis, connected through Vercel → Storage → Upstash (free tier).
// Vercel injects KV_REST_API_URL / KV_REST_API_TOKEN (or UPSTASH_REDIS_REST_URL / _TOKEN).
// Optional: VISITS_OFFSET env var, added to the stored count (e.g. to carry over an old count).

const KEY = 'mirzawr:visits';

export default async function handler(req, res) {
  const url = process.env.KV_REST_API_URL || process.env.UPSTASH_REDIS_REST_URL;
  const token = process.env.KV_REST_API_TOKEN || process.env.UPSTASH_REDIS_REST_TOKEN;
  res.setHeader('Cache-Control', 'no-store');
  if (!url || !token) return res.status(503).json({ error: 'counter not configured' });

  const cmd = req.method === 'POST' ? `incr/${KEY}` : `get/${KEY}`;
  try {
    const r = await fetch(`${url}/${cmd}`, { headers: { Authorization: `Bearer ${token}` } });
    const { result } = await r.json();
    const offset = parseInt(process.env.VISITS_OFFSET || '0', 10) || 0;
    return res.status(200).json({ count: (parseInt(result, 10) || 0) + offset });
  } catch (e) {
    return res.status(500).json({ error: 'counter unavailable' });
  }
}
