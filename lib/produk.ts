const STRAPI_URL =
  process.env.NEXT_PUBLIC_STRAPI_URL || 'https://cms.tengananpegringsingan.com';

export interface ProdukInput {
  nama_id: string;
  nama_en: string;
  harga: number;
  deskripsi_id?: string;
  deskripsi_en?: string;
}

function authHeaders() {
  const token = localStorage.getItem('keluarga_jwt');
  return { Authorization: `Bearer ${token}` };
}

// Sesi habis / token tidak valid: hapus token dan kembali ke halaman login
function handleUnauthorized(): never {
  localStorage.removeItem('keluarga_jwt');
  if (typeof window !== 'undefined') {
    window.location.href = '/keluarga/login';
  }
  throw new Error('Sesi Anda berakhir. Silakan login kembali.');
}

async function parseError(res: Response, fallback: string): Promise<Error> {
  if (res.status === 401) handleUnauthorized();
  try {
    const err = await res.json();
    return new Error(err?.error?.message || fallback);
  } catch {
    return new Error(fallback);
  }
}

// Strapi 5: file diunggah dulu, lalu dihubungkan lewat ID.
// Jangan set Content-Type manual, biarkan browser mengatur boundary FormData.
async function uploadGambar(files: FileList): Promise<number[]> {
  const formData = new FormData();
  Array.from(files).forEach((file) => formData.append('files', file));

  const res = await fetch(`${STRAPI_URL}/api/upload`, {
    method: 'POST',
    headers: authHeaders(),
    body: formData,
  });

  if (!res.ok) throw await parseError(res, 'Gagal mengunggah gambar.');

  const uploaded: { id: number }[] = await res.json();
  return uploaded.map((f) => f.id);
}

export async function createProduk(data: ProdukInput, gambarFiles?: FileList | null) {
  const payload: Record<string, unknown> = { ...data };

  if (gambarFiles && gambarFiles.length > 0) {
    payload.gambar = await uploadGambar(gambarFiles);
  }

  const res = await fetch(`${STRAPI_URL}/api/kategori-tenuns`, {
    method: 'POST',
    headers: { ...authHeaders(), 'Content-Type': 'application/json' },
    body: JSON.stringify({ data: payload }),
  });

  if (!res.ok) throw await parseError(res, 'Gagal menambah produk.');
  return res.json();
}

// documentId (string), bukan id numerik
export async function updateProduk(
  documentId: string,
  data: Partial<ProdukInput>,
  gambarFiles?: FileList | null
) {
  const payload: Record<string, unknown> = { ...data };

  // Field gambar hanya dikirim kalau ada file baru,
  // supaya gambar lama tidak terhapus saat hanya edit teks.
  if (gambarFiles && gambarFiles.length > 0) {
    payload.gambar = await uploadGambar(gambarFiles);
  }

  const res = await fetch(`${STRAPI_URL}/api/kategori-tenuns/${documentId}`, {
    method: 'PUT',
    headers: { ...authHeaders(), 'Content-Type': 'application/json' },
    body: JSON.stringify({ data: payload }),
  });

  if (!res.ok) throw await parseError(res, 'Gagal mengubah produk.');
  return res.json();
}

export async function deleteProduk(documentId: string) {
  const res = await fetch(`${STRAPI_URL}/api/kategori-tenuns/${documentId}`, {
    method: 'DELETE',
    headers: authHeaders(),
  });

  if (!res.ok) throw await parseError(res, 'Gagal menghapus produk.');
  // DELETE di Strapi 5 mengembalikan 204 tanpa body
  return true;
}