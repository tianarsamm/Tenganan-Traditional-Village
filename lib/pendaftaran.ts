const STRAPI_URL =
  process.env.NEXT_PUBLIC_STRAPI_URL || 'https://cms.tengananpegringsingan.com';

export interface PendaftaranInput {
  nama_keluarga_id: string;
  nama_pendaftar: string;
  email: string;
  no_wa: string;
  catatan?: string;
  website?: string; // honeypot, harus tetap kosong
}

export async function daftarKeluarga(input: PendaftaranInput) {
  const res = await fetch(`${STRAPI_URL}/api/pendaftaran-keluargas/daftar`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ data: input }),
  });

  if (!res.ok) {
    let message: string | undefined;
    try {
      const data = await res.json();
      message = data?.error?.message;
    } catch {
      // abaikan, pakai pesan bawaan
    }
    throw new Error(message || 'Pendaftaran gagal. Silakan coba lagi.');
  }
}