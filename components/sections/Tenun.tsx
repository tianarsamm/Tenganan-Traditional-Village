"use client";

import Image from "next/image";
import Link from "next/link";
import { useLanguage } from "@/context/LanguageContext";

export default function Tenun() {
  const { t } = useLanguage();
  return (
    <section id="tenun" className="relative overflow-hidden bg-(--color-dark-soft) px-6 py-20 md:px-12">
      {/* Decorative tenun motif background (opacity 0.04) */}
      <div
        aria-hidden
        className="absolute inset-0 z-0 pointer-events-none"
        style={{
          backgroundImage: "url('/images/tenunbackground2.png')",
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          opacity: 0.04,
        }}
      />

      <div className="relative z-10 mx-auto grid max-w-6xl items-center gap-10 md:grid-cols-2">
        <div>
          <h2 className="mt-2 font-serif text-3xl font-bold text-(--color-terracotta-soft) md:text-4xl">
            {t.tenun.title}
          </h2>

          <p className="mt-4 leading-relaxed text-(--color-terracotta-soft)">
            {t.tenun.paragraph1}
          </p>

          <p className="mt-4 leading-relaxed text-(--color-terracotta-soft)">
            {t.tenun.paragraph2}
          </p>

          <p className="mt-4 leading-relaxed text-(--color-terracotta-soft)">
            {t.tenun.paragraph3}
          </p>

          <div className="mt-6 flex flex-wrap items-center gap-3">
            <Link
              href="/produk"
              className="inline-block rounded-br-2xl bg-(--color-terracotta) px-6 py-3 text-sm font-medium text-white transition-colors hover:bg-(--color-terracotta-hover)"
            >
              {t.nav.belanja}
            </Link>
          </div>
        </div>

        <div className="relative aspect-4/3 w-full overflow-hidden">
          <Image
            src="/images/desa/main.jpg"
            alt={t.tenun.imageAlt}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, 50vw"
          />
        </div>
      </div>
    </section>
  );
}