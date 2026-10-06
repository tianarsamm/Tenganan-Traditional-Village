'use client';

import Link from 'next/link';
import { useState } from 'react';
import { daftarKeluarga } from '@/lib/pendaftaran';
import AuthCard from '@/components/keluarga/AuthCard';

const inputClass =
  'w-full border-b border-(--color-dark)/20 bg-transparent px-0 py-3 text-(--color-text) outline-none transition-colors placeholder:text-(--color-text-muted)/60 focus:border-(--color-terracotta)';

export default function DaftarKeluargaPage() {
  const [form, setForm] = useState({
    nama_keluarga_id: '',
    nama_pendaftar: '',
    email: '',
    no_wa: '',
    catatan: '',
    website: '',
  });
  const [loading, setLoading] = useState(false);
  const [done, setDone] = useState(false);
  const [error, setError] = useState('');

  function update(field: keyof typeof form, value: string) {
    setForm((prev) => ({ ...prev, [field]: value }));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      await daftarKeluarga(form);
      setDone(true);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Terjadi kesalahan.');
    } finally {
      setLoading(false);
    }
  }

  if (done) {
    return (
      <AuthCard eyebrow="Ruang Keluarga Tenun" title="Pendaftaran diterima">
        <p className="text-sm leading-relaxed text-(--color-text-muted)">
          Terima kasih. Pengurus akan menghubungi Anda lewat WhatsApp untuk verifikasi. Setelah disetujui, Anda akan menerima informasi untuk masuk ke dashboard.
        </p>
        <Link
          href="/"
          className="mt-6 block w-full bg-(--color-terracotta) px-5 py-3.5 text-center text-sm font-medium text-white transition-colors hover:bg-(--color-terracotta-hover)"
        >
          Kembali ke halaman utama
        </Link>
      </AuthCard>
    );
  }

  return (
    <AuthCard
      eyebrow="Ruang Keluarga Tenun"
      title="Daftarkan keluarga Anda"
      description="Isi data berikut. Pengurus akan memverifikasi sebelum akun Anda diaktifkan."
    >
      <form onSubmit={handleSubmit} className="space-y-5">
        <div>
          <label className="mb-2 block text-sm font-medium text-(--color-text)">Nama keluarga</label>
          <input
            required
            maxLength={120}
            value={form.nama_keluarga_id}
            onChange={(e) => update('nama_keluarga_id', e.target.value)}
            placeholder="Contoh: Keluarga Bapak Aga"
            className={inputClass}
          />
        </div>

        <div>
          <label className="mb-2 block text-sm font-medium text-(--color-text)">Nama pendaftar</label>
          <input
            required
            maxLength={120}
            value={form.nama_pendaftar}
            onChange={(e) => update('nama_pendaftar', e.target.value)}
            className={inputClass}
          />
        </div>

        <div>
          <label className="mb-2 block text-sm font-medium text-(--color-text)">Email</label>
          <input
            required
            type="email"
            value={form.email}
            onChange={(e) => update('email', e.target.value)}
            placeholder="nama@contoh.com"
            className={inputClass}
          />
          <p className="mt-1.5 text-xs text-(--color-text-muted)">
            Gunakan email aktif. Tautan untuk membuat password akan dikirim ke sini.
          </p>
        </div>

        <div>
          <label className="mb-2 block text-sm font-medium text-(--color-text)">Nomor WhatsApp</label>
          <input
            required
            type="tel"
            inputMode="tel"
            value={form.no_wa}
            onChange={(e) => update('no_wa', e.target.value)}
            placeholder="081234567890"
            className={inputClass}
          />
        </div>

        <div>
          <label className="mb-2 block text-sm font-medium text-(--color-text)">
            Catatan <span className="font-normal text-(--color-text-muted)">(opsional)</span>
          </label>
          <textarea
            rows={3}
            maxLength={1000}
            value={form.catatan}
            onChange={(e) => update('catatan', e.target.value)}
            className="w-full resize-y border border-(--color-dark)/15 bg-white px-3 py-2.5 text-(--color-text) outline-none transition-colors focus:border-(--color-terracotta)"
          />
        </div>

        {/* Honeypot: tidak terlihat oleh pengguna, hanya terisi oleh bot */}
        <div className="sr-only" aria-hidden="true">
          <label>
            Website
            <input
              type="text"
              tabIndex={-1}
              autoComplete="off"
              value={form.website}
              onChange={(e) => update('website', e.target.value)}
            />
          </label>
        </div>

        {error && (
          <p className="border-l-2 border-red-500 bg-red-50 px-3 py-2 text-sm text-red-700">{error}</p>
        )}

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-(--color-terracotta) px-5 py-3.5 text-sm font-medium text-white transition-colors hover:bg-(--color-terracotta-hover) disabled:cursor-wait disabled:opacity-50"
        >
          {loading ? 'Mengirim...' : 'Kirim pendaftaran'}
        </button>

        <Link
          href="/keluarga/login"
          className="block text-center text-sm text-(--color-text-muted) transition-colors hover:text-(--color-terracotta)"
        >
          Sudah punya akun? Masuk
        </Link>
      </form>
    </AuthCard>
  );
}