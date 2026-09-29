'use client';

import Image from 'next/image';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { loginKeluarga, saveToken } from '@/lib/auth';

export default function LoginKeluargaPage() {
  const router = useRouter();
  const [identifier, setIdentifier] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const { jwt } = await loginKeluarga(identifier, password);
      saveToken(jwt);
      router.push('/keluarga/dashboard');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Terjadi kesalahan.');
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="relative flex min-h-screen items-center overflow-hidden bg-(--color-cream) px-5 py-10 sm:px-8">
      <div className="pointer-events-none absolute -right-32 -top-32 h-80 w-80 rounded-full border-[28px] border-(--color-terracotta)/10 sm:h-[28rem] sm:w-[28rem]" />
      <div className="pointer-events-none absolute -bottom-40 -left-36 h-96 w-96 rounded-full bg-(--color-dark)/[0.035]" />

      <div className="relative mx-auto grid w-full max-w-5xl overflow-hidden border border-(--color-dark)/10 bg-(--color-card) shadow-2xl shadow-(--color-dark)/10 md:grid-cols-[0.9fr_1.1fr]">
        <div className="relative flex min-h-64 flex-col justify-between overflow-hidden bg-(--color-dark) px-7 py-8 text-white sm:px-10 md:min-h-[34rem] md:px-12 md:py-10">
          <div className="absolute -bottom-24 -right-24 h-64 w-64 rounded-full border-[20px] border-(--color-terracotta)/30" />
          <div className="relative">
            <Image
              src="/logo.png"
              alt="Logo Desa Adat Tenganan"
              width={76}
              height={76}
              className="h-16 w-16 object-contain sm:h-20 sm:w-20"
            />
            <p className="mt-8 text-xs font-medium uppercase tracking-[0.28em] text-(--color-terracotta)">Ruang Keluarga Tenun</p>
            <h1 className="mt-3 max-w-xs text-3xl font-bold leading-tight sm:text-4xl">Rawat warisan, kenalkan karya.</h1>
          </div>
          <p className="relative mt-10 max-w-sm text-sm leading-relaxed text-white/65">Kelola koleksi tenun keluarga dan bagikan cerita karya dari Desa Adat Tenganan.</p>
        </div>

        <form onSubmit={handleSubmit} className="px-7 py-9 sm:px-12 sm:py-12 md:px-14">
          <div className="mb-9">
            <p className="text-sm font-medium uppercase tracking-[0.22em] text-(--color-terracotta)">Selamat datang</p>
            <h2 className="mt-2 text-3xl font-bold text-(--color-text)">Masuk ke ruang Anda</h2>
            <p className="mt-3 text-sm leading-relaxed text-(--color-text-muted)">Gunakan akun keluarga untuk mengatur katalog tenun Anda.</p>
          </div>

          <div className="space-y-5">
            <div>
              <label className="mb-2 block text-sm font-medium text-(--color-text)">Email</label>
              <input
                type="text"
                value={identifier}
                onChange={(e) => setIdentifier(e.target.value)}
                required
                className="w-full border-b border-(--color-dark)/20 bg-transparent px-0 py-3 text-(--color-text) outline-none transition-colors placeholder:text-(--color-text-muted)/60 focus:border-(--color-terracotta)"
                placeholder="nama@contoh.com"
              />
            </div>

            <div>
              <label className="mb-2 block text-sm font-medium text-(--color-text)">Password</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="w-full border-b border-(--color-dark)/20 bg-transparent px-0 py-3 text-(--color-text) outline-none transition-colors placeholder:text-(--color-text-muted)/60 focus:border-(--color-terracotta)"
                placeholder="Masukkan password"
              />
            </div>
          </div>

          {error && <p className="mt-5 border-l-2 border-red-500 bg-red-50 px-3 py-2 text-sm text-red-700">{error}</p>}

          <button
            type="submit"
            disabled={loading}
            className="mt-8 w-full bg-(--color-terracotta) px-5 py-3.5 text-sm font-medium text-white transition-colors hover:bg-(--color-terracotta-hover) disabled:cursor-wait disabled:opacity-50"
          >
            {loading ? 'Memproses...' : 'Masuk ke dashboard'}
          </button>

          <button type="button" onClick={() => router.push('/')} className="mt-5 w-full text-center text-sm text-(--color-text-muted) transition-colors hover:text-(--color-terracotta)">
            Kembali ke halaman utama
          </button>
        </form>
      </div>
    </main>
  );
}