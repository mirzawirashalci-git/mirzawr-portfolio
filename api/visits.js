// Visitor counter for mirzawr.com
// GET  /api/visits  -> { count }            (read only)
// POST /api/visits  -> { count }            (adds one visitor)
// Storage: Upstash Redis, connected through Vercel → Storage → Upstash (free tier).
// Vercel injects <PREFIX>_REST_API_URL / <PREFIX>_REST_API_TOKEN (prefix chosen when connecting,
// e.g. KV or STORAGE), or UPSTASH_REDIS_REST_URL / _TOKEN. Any of these is picked up.
// Optional: VISITS_OFFSET env var, added to the stored count (e.g. to carry over an old count).

const KEY = 'mirzawr:visits';

function findCreds() {
  const env = process.env;
  if (env.KV_REST_API_URL && env.KV_REST_API_TOKEN) return [env.KV_REST_API_URL, env.KV_REST_API_TOKEN];
  if (env.UPSTASH_REDIS_REST_URL && env.UPSTASH_REDIS_REST_TOKEN) return [env.UPSTASH_REDIS_REST_URL, env.UPSTASH_REDIS_REST_TOKEN];
  for (const name of Object.keys(env)) {
    if (!name.endsWith('_REST_API_URL')) continue;
    const prefix = name.slice(0, -'_REST_API_URL'.length);
    const token = env[`${prefix}_REST_API_TOKEN`];
    if (env[name] && token) return [env[name], token];
  }
  return [null, null];
}

export default async function handler(req, res) {
  res.setHeader('Cache-Control', 'no-store');
  const [url, token] = findCreds();
  if (!url || !token) return res.status(503).json({ error: 'counter not configured' });

  const cmd = req.method === 'POST' ? `incr/${KEY}` : `get/${KEY}`;
  try {
    const r = await fetch(`${url.replace(/\/$/, '')}/${cmd}`, { headers: { Authorization: `Bearer ${token}` } });
    const data = await r.json();
    if (!r.ok || data.error) return res.status(502).json({ error: 'counter unavailable' });
    const offset = parseInt(process.env.VISITS_OFFSET || '0', 10) || 0;
    return res.status(200).json({ count: (parseInt(data.result, 10) || 0) + offset });
  } catch (e) {
    return res.status(500).json({ error: 'counter unavailable' });
  }
}
