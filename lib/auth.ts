const STRAPI_URL =
  process.env.NEXT_PUBLIC_STRAPI_URL || 'https://cms.tengananpegringsingan.com';

export interface StrapiAuthResponse {
  jwt: string;
  user: {
    id: number;
    username: string;
    email: string;
  };
}

export async function loginKeluarga(identifier: string, password: string) {
  const res = await fetch(`${STRAPI_URL}/api/auth/local`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ identifier, password }),
  });

  const data = await res.json();

  if (!res.ok) {
    throw new Error(data?.error?.message || 'Login gagal. Periksa email dan password.');
  }

  return data as StrapiAuthResponse;
}

export function saveToken(jwt: string) {
  localStorage.setItem('keluarga_jwt', jwt);
}

export function getToken(): string | null {
  if (typeof window === 'undefined') return null;
  return localStorage.getItem('keluarga_jwt');
}

export function logout() {
  localStorage.removeItem('keluarga_jwt');
}

export async function fetchMyKeluarga() {
  const token = getToken();
  if (!token) throw new Error('Tidak ada sesi login.');

  const res = await fetch(`${STRAPI_URL}/api/keluarga-tenuns/me`, {
    headers: { Authorization: `Bearer ${token}` },
    cache: 'no-store',
  });

  if (!res.ok) {
    if (res.status === 401) logout();
    throw new Error('Gagal memuat data keluarga.');
  }

  return res.json();
}