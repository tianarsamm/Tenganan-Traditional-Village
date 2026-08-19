"use client";

import Image from "next/image";
import Link from "next/link";
import { KeluargaTenun } from "@/types/keluarga";
import { getHargaRange as getRange, localize } from "@/data/keluarga";
import { useLanguage } from "@/context/LanguageContext";

interface KeluargaCardProps {
  keluarga: KeluargaTenun;
}

export default function KeluargaCard({ keluarga }: KeluargaCardProps) {
  const gambarUtama = keluarga.kategori[0]?.gambar[0];
  const { t, language } = useLanguage();

  return (
    <div className="group overflow-hidden rounded-2xl border border-(--color-dark)/10 bg-(--color-card) p-3 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg">
      <Link
        href={`/produk/${keluarga.slug}`}
        className="relative block aspect-4/3 w-full overflow-hidden rounded-xl bg-(--color-cream)"
      >
        {gambarUtama && (
          <Image
            src={gambarUtama}
            alt={localize(keluarga.namaKeluarga, language)}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-105"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
        )}
      </Link>

      <div className="px-1 pt-4">
        <Link href={`/produk/${keluarga.slug}`}>
          <h3 className="font-serif text-lg font-semibold leading-snug text-(--color-text) hover:text-(--color-terracotta)">
            {localize(keluarga.namaKeluarga, language)}
          </h3>
        </Link>

        {/* Badge kategori */}
        <div className="mt-2 flex flex-wrap gap-1.5">
          {keluarga.kategori.map((k) => (
            <span
              key={k.id}
              className="rounded-full bg-(--color-cream) px-2.5 py-1 text-xs font-medium text-(--color-text-muted)"
            >
              {localize(k.nama, language)}
            </span>
          ))}
        </div>

        {/* Range harga */}
        <p className="mt-3 text-lg font-semibold text-(--color-terracotta)">
          {getRange(keluarga)}
        </p>

        {/* Tombol aksi */}
        <div className="mt-4 flex items-center gap-2">
          <Link
            href={`/produk/${keluarga.slug}`}
            className="flex-1 rounded-xl bg-(--color-terracotta) px-4 py-2.5 text-center text-sm font-medium text-white transition-colors hover:bg-(--color-terracotta-hover)"
          >
            {t.produk.detailButton}
          </Link>

          <a
            href={`https://wa.me/${keluarga.noWa}`}
            target="_blank"
            rel="noopener noreferrer"
            onClick={(e) => e.stopPropagation()}
            className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-(--color-terracotta-soft) text-(--color-terracotta) transition-colors hover:bg-(--color-terracotta) hover:text-white"
            aria-label="Hubungi via WhatsApp"
          >
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="h-5 w-5">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z" />
              <path d="M12.001 2C6.478 2 2 6.477 2 12c0 1.88.523 3.65 1.432 5.155L2 22l4.966-1.393A9.95 9.95 0 0012.001 22C17.523 22 22 17.523 22 12S17.523 2 12.001 2zm0 18.06a8.02 8.02 0 01-4.31-1.244l-.309-.184-3.052.857.822-3.006-.202-.31A8.04 8.04 0 013.94 12c0-4.446 3.615-8.06 8.061-8.06 4.445 0 8.06 3.614 8.06 8.06 0 4.446-3.615 8.06-8.06 8.06z" />
            </svg>
          </a>
        </div>
      </div>
    </div>
  );
}