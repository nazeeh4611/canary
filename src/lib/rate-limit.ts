/**
 * Small fixed-window rate limiter.
 *
 * In-memory: effective on a single long-running server (e.g. `next start`,
 * a VPS or container). On serverless platforms each instance keeps its own
 * window, so treat it as a first line of defence and add a shared store
 * (e.g. Upstash Redis) or platform firewall rules if spam becomes a problem.
 */
type Window = { count: number; resetAt: number };

const buckets = new Map<string, Window>();

export function rateLimit(key: string, limit: number, windowMs: number): { ok: boolean; retryAfter: number } {
  const now = Date.now();

  // Opportunistic cleanup so the map can't grow without bound
  if (buckets.size > 5000) {
    for (const [k, w] of buckets) if (w.resetAt <= now) buckets.delete(k);
  }

  const w = buckets.get(key);
  if (!w || w.resetAt <= now) {
    buckets.set(key, { count: 1, resetAt: now + windowMs });
    return { ok: true, retryAfter: 0 };
  }
  w.count += 1;
  if (w.count > limit) return { ok: false, retryAfter: Math.ceil((w.resetAt - now) / 1000) };
  return { ok: true, retryAfter: 0 };
}
