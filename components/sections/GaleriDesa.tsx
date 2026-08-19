"use client";

import { useState } from "react";
import { useLanguage } from "@/context/LanguageContext";
import Lightbox from "@/components/gallery/Lightbox";

type GaleriKategori = "all" | "culture" | "nature" | "weaving" | "festival";

interface GaleriItem {
  src: string;
  alt: string;
  kategori: Exclude<GaleriKategori, "all">;
}

const galeriItems: GaleriItem[] = [
  { src: "/images/desa/galeri/1.jpg", alt: "Upacara adat desa", kategori: "culture" },
  { src: "/images/desa/galeri/2.jpg", alt: "Pemandangan alam desa", kategori: "nature" },
  { src: "/images/desa/galeri/3.jpg", alt: "Proses menenun kain", kategori: "weaving" },
  { src: "/images/desa/galeri/4.jpg", alt: "Festival tahunan desa", kategori: "festival" },
  { src: "/images/desa/galeri/5.jpg", alt: "Rumah adat desa", kategori: "culture" },
  { src: "/images/desa/galeri/6.jpg", alt: "Hutan lindung desa", kategori: "nature" },
  { src: "/images/desa/galeri/7.jpg", alt: "Motif kain tenun", kategori: "weaving" },
  { src: "/images/desa/galeri/8.jpg", alt: "Perayaan budaya", kategori: "festival" },
  { src: "/images/desa/galeri/1.jpg", alt: "Upacara adat desa", kategori: "culture" },
  { src: "/images/desa/galeri/2.jpg", alt: "Pemandangan alam desa", kategori: "nature" },
  { src: "/images/desa/galeri/3.jpg", alt: "Proses menenun kain", kategori: "weaving" },
  { src: "/images/desa/galeri/4.jpg", alt: "Festival tahunan desa", kategori: "festival" },
  { src: "/images/desa/galeri/5.jpg", alt: "Rumah adat desa", kategori: "culture" },
  { src: "/images/desa/galeri/6.jpg", alt: "Hutan lindung desa", kategori: "nature" },
  { src: "/images/desa/galeri/7.jpg", alt: "Motif kain tenun", kategori: "weaving" },
  { src: "/images/desa/galeri/8.jpg", alt: "Perayaan budaya", kategori: "festival" },
  // tambahkan gambar ke-9, ke-10, dst di sini — otomatis akan
  // masuk hitungan "+N Foto Lainnya" dan tetap bisa dilihat via lightbox
];

const MAX_VISIBLE = 8;

export default function GaleriDesa() {
  const { t } = useLanguage();
  const kategoriKeys: readonly GaleriKategori[] = ["all", "culture", "nature", "weaving", "festival"];
  const kategoriList = t.galeri.kategoriList as readonly string[];
  const kategoriLabels = kategoriKeys.map((key, index) => ({ key, label: kategoriList[index] }));
  const [filter, setFilter] = useState<GaleriKategori>(kategoriKeys[0]);
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  const filteredItems =
    filter === "all" ? galeriItems : galeriItems.filter((item) => item.kategori === filter);

  const visibleItems = filteredItems.slice(0, MAX_VISIBLE);
  const remainingCount = filteredItems.length - MAX_VISIBLE;

  return (
    <section id="galeri" className="bg-(--color-cream) px-6 py-20 md:px-12">
      <div className="mx-auto max-w-6xl">
        <div className="mb-10 flex flex-col items-start justify-between gap-4 md:flex-row md:items-end">
          <div>
            <span className="text-sm font-medium uppercase tracking-widest text-(--color-terracotta)">
              {t.galeri.sectionLabel}
            </span>
            <h2 className="mt-2 font-serif text-3xl font-bold text-(--color-text) md:text-4xl">
              {t.galeri.title}
            </h2>
          </div>

          <div className="flex flex-wrap gap-2">
            {kategoriLabels.map(({ key, label }) => (
              <button
                key={key}
                onClick={() => {
                  setFilter(key);
                }}
                className={`rounded-full px-4 py-1.5 text-sm font-medium transition-colors ${
                  filter === key
                    ? "bg-(--color-dark) text-white"
                    : "bg-white text-(--color-text-muted) hover:bg-(--color-dark)/5"
                }`}
              >
                {label}
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
          {visibleItems.map((item, index) => {
            const isLastVisible = index === MAX_VISIBLE - 1;
            const showOverlay = isLastVisible && remainingCount > 0;

            return (
              <button
                key={`${item.src}-${index}`}
                onClick={() => setLightboxIndex(index)}
                className="group relative aspect-square overflow-hidden rounded-lg"
              >
                <img
                  src={item.src}
                  alt={item.alt}
                  className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-0 transition-opacity group-hover:opacity-100" />

                {showOverlay && (
                  <div className="absolute inset-0 flex items-center justify-center bg-black/60 backdrop-blur-[2px]">
                    <span className="font-serif text-lg font-bold text-white">
                      +{remainingCount}
                    </span>
                    <span className="absolute bottom-3 text-xs font-medium text-white/80">
                      {t.galeri.moreLabel}
                    </span>
                  </div>
                )}
              </button>
            );
          })}
        </div>

        {/* {filteredItems.length > 0 && (
          <div className="mt-8 text-center">
            <button
              onClick={() => setLightboxIndex(0)}
              className="inline-block rounded-full border border-(--color-dark)/20 px-6 py-2.5 text-sm font-medium text-(--color-text) transition-colors hover:border-(--color-terracotta) hover:text-(--color-terracotta)"
            >
              {t.galeri.viewAll} ({filteredItems.length})
            </button>
          </div>
        )} */}

        {filteredItems.length === 0 && (
          <p className="py-10 text-center text-(--color-text-muted)">{t.galeri.emptyMessage}</p>
        )}
      </div>

      {lightboxIndex !== null && (
        <Lightbox
          images={filteredItems}
          activeIndex={lightboxIndex}
          onClose={() => setLightboxIndex(null)}
          onNavigate={(i) => setLightboxIndex(i)}
        />
      )}
    </section>
  );
}