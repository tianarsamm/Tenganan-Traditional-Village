'use client';

import { useCallback, useEffect, useMemo, useState } from 'react';
import { useRouter } from 'next/navigation';
import { fetchMyKeluarga, getToken, logout } from '@/lib/auth';
import { createProduk, updateProduk, deleteProduk, ProdukInput } from '@/lib/produk';

interface GambarStrapi {
  id: number;
  url: string;
  alternativeText?: string | null;
}

interface Produk extends ProdukInput {
  id: number;
  documentId?: string;
  gambar?: GambarStrapi[] | GambarStrapi | null;
}

interface KeluargaDashboard {
  nama_keluarga_id: string;
  kategori?: Produk[];
}

const STRAPI_URL =
  process.env.NEXT_PUBLIC_STRAPI_URL || 'https://cms.tengananpegringsingan.com';

function mediaUrl(url: string) {
  return url.startsWith('http') ? url : `${STRAPI_URL}${url}`;
}

// Strapi bisa mengembalikan array (Multiple media) atau satu objek (Single media)
function getImages(gambar: Produk['gambar']): GambarStrapi[] {
  if (!gambar) return [];
  const list = Array.isArray(gambar) ? gambar : [gambar];
  return list.filter((g) => g && g.url);
}

export default function DashboardKeluargaPage() {
  const router = useRouter();
  const [keluarga, setKeluarga] = useState<KeluargaDashboard | null>(null);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [showCloseConfirm, setShowCloseConfirm] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [currentImages, setCurrentImages] = useState<GambarStrapi[]>([]);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');

  const [form, setForm] = useState<ProdukInput>({
    nama_id: '',
    nama_en: '',
    harga: 0,
    deskripsi_id: '',
    deskripsi_en: '',
  });
  const [gambarFiles, setGambarFiles] = useState<FileList | null>(null);

  // Preview file baru yang dipilih, dibersihkan otomatis saat berubah
  const newPreviews = useMemo(
    () => (gambarFiles ? Array.from(gambarFiles).map((f) => URL.createObjectURL(f)) : []),
    [gambarFiles]
  );
  useEffect(() => {
    return () => newPreviews.forEach((u) => URL.revokeObjectURL(u));
  }, [newPreviews]);

  // Tutup modal konfirmasi dengan tombol Esc
  useEffect(() => {
    if (!showCloseConfirm) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setShowCloseConfirm(false);
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [showCloseConfirm]);

  const loadData = useCallback(() => {
    fetchMyKeluarga()
      .then(setKeluarga)
      .catch(() => router.push('/keluarga/login'))
      .finally(() => setLoading(false));
  }, [router]);

  useEffect(() => {
    if (!getToken()) {
      router.push('/keluarga/login');
      return;
    }
    loadData();
  }, [loadData, router]);

  function resetForm() {
    setForm({ nama_id: '', nama_en: '', harga: 0, deskripsi_id: '', deskripsi_en: '' });
    setGambarFiles(null);
    setCurrentImages([]);
    setEditingId(null);
    setShowForm(false);
    setError('');
  }

  function requestClose() {
    setShowCloseConfirm(true);
  }

  function confirmClose() {
    setShowCloseConfirm(false);
    resetForm();
  }

  function startEdit(produk: Produk) {
    if (!produk.documentId) return;

    setForm({
      nama_id: produk.nama_id,
      nama_en: produk.nama_en,
      harga: produk.harga,
      deskripsi_id: produk.deskripsi_id || '',
      deskripsi_en: produk.deskripsi_en || '',
    });
    setCurrentImages(getImages(produk.gambar));
    setGambarFiles(null);
    setEditingId(produk.documentId);
    setShowForm(true);
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError('');
    setSaving(true);

    try {
      if (editingId) {
        await updateProduk(editingId, form, gambarFiles);
      } else {
        await createProduk(form, gambarFiles);
      }
      resetForm();
      loadData();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Terjadi kesalahan.');
    } finally {
      setSaving(false);
    }
  }

  async function handleDelete(documentId?: string) {
    if (!documentId) return;

    if (!confirm('Yakin ingin menghapus produk ini?')) return;
    try {
      await deleteProduk(documentId);
      loadData();
    } catch (err) {
      alert(err instanceof Error ? err.message : 'Gagal menghapus.');
    }
  }

  if (loading) return <p className="p-6">Memuat...</p>;

  const produkList: Produk[] = keluarga?.kategori || [];

  return (
    <main className="min-h-screen bg-(--color-cream)">
      <header className="bg-(--color-dark) px-6 py-5 text-white md:px-12">
        <div className="mx-auto flex max-w-6xl items-center justify-between gap-4">
          <div>
            <p className="text-xs font-medium uppercase tracking-[0.25em] text-(--color-terracotta)">Ruang Keluarga Tenun</p>
            <h1 className="mt-1 text-xl font-bold sm:text-2xl">Halo, {keluarga?.nama_keluarga_id}</h1>
          </div>
          <button
            onClick={() => {
              logout();
              router.push('/keluarga/login');
            }}
            className="border border-white/20 px-3 py-2 text-sm text-white/75 transition-colors hover:border-(--color-terracotta) hover:text-white"
          >
            Keluar
          </button>
        </div>
      </header>

      <div className="mx-auto max-w-6xl px-6 py-10 md:px-12 md:py-14">
        <div className="mb-9 flex flex-col justify-between gap-5 sm:flex-row sm:items-end">
          <div>
            <p className="text-sm font-medium uppercase tracking-[0.22em] text-(--color-terracotta)">Katalog Anda</p>
            <h2 className="mt-2 text-3xl font-bold text-(--color-text)">Produk tenun</h2>
            <p className="mt-2 text-sm text-(--color-text-muted)">Kelola karya yang tampil di halaman penjualan desa.</p>
          </div>
          <button
            onClick={() => {
              resetForm();
              setShowForm(true);
            }}
            className="inline-flex items-center justify-center gap-2 bg-(--color-terracotta) px-5 py-3 text-sm font-medium text-white transition-colors hover:bg-(--color-terracotta-hover)"
          >
            <span className="text-lg leading-none">+</span> Tambah produk
          </button>
        </div>

        {showForm && (
          <form
            onSubmit={handleSubmit}
            className="mb-8 space-y-5 border border-(--color-dark)/10 bg-(--color-card) p-5 shadow-lg shadow-(--color-dark)/5 sm:p-7"
          >
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="text-xs font-medium uppercase tracking-[0.2em] text-(--color-terracotta)">{editingId ? 'Perbarui katalog' : 'Katalog baru'}</p>
                <h3 className="mt-1 text-xl font-bold">{editingId ? 'Edit produk' : 'Tambah produk'}</h3>
              </div>
              <button
                type="button"
                onClick={requestClose}
                className="inline-flex shrink-0 items-center gap-1.5 border border-(--color-terracotta) px-3.5 py-2 text-sm font-medium text-(--color-terracotta) transition-colors hover:bg-(--color-terracotta) hover:text-white"
              >
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" aria-hidden="true">
                  <path d="M18 6L6 18M6 6l12 12" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
                Tutup
              </button>
            </div>

            <div className="grid gap-4 md:grid-cols-2">
              <div>
                <label className="mb-1.5 block text-sm font-medium">Nama (ID)</label>
                <input
                  required
                  value={form.nama_id}
                  onChange={(e) => setForm({ ...form, nama_id: e.target.value })}
                  className="w-full border border-(--color-dark)/15 bg-white px-3 py-2.5 outline-none transition-colors focus:border-(--color-terracotta)"
                />
              </div>
              <div>
                <label className="mb-1.5 block text-sm font-medium">Nama (EN)</label>
                <input
                  required
                  value={form.nama_en}
                  onChange={(e) => setForm({ ...form, nama_en: e.target.value })}
                  className="w-full border border-(--color-dark)/15 bg-white px-3 py-2.5 outline-none transition-colors focus:border-(--color-terracotta)"
                />
              </div>
            </div>

            <div>
              <label className="mb-1.5 block text-sm font-medium">Harga (Rp)</label>
              <input
                required
                type="number"
                min={0}
                value={form.harga}
                onChange={(e) => setForm({ ...form, harga: Number(e.target.value) })}
                className="w-full border border-(--color-dark)/15 bg-white px-3 py-2.5 outline-none transition-colors focus:border-(--color-terracotta)"
              />
            </div>

            <div className="grid gap-4 md:grid-cols-2">
              <div>
                <label className="mb-1.5 block text-sm font-medium">Deskripsi (ID)</label>
                <textarea
                  value={form.deskripsi_id}
                  onChange={(e) => setForm({ ...form, deskripsi_id: e.target.value })}
                  className="w-full resize-y border border-(--color-dark)/15 bg-white px-3 py-2.5 outline-none transition-colors focus:border-(--color-terracotta)"
                  rows={3}
                />
              </div>
              <div>
                <label className="mb-1.5 block text-sm font-medium">Deskripsi (EN)</label>
                <textarea
                  value={form.deskripsi_en}
                  onChange={(e) => setForm({ ...form, deskripsi_en: e.target.value })}
                  className="w-full resize-y border border-(--color-dark)/15 bg-white px-3 py-2.5 outline-none transition-colors focus:border-(--color-terracotta)"
                  rows={3}
                />
              </div>
            </div>

            <div>
              <label className="mb-1.5 block text-sm font-medium">Gambar produk</label>

              {/* Gambar tenun saat ini (hanya saat edit, dan belum memilih file baru) */}
              {editingId && currentImages.length > 0 && newPreviews.length === 0 && (
                <div className="mb-3">
                  <p className="mb-2 text-xs text-(--color-text-muted)">Gambar saat ini</p>
                  <div className="flex flex-wrap gap-3">
                    {currentImages.map((img) => (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img
                        key={img.id}
                        src={mediaUrl(img.url)}
                        alt={img.alternativeText || form.nama_id || 'Gambar tenun'}
                        className="h-28 w-28 border border-(--color-dark)/10 object-cover"
                      />
                    ))}
                  </div>
                </div>
              )}

              {/* Preview gambar baru yang dipilih */}
              {newPreviews.length > 0 && (
                <div className="mb-3">
                  <p className="mb-2 text-xs text-(--color-text-muted)">
                    Gambar baru{editingId ? ' (akan menggantikan gambar saat ini)' : ''}
                  </p>
                  <div className="flex flex-wrap gap-3">
                    {newPreviews.map((src, i) => (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img
                        key={src}
                        src={src}
                        alt={`Gambar baru ${i + 1}`}
                        className="h-28 w-28 border-2 border-(--color-terracotta) object-cover"
                      />
                    ))}
                  </div>
                </div>
              )}

              <input
                type="file"
                accept="image/*"
                multiple
                onChange={(e) => setGambarFiles(e.target.files)}
                className="w-full border border-dashed border-(--color-dark)/20 bg-white px-3 py-3 text-sm"
              />
              {editingId && (
                <p className="mt-1.5 text-xs text-(--color-text-muted)">
                  Kosongkan jika tidak ingin mengganti gambar.
                </p>
              )}
            </div>

            {error && <p className="text-red-600 text-sm">{error}</p>}

            <div className="flex flex-wrap gap-3">
              <button
                type="submit"
                disabled={saving}
                className="bg-(--color-dark) px-5 py-2.5 text-sm font-medium text-white transition-colors hover:bg-(--color-dark-soft) disabled:opacity-50"
              >
                {saving ? 'Menyimpan...' : 'Simpan'}
              </button>
              <button
                type="button"
                onClick={requestClose}
                className="border border-(--color-dark)/15 px-5 py-2.5 text-sm text-(--color-text-muted) transition-colors hover:border-(--color-dark)/30 hover:text-(--color-text)"
              >
                Batal
              </button>
            </div>
          </form>
        )}

        <div className="grid gap-5 md:grid-cols-2">
          {produkList.length === 0 && (
            <div className="border border-dashed border-(--color-dark)/20 bg-(--color-card) px-6 py-10 text-center md:col-span-2">
              <p className="text-sm text-(--color-text-muted)">Belum ada produk. Tambahkan produk pertama Anda.</p>
            </div>
          )}
          {produkList.map((produk) => {
            const images = getImages(produk.gambar);
            const cover = images[0];

            return (
              <div
                key={produk.id}
                className="flex flex-col overflow-hidden border border-(--color-dark)/10 bg-(--color-card) shadow-md shadow-(--color-dark)/5 transition-transform hover:-translate-y-1"
              >
                <div className="relative aspect-4/3 w-full overflow-hidden bg-(--color-cream)">
                  {cover ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img
                      src={mediaUrl(cover.url)}
                      alt={cover.alternativeText || produk.nama_id}
                      className="h-full w-full object-cover"
                    />
                  ) : (
                    <div className="flex h-full w-full flex-col items-center justify-center gap-2 text-(--color-text-muted)">
                      <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
                        <rect x="3" y="4" width="18" height="16" rx="1" />
                        <circle cx="9" cy="10" r="1.5" />
                        <path d="M21 16l-5-5-8 8" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                      <span className="text-xs">Belum ada gambar</span>
                    </div>
                  )}
                  {images.length > 1 && (
                    <span className="absolute right-2 top-2 bg-black/60 px-2 py-0.5 text-xs font-medium text-white">
                      {images.length} foto
                    </span>
                  )}
                </div>

                <div className="flex flex-1 flex-col justify-between p-5">
                  <div>
                    <p className="text-xs font-medium uppercase tracking-[0.16em] text-(--color-terracotta)">Koleksi tenun</p>
                    <p className="mt-2 text-lg font-bold text-(--color-text)">{produk.nama_id}</p>
                    <p className="mt-1 text-sm text-(--color-text-muted)">Rp {produk.harga.toLocaleString('id-ID')}</p>
                  </div>
                  <div className="mt-5 flex gap-4 border-t border-(--color-dark)/10 pt-3 text-sm">
                    <button onClick={() => startEdit(produk)} disabled={!produk.documentId} title={!produk.documentId ? 'ID produk tidak tersedia' : undefined} className="font-medium text-(--color-text-muted) transition-colors hover:text-(--color-terracotta) disabled:cursor-not-allowed disabled:opacity-50">
                      Edit
                    </button>
                    <button onClick={() => handleDelete(produk.documentId)} disabled={!produk.documentId} title={!produk.documentId ? 'ID produk tidak tersedia' : undefined} className="font-medium text-red-700/70 transition-colors hover:text-red-700 disabled:cursor-not-allowed disabled:opacity-50">
                      Hapus
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Pop up konfirmasi tutup form */}
      {showCloseConfirm && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 px-4"
          onClick={() => setShowCloseConfirm(false)}
        >
          <div
            role="alertdialog"
            aria-modal="true"
            aria-labelledby="close-confirm-title"
            aria-describedby="close-confirm-desc"
            onClick={(e) => e.stopPropagation()}
            className="w-full max-w-md border border-(--color-dark)/10 bg-(--color-card) p-6 shadow-2xl"
          >
            <h3 id="close-confirm-title" className="text-lg font-bold text-(--color-text)">
              Tutup formulir?
            </h3>
            <p id="close-confirm-desc" className="mt-2 text-sm leading-relaxed text-(--color-text-muted)">
              Data dan gambar yang belum disimpan akan hilang. Pastikan Anda sudah menekan Simpan jika ingin menyimpan perubahan.
            </p>
            <div className="mt-6 flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">
              <button
                type="button"
                onClick={() => setShowCloseConfirm(false)}
                className="border border-(--color-dark)/15 px-5 py-2.5 text-sm font-medium text-(--color-text-muted) transition-colors hover:border-(--color-dark)/30 hover:text-(--color-text)"
              >
                Lanjutkan mengisi
              </button>
              <button
                type="button"
                onClick={confirmClose}
                className="bg-(--color-terracotta) px-5 py-2.5 text-sm font-medium text-white transition-colors hover:bg-(--color-terracotta-hover)"
              >
                Ya, tutup
              </button>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}