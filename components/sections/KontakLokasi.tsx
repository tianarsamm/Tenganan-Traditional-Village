"use client";

import { useLanguage } from "@/context/LanguageContext";

export default function KontakLokasi() {
  const { t } = useLanguage();

  return (
    <section id="kontak-lokasi" className="bg-(--color-cream) px-6 py-20 md:px-12">
      <div className="mx-auto max-w-6xl">
        <div className="mb-10 text-center">
          <span className="text-sm font-medium uppercase tracking-widest text-(--color-terracotta)">
            {t.kontakLokasi.sectionLabel}
          </span>
          <h2 className="mt-2 font-serif text-3xl font-bold text-(--color-text) md:text-4xl">
            {t.kontakLokasi.title}
          </h2>
          <p className="mx-auto mt-3 max-w-lg text-(--color-text-muted)">
            {t.kontakLokasi.addressLines.join(", ")}
          </p>
        </div>

        <div className="relative overflow-hidden rounded-xl">
          <iframe
            title={t.kontakLokasi.mapTitle}
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d63139.79320908358!2d115.52779365705071!3d-8.47631329042805!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2dd208ae07ab780d%3A0xd5e08aa546665776!2sTenganan%2C%20Kec.%20Manggis%2C%20Kabupaten%20Karangasem%2C%20Bali!5e0!3m2!1sid!2sid!4v1786161163434!5m2!1sid!2sid"
            className="h-105 w-full border-0 md:h-120"
            loading="lazy"
            referrerPolicy="strict-origin-when-cross-origin"
            allowFullScreen
          />
          <a
            href="https://www.google.com/maps/place/Tenganan,+Kec.+Manggis,+Kabupaten+Karangasem,+Bali/@-8.4763133,115.5277937,13z/data=!3m1!4b1!4m6!3m5!1s0x2dd208ae07ab780d:0xd5e08aa546665776!8m2!3d-8.4717387!4d115.5651478!16s%2Fm%2F0glnnrh?entry=ttu&g_ep=EgoyMDI2MDgwNS4xIKXMDSoASAFQAw%3D%3D"
            target="_blank"
            rel="noreferrer"
            className="absolute inset-0"
            aria-label={t.kontakLokasi.mapAriaLabel}
          />
        </div>
      </div>
    </section>
  );
}