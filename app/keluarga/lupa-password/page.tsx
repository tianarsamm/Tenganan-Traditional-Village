'use client';

import Link from 'next/link';
import { useState } from 'react';
import { forgotPassword } from '@/lib/auth';
import AuthCard from '@/components/keluarga/AuthCard';

export default function LupaPasswordPage() {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);
  const [error, setError] = useState('');

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      await forgotPassword(email.trim());
      setSent(true);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Terjadi kesalahan.');
    } finally {
      setLoading(false);
    }
  }

  return (
    <AuthCard
      eyebrow="Ruang Keluarga Tenun"
      title="Lupa password"
      description="Masukkan email akun Anda. Kami akan mengirim tautan untuk membuat password baru."
    >
      {sent ? (
        <div>
          <p className="border-l-2 border-(--color-terracotta) bg-(--color-cream) px-3 py-3 text-sm leading-relaxed text-(--color-text)">
            Jika email tersebut terdaftar, tautan reset password sudah dikirim. Periksa kotak masuk dan folder spam Anda.
          </p>
          <Link
            href="/keluarga/login"
            className="mt-6 block w-full bg-(--color-terracotta) px-5 py-3.5 text-center text-sm font-medium text-white transition-colors hover:bg-(--color-terracotta-hover)"
          >
            Kembali ke halaman masuk
          </Link>
        </div>
      ) : (
        <form onSubmit={handleSubmit}>
          <label className="mb-2 block text-sm font-medium text-(--color-text)">Email</label>
          <input
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="nama@contoh.com"
            className="w-full border-b border-(--color-dark)/20 bg-transparent px-0 py-3 text-(--color-text) outline-none transition-colors placeholder:text-(--color-text-muted)/60 focus:border-(--color-terracotta)"
          />

          {error && (
            <p className="mt-5 border-l-2 border-red-500 bg-red-50 px-3 py-2 text-sm text-red-700">{error}</p>
          )}

          <button
            type="submit"
            disabled={loading}
            className="mt-8 w-full bg-(--color-terracotta) px-5 py-3.5 text-sm font-medium text-white transition-colors hover:bg-(--color-terracotta-hover) disabled:cursor-wait disabled:opacity-50"
          >
            {loading ? 'Mengirim...' : 'Kirim tautan reset'}
          </button>

          <Link
            href="/keluarga/login"
            className="mt-5 block text-center text-sm text-(--color-text-muted) transition-colors hover:text-(--color-terracotta)"
          >
            Kembali ke halaman masuk
          </Link>
        </form>
      )}
    </AuthCard>
  );
}