"use client";

import Image from "next/image";
import Link from "next/link";
import { useLanguage } from "@/context/LanguageContext";

export default function TentangDesa() {
  const { t } = useLanguage();
  return (
    <section id="tentang" className="relative overflow-hidden bg-(--color-cream) px-6 py-20 md:px-12">
      <div className="relative z-10 mx-auto grid max-w-6xl items-center gap-10 md:grid-cols-2">
        <div>
          <h2 className="mt-2 font-serif text-3xl font-bold text-(--color-text) md:text-4xl">
            {t.tentang.title}
          </h2>
          <p className="mt-4 leading-relaxed text-(--color-text-muted)">
            {t.tentang.paragraph1}
            <br />
            {t.tentang.paragraph2}
          </p>

          <Link
            href="/tentang"
            className="mt-6 inline-block rounded-br-2xl bg-(--color-terracotta) px-6 py-3 text-sm font-medium text-white transition-colors hover:bg-(--color-terracotta-hover)"
          >
            {t.tentang.readMore}
          </Link>
        </div>

        <div className="relative aspect-4/3 w-full overflow-hidden">
          <Image
            src="/images/desa/desa_img.jpg"
            alt="Tentang Desa"
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, 50vw"
          />
        </div>
      </div>
    </section>
  );
}