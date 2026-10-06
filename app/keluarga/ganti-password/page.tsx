'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { changePassword, getToken } from '@/lib/auth';
import AuthCard from '@/components/keluarga/AuthCard';

const MIN_LENGTH = 8;

const inputClass =
  'w-full border-b border-(--color-dark)/20 bg-transparent px-0 py-3 text-(--color-text) outline-none transition-colors placeholder:text-(--color-text-muted)/60 focus:border-(--color-terracotta)';

export default function GantiPasswordPage() {
  const router = useRouter();
  const [current, setCurrent] = useState('');
  const [password, setPassword] = useState('');
  const [confirm, setConfirm] = useState('');
  const [loading, setLoading] = useState(false);
  const [done, setDone] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    if (!getToken()) router.push('/keluarga/login');
  }, [router]);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError('');

    if (password.length < MIN_LENGTH) {
      setError(`Password baru minimal ${MIN_LENGTH} karakter.`);
      return;
    }
    if (password !== confirm) {
      setError('Konfirmasi password baru tidak cocok.');
      return;
    }

    setLoading(true);
    try {
      await changePassword(current, password, confirm);
      setDone(true);
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Terjadi kesalahan.';
      setError(message);
      if (message.includes('Sesi Anda berakhir')) router.push('/keluarga/login');
    } finally {
      setLoading(false);
    }
  }

  if (done) {
    return (
      <AuthCard eyebrow="Ruang Keluarga Tenun" title="Password diperbarui">
        <p className="text-sm leading-relaxed text-(--color-text-muted)">
          Password Anda berhasil diganti.
        </p>
        <Link
          href="/keluarga/dashboard"
          className="mt-6 block w-full bg-(--color-terracotta) px-5 py-3.5 text-center text-sm font-medium text-white transition-colors hover:bg-(--color-terracotta-hover)"
        >
          Kembali ke dashboard
        </Link>
      </AuthCard>
    );
  }

  return (
    <AuthCard
      eyebrow="Ruang Keluarga Tenun"
      title="Ganti password"
      description={`Masukkan password saat ini, lalu password baru minimal ${MIN_LENGTH} karakter.`}
    >
      <form onSubmit={handleSubmit} className="space-y-5">
        <div>
          <label className="mb-2 block text-sm font-medium text-(--color-text)">Password saat ini</label>
          <input
            type="password"
            required
            autoComplete="current-password"
            value={current}
            onChange={(e) => setCurrent(e.target.value)}
            className={inputClass}
          />
        </div>

        <div>
          <label className="mb-2 block text-sm font-medium text-(--color-text)">Password baru</label>
          <input
            type="password"
            required
            autoComplete="new-password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className={inputClass}
          />
        </div>

        <div>
          <label className="mb-2 block text-sm font-medium text-(--color-text)">Ulangi password baru</label>
          <input
            type="password"
            required
            autoComplete="new-password"
            value={confirm}
            onChange={(e) => setConfirm(e.target.value)}
            className={inputClass}
          />
        </div>

        {error && (
          <p className="border-l-2 border-red-500 bg-red-50 px-3 py-2 text-sm text-red-700">{error}</p>
        )}

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-(--color-terracotta) px-5 py-3.5 text-sm font-medium text-white transition-colors hover:bg-(--color-terracotta-hover) disabled:cursor-wait disabled:opacity-50"
        >
          {loading ? 'Menyimpan...' : 'Simpan password baru'}
        </button>

        <Link
          href="/keluarga/dashboard"
          className="block text-center text-sm text-(--color-text-muted) transition-colors hover:text-(--color-terracotta)"
        >
          Batal
        </Link>
      </form>
    </AuthCard>
  );
}