'use client';

import Link from 'next/link';
import { Suspense, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import { resetPassword } from '@/lib/auth';
import AuthCard from '@/components/keluarga/AuthCard';

const MIN_LENGTH = 8;

const inputClass =
  'w-full border-b border-(--color-dark)/20 bg-transparent px-0 py-3 text-(--color-text) outline-none transition-colors placeholder:text-(--color-text-muted)/60 focus:border-(--color-terracotta)';

function ResetPasswordForm() {
  const params = useSearchParams();
  const code = params.get('code') ?? '';

  const [password, setPassword] = useState('');
  const [confirm, setConfirm] = useState('');
  const [loading, setLoading] = useState(false);
  const [done, setDone] = useState(false);
  const [error, setError] = useState('');

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError('');

    if (password.length < MIN_LENGTH) {
      setError(`Password minimal ${MIN_LENGTH} karakter.`);
      return;
    }
    if (password !== confirm) {
      setError('Konfirmasi password tidak cocok.');
      return;
    }

    setLoading(true);
    try {
      await resetPassword(code, password, confirm);
      setDone(true);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Terjadi kesalahan.');
    } finally {
      setLoading(false);
    }
  }

  if (!code) {
    return (
      <AuthCard eyebrow="Ruang Keluarga Tenun" title="Tautan tidak valid">
        <p className="text-sm leading-relaxed text-(--color-text-muted)">
          Tautan reset password tidak lengkap. Silakan minta tautan baru.
        </p>
        <Link
          href="/keluarga/lupa-password"
          className="mt-6 block w-full bg-(--color-terracotta) px-5 py-3.5 text-center text-sm font-medium text-white transition-colors hover:bg-(--color-terracotta-hover)"
        >
          Minta tautan baru
        </Link>
      </AuthCard>
    );
  }

  if (done) {
    return (
      <AuthCard eyebrow="Ruang Keluarga Tenun" title="Password diperbarui">
        <p className="text-sm leading-relaxed text-(--color-text-muted)">
          Password Anda berhasil diubah. Silakan masuk dengan password yang baru.
        </p>
        <Link
          href="/keluarga/login"
          className="mt-6 block w-full bg-(--color-terracotta) px-5 py-3.5 text-center text-sm font-medium text-white transition-colors hover:bg-(--color-terracotta-hover)"
        >
          Masuk
        </Link>
      </AuthCard>
    );
  }

  return (
    <AuthCard
      eyebrow="Ruang Keluarga Tenun"
      title="Buat password baru"
      description={`Gunakan password minimal ${MIN_LENGTH} karakter.`}
    >
      <form onSubmit={handleSubmit} className="space-y-5">
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
      </form>
    </AuthCard>
  );
}

export default function ResetPasswordPage() {
  return (
    <Suspense fallback={null}>
      <ResetPasswordForm />
    </Suspense>
  );
}