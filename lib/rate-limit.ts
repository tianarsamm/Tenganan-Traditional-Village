// lib/rate-limit.ts
// Rate limiter sederhana berbasis memory — cukup untuk traffic kecil-menengah.
// Kalau nanti traffic besar / multi-instance, ganti dengan Upstash Redis rate limit.

type RateLimitEntry = {
  count: number;
  resetAt: number;
};

const store = new Map<string, RateLimitEntry>();

// Bersihkan entry lama tiap 5 menit biar memory tidak bocor
setInterval(() => {
  const now = Date.now();
  for (const [key, entry] of store.entries()) {
    if (entry.resetAt < now) store.delete(key);
  }
}, 5 * 60 * 1000);

interface RateLimitOptions {
  windowMs: number; // durasi window, misal 60_000 = 1 menit
  max: number;      // maksimal request per window
}

export function rateLimit(identifier: string, options: RateLimitOptions): { success: boolean; remaining: number } {
  const now = Date.now();
  const entry = store.get(identifier);

  if (!entry || entry.resetAt < now) {
    store.set(identifier, { count: 1, resetAt: now + options.windowMs });
    return { success: true, remaining: options.max - 1 };
  }

  if (entry.count >= options.max) {
    return { success: false, remaining: 0 };
  }

  entry.count += 1;
  return { success: true, remaining: options.max - entry.count };
}

// Helper untuk ambil IP asli di belakang Cloudflare/Vercel
export function getClientIp(headers: Headers): string {
  return (
    headers.get('cf-connecting-ip') ||
    headers.get('x-forwarded-for')?.split(',')[0].trim() ||
    headers.get('x-real-ip') ||
    'unknown'
  );
}