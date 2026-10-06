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

// Pesan error Strapi berbahasa Inggris, diterjemahkan untuk kasus umum
function translateError(message: string | undefined, fallback: string) {
  if (!message) return fallback;
  const m = message.toLowerCase();
  if (m.includes('current password')) return 'Password saat ini salah.';
  if (m.includes('different')) return 'Password baru harus berbeda dari password saat ini.';
  if (m.includes('incorrect code')) return 'Tautan reset tidak valid atau sudah digunakan. Silakan minta tautan baru.';
  if (m.includes('do not match')) return 'Konfirmasi password tidak cocok.';
  if (m.includes('too many')) return 'Terlalu banyak percobaan. Coba lagi beberapa saat lagi.';
  return message;
}

async function readErrorMessage(res: Response): Promise<string | undefined> {
  try {
    const data = await res.json();
    return data?.error?.message;
  } catch {
    return undefined;
  }
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

// Kirim tautan reset ke email. Strapi selalu membalas sukses,
// baik email terdaftar maupun tidak.
export async function forgotPassword(email: string) {
  const res = await fetch(`${STRAPI_URL}/api/auth/forgot-password`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email }),
  });

  if (!res.ok) {
    throw new Error(
      translateError(await readErrorMessage(res), 'Gagal mengirim email reset password.')
    );
  }
}

export async function resetPassword(
  code: string,
  password: string,
  passwordConfirmation: string
) {
  const res = await fetch(`${STRAPI_URL}/api/auth/reset-password`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ code, password, passwordConfirmation }),
  });

  if (!res.ok) {
    throw new Error(
      translateError(await readErrorMessage(res), 'Gagal mengatur ulang password.')
    );
  }
}

export async function changePassword(
  currentPassword: string,
  password: string,
  passwordConfirmation: string
) {
  const token = getToken();
  if (!token) throw new Error('Sesi Anda berakhir. Silakan login kembali.');

  const res = await fetch(`${STRAPI_URL}/api/auth/change-password`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ currentPassword, password, passwordConfirmation }),
  });

  if (!res.ok) {
    if (res.status === 401) {
      logout();
      throw new Error('Sesi Anda berakhir. Silakan login kembali.');
    }
    throw new Error(
      translateError(await readErrorMessage(res), 'Gagal mengganti password.')
    );
  }

  // Strapi mengembalikan JWT baru; simpan supaya sesi tetap berlaku
  const data = (await res.json()) as StrapiAuthResponse;
  if (data?.jwt) saveToken(data.jwt);
}