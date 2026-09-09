const STRAPI_URL = process.env.NEXT_PUBLIC_STRAPI_URL || "http://localhost:1337";

export function strapiImageUrl(url: string): string {
  if (!url) return "";
  if (url.startsWith("http")) return url;
  return `${STRAPI_URL}${url}`;
}

export async function strapiFetch<T>(path: string): Promise<T> {
  const res = await fetch(`${STRAPI_URL}/api${path}`, {
    // Revalidate tiap 60 detik, sesuaikan nanti kalau perlu lebih real-time
    next: { revalidate: 60 },
  });

  if (!res.ok) {
    throw new Error(`Strapi fetch failed: ${res.status} ${res.statusText} for ${path}`);
  }

  return res.json();
}