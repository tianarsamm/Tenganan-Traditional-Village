'use client';

import { useCallback, useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { fetchMyKeluarga, getToken, logout } from '@/lib/auth';
import { createProduk, updateProduk, deleteProduk, ProdukInput } from '@/lib/produk';

interface Produk extends ProdukInput {
  id: number;
  documentId?: string;
}

interface KeluargaDashboard {
  nama_keluarga_id: string;
  kategori?: Produk[];
}

export default function DashboardKeluargaPage() {
  const router = useRouter();
  const [keluarga, setKeluarga] = useState<KeluargaDashboard | null>(null);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
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
    setEditingId(null);
    setShowForm(false);
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
        <form onSubmit={handleSubmit} className="mb-8 border border-(--color-dark)/10 bg-(--color-card) p-5 shadow-lg shadow-(--color-dark)/5 sm:p-7">
          <div className="mb-5 flex items-start justify-between gap-4">
            <div>
              <p className="text-xs font-medium uppercase tracking-[0.2em] text-(--color-terracotta)">{editingId ? 'Perbarui katalog' : 'Katalog baru'}</p>
              <h3 className="mt-1 text-xl font-bold">{editingId ? 'Edit produk' : 'Tambah produk'}</h3>
            </div>
            <button type="button" onClick={resetForm} className="text-sm text-(--color-text-muted) hover:text-(--color-text)">Tutup</button>
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
            <input
              type="file"
              accept="image/*"
              multiple
              onChange={(e) => setGambarFiles(e.target.files)}
              className="w-full border border-dashed border-(--color-dark)/20 bg-white px-3 py-3 text-sm"
            />
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
              onClick={resetForm}
              className="border border-(--color-dark)/15 px-5 py-2.5 text-sm text-(--color-text-muted) transition-colors hover:border-(--color-dark)/30 hover:text-(--color-text)"
            >
              Batal
            </button>
          </div>
        </form>
      )}

      <div className="grid gap-4 md:grid-cols-2">
        {produkList.length === 0 && (
          <div className="border border-dashed border-(--color-dark)/20 bg-(--color-card) px-6 py-10 text-center md:col-span-2">
            <p className="text-sm text-(--color-text-muted)">Belum ada produk. Tambahkan produk pertama Anda.</p>
          </div>
        )}
        {produkList.map((produk) => (
          <div key={produk.id} className="flex min-h-36 flex-col justify-between border border-(--color-dark)/10 bg-(--color-card) p-5 shadow-md shadow-(--color-dark)/5 transition-transform hover:-translate-y-1">
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
        ))}
      </div>
      </div>
    </main>
  );
}