"use client";

import Image from "next/image";
import Link from "next/link";
import { useLanguage } from "@/context/LanguageContext";

export default function TourGuideSection() {
  const { t } = useLanguage();

  return (
    <section id="tour-guide" className="bg-(--color-cream) px-6 py-20 md:px-12">
      <div className="mx-auto grid max-w-6xl items-center gap-10 md:grid-cols-2">
        <div className="relative aspect-4/4 w-full overflow-hidden md:order-1">
          <Image
            src="/images/tourguide/5.png"
            alt={t.tourGuide.title}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, 50vw"
          />
        </div>

        <div className="md:order-2">
          <h2 className="mt-2 font-serif text-3xl font-bold text-(--color-text) md:text-4xl">
            {t.tourGuide.title}
          </h2>
          <p className="mt-4 leading-relaxed text-(--color-text-muted)">
            {t.tourGuide.description}
          </p>

          <Link
            href="/tour-guide"
            className="mt-6 inline-block rounded-br-2xl bg-(--color-terracotta) px-6 py-3 text-sm font-medium text-white transition-colors hover:bg-(--color-terracotta-hover)"
          >
            {t.tourGuide.cta}
          </Link>
        </div>
      </div>
    </section>
  );
}