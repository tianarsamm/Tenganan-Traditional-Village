"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { KeluargaTenun } from "@/types/keluarga";
import { localize } from "@/data/keluarga";
import { useLanguage } from "@/context/LanguageContext";

interface KeluargaDetailGalleryProps {
  keluarga: KeluargaTenun;
}

export default function KeluargaDetailGallery({ keluarga }: KeluargaDetailGalleryProps) {
  const { t, language } = useLanguage();
  const [activeIndex, setActiveIndex] = useState(0);
  const activeKategori = keluarga.kategori[activeIndex];
  

  const namaKeluarga = localize(keluarga.namaKeluarga, language);
  const namaKategori = localize(activeKategori.nama, language);
  const deskripsi = activeKategori.deskripsi ? localize(activeKategori.deskripsi, language) : null;

  const goPrev = () => {
    setActiveIndex((i) => (i === 0 ? keluarga.kategori.length - 1 : i - 1));
  };

  const goNext = () => {
    setActiveIndex((i) => (i === keluarga.kategori.length - 1 ? 0 : i + 1));
  };

  return (
    <div className="mx-auto grid max-w-5xl grid-cols-1 gap-6 md:grid-cols-[420px_minmax(0,1fr)] md:items-start md:gap-10">
      {/* Kolom gambar */}
      <div className="mx-auto w-full max-w-105 md:max-w-none">
        <div key={activeIndex} className="animate-fade-in relative aspect-4/5 w-full overflow-hidden bg-(--color-cream)">
          <Image
            src={activeKategori.gambar[0]}
            alt={namaKategori}
            fill
            className="object-cover"
            priority
            sizes="(max-width: 768px) 100vw, 420px"
          />

          {keluarga.kategori.length > 1 && (
            <>
              <button
                onClick={goPrev}
                aria-label="Kategori sebelumnya"
                className="absolute left-3 top-1/2 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-white/50 text-(--color-text) shadow-md transition-colors hover:bg-white"
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M15 18l-6-6 6-6" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </button>
              <button
                onClick={goNext}
                aria-label="Kategori selanjutnya"
                className="absolute right-3 top-1/2 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-white/50 text-(--color-text) shadow-md transition-colors hover:bg-white"
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M9 18l6-6-6-6" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </button>
            </>
          )}
        </div>

        {/* Thumbnail per kategori */}
        <div className="mt-4 grid grid-cols-4 gap-3">
          {keluarga.kategori.map((k, index) => (
            <button
              key={k.id}
              onClick={() => setActiveIndex(index)}
              className={`group relative aspect-square overflow-hidden border-2 transition-colors ${
                activeIndex === index
                  ? "border-(--color-terracotta)"
                  : "border-transparent opacity-70 hover:opacity-100"
              }`}
            >
              <Image src={k.gambar[0]} alt={localize(k.nama, language)} fill className="object-cover" sizes="120px" />
              <span className="absolute inset-x-0 bottom-0 truncate bg-black/50 px-1 py-0.5 text-center text-[10px] font-medium text-white">
                {localize(k.nama, language)}
              </span>
            </button>
          ))}
        </div>
      </div>

      {/* Kolom info */}
      <div key={`info-${activeIndex}`} className="animate-fade-in md:pt-2">
        <div className="flex items-center justify-between gap-4">
          <span className="text-sm font-medium uppercase tracking-widest text-(--color-terracotta)">
            {namaKeluarga}
          </span>

          <Link
            href="/produk"
            className="inline-flex shrink-0 items-center gap-1.5 text-sm text-(--color-text-muted) transition-colors hover:text-(--color-terracotta)"
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M15 18l-6-6 6-6" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            {t.produk.backToCollection}
          </Link>
        </div>

        <h1 className="mt-2 font-serif text-2xl font-bold text-(--color-text) md:text-3xl">
          {namaKategori}
        </h1>

        <p className="mt-4 text-xl font-semibold text-(--color-terracotta) md:text-2xl">
          Rp {activeKategori.harga.toLocaleString("id-ID")}
        </p>

        <div className="mt-6 h-px w-full bg-(--color-dark)/10" />

        {deskripsi && (
          <p className="mt-6 leading-relaxed text-(--color-text-muted)">
            {deskripsi}
          </p>
        )}

        <a
          href={`https://wa.me/${keluarga.noWa}?text=${encodeURIComponent(
            `Halo, saya tertarik dengan ${namaKategori} dari ${namaKeluarga}`
          )}`}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-8 flex w-full items-center justify-center gap-2 rounded-br-2xl bg-(--color-terracotta) px-6 py-3.5 text-sm font-medium text-white transition-colors hover:bg-(--color-terracotta-hover) md:w-auto md:inline-flex"
        >
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="h-4 w-4">
            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z" />
            <path d="M12.001 2C6.478 2 2 6.477 2 12c0 1.88.523 3.65 1.432 5.155L2 22l4.966-1.393A9.95 9.95 0 0012.001 22C17.523 22 22 17.523 22 12S17.523 2 12.001 2zm0 18.06a8.02 8.02 0 01-4.31-1.244l-.309-.184-3.052.857.822-3.006-.202-.31A8.04 8.04 0 013.94 12c0-4.446 3.615-8.06 8.061-8.06 4.445 0 8.06 3.614 8.06 8.06 0 4.446-3.615 8.06-8.06 8.06z" />
          </svg>
          {t.produk.detailOrderButton}
        </a>
      </div>
    </div>
  );
}