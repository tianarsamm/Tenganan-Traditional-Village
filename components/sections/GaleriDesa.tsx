"use client";

import { useState } from "react";
import Image from "next/image";
import { useLanguage } from "@/context/LanguageContext";
import Lightbox from "@/components/gallery/Lightbox";
import type { GaleriItem } from "@/data/galeri";

const MAX_VISIBLE = 8;

interface Props {
  items: GaleriItem[];
}

export default function GaleriDesa({ items }: Props) {
  const { t } = useLanguage();
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  const visibleItems = items.slice(0, MAX_VISIBLE);
  const remainingCount = items.length - MAX_VISIBLE;
  return (
    <section id="galeri" className="bg-(--color-cream) px-6 py-20 md:px-12">
      <div className="mx-auto max-w-6xl">
        <div className="mb-10 flex flex-col items-start justify-between gap-4 md:flex-row md:items-end">
          <div>
            <h2 className="mt-2 font-serif text-3xl font-bold text-(--color-text) md:text-4xl">
              {t.galeri.title}
            </h2>
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
                className="group relative aspect-square overflow-hidden"
              >
                <Image
                  src={item.src}
                  alt={item.alt}
                  fill
                  className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                  sizes="(max-width: 768px) 50vw, 25vw"
                />
                <div className="absolute inset-0 bg-linear-to-t from-black/50 via-transparent to-transparent opacity-0 transition-opacity group-hover:opacity-100" />

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

        {items.length === 0 && (
          <p className="py-10 text-center text-(--color-text-muted)">{t.galeri.emptyMessage}</p>
        )}
      </div>

      {lightboxIndex !== null && (
        <Lightbox
          images={items}
          activeIndex={lightboxIndex}
          onClose={() => setLightboxIndex(null)}
          onNavigate={(i) => setLightboxIndex(i)}
        />
      )}
    </section>
  );
}