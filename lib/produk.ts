const STRAPI_URL = process.env.NEXT_PUBLIC_STRAPI_URL || 'https://cms.tengananpegringsingan.com';

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

export async function createProduk(data: ProdukInput, gambarFiles?: FileList | null) {
  const formData = new FormData();
  formData.append('data', JSON.stringify(data));
  if (gambarFiles) {
    Array.from(gambarFiles).forEach((file) => formData.append('files.gambar', file));
  }

  const res = await fetch(`${STRAPI_URL}/api/kategori-tenuns`, {
    method: 'POST',
    headers: authHeaders(),
    body: formData,
  });

  if (!res.ok) {
    const err = await res.json();
    throw new Error(err?.error?.message || 'Gagal menambah produk.');
  }
  return res.json();
}

// documentId (string), bukan id numerik
export async function updateProduk(documentId: string, data: Partial<ProdukInput>, gambarFiles?: FileList | null) {
  const formData = new FormData();
  formData.append('data', JSON.stringify(data));
  if (gambarFiles) {
    Array.from(gambarFiles).forEach((file) => formData.append('files.gambar', file));
  }

  const res = await fetch(`${STRAPI_URL}/api/kategori-tenuns/${documentId}`, {
    method: 'PUT',
    headers: authHeaders(),
    body: formData,
  });

  if (!res.ok) {
    const err = await res.json();
    throw new Error(err?.error?.message || 'Gagal mengubah produk.');
  }
  return res.json();
}

export async function deleteProduk(documentId: string) {
  const res = await fetch(`${STRAPI_URL}/api/kategori-tenuns/${documentId}`, {
    method: 'DELETE',
    headers: authHeaders(),
  });

  if (!res.ok) {
    const err = await res.json();
    throw new Error(err?.error?.message || 'Gagal menghapus produk.');
  }
  return res.json();
}