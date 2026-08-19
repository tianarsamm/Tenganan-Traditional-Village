"use client";

import Link from "next/link";
import { useLanguage } from "@/context/LanguageContext";

export default function Hero() {
  const { t } = useLanguage();
  return (
    <section
      id="beranda"
      className="relative flex h-screen min-h-screen items-end bg-(--color-dark) bg-cover bg-center px-6 pb-16 pt-32 md:px-12"
      style={{ backgroundImage: "url('/images/desa/background.jpg')" }}
    >
      <div className="absolute inset-0 bg-linear-to-t from-black/80 via-black/40 to-black/10" />

      <div className="relative z-10 max-w-2xl">
        <h1 className="font-serif text-4xl font-bold leading-tight text-white md:text-6xl">
          {t.hero.title}
        </h1>
        <p className="mt-4 max-w-lg text-white/80 md:text-lg">{t.hero.subtitle}</p>

        <div className="mt-6 flex flex-wrap items-center gap-3">
          <Link
            href="#tentang"
            scroll={false}
            onClick={(event) => {
              event.preventDefault();
              document.getElementById("tentang")?.scrollIntoView({ behavior: "smooth" });
            }}
            className="inline-block rounded-full bg-(--color-terracotta) px-6 py-3 text-sm font-medium text-white transition-colors hover:bg-(--color-terracotta-hover)"
          >
            {t.hero.ctaPrimary}
          </Link>

          <Link
            href="#virtual-tour"
            scroll={false}
            onClick={(event) => {
              event.preventDefault();
              document.getElementById("virtual-tour")?.scrollIntoView({ behavior: "smooth" });
            }}
            className="inline-block rounded-full border border-white/30 bg-white/10 px-6 py-3 text-sm font-medium text-white transition duration-200 ease-out hover:bg-white/20"
          >
            {t.hero.ctaSecondary}
          </Link>
        </div>
      </div>
    </section>
  );
}