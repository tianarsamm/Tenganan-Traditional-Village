"use client";

import Link from "next/link";
import { useLanguage } from "@/context/LanguageContext";

export default function Footer() {
  const { t } = useLanguage();

  return (
    <footer id="kontak" className="bg-(--color-dark) px-6 py-16 text-white md:px-12">
      
      <div className="mx-auto max-w-6xl">
        <div className="flex flex-col items-center justify-between gap-8 border-b border-white/10 pb-10 text-center md:flex-row md:text-left">
          <div>
            <h2 className="font-serif text-2xl font-bold md:text-3xl">
              {t.footer.ctaTitle}
            </h2>
            <p className="mt-2 text-white/70">{t.footer.ctaText}</p>
          </div>

          <Link
            href="#virtual-tour"
            scroll={false}
            onClick={(event) => {
              event.preventDefault();
              document.getElementById("virtual-tour")?.scrollIntoView({ behavior: "smooth" });
            }}
            className="inline-block whitespace-nowrap rounded-bl-2xl bg-(--color-terracotta) px-6 py-3 text-sm font-medium text-white transition-colors hover:bg-(--color-terracotta-hover)"
          >
            {t.footer.ctaButton}
          </Link>
        </div>

        <div className="grid grid-cols-1 gap-10 py-10 md:grid-cols-3">
          <div>
            <h3 className="font-serif text-lg font-bold">{t.footer.brandLabel}</h3>
            <p className="mt-1 text-sm tracking-widest text-(--color-terracotta)">
              {t.footer.villageName}
            </p>
            <p className="mt-4 text-sm leading-relaxed text-white/60">
              {t.footer.description}
            </p>
          </div>

 <div>
            <h4 className="text-sm font-semibold uppercase tracking-wide text-white/80">
              {t.footer.contactHeading}
            </h4>
            <p className="mt-3 text-sm text-white/60">
              {t.kontakLokasi.phoneLabel}: +62 812 3456 7890
            </p>
            {/* <p className="mt-1 text-sm text-white/60">Email: info@tenganan.id</p> */}
          </div>

          <div>
            <h4 className="text-sm font-semibold uppercase tracking-wide text-white/80">
              {t.footer.addressHeading}
            </h4>
            <p className="mt-3 text-sm leading-relaxed text-white/60">
              Desa Adat Tenganan, Kec. Manggis, Kab. Karangasem, Bali
            </p>
            
            <div className="mt-4 overflow-hidden rounded-lg border border-white/10">
              <iframe
                title="Lokasi Desa Adat Tenganan"
                src="https://www.google.com/maps?q=-8.47750,115.56639&z=15&output=embed"
                width="100%"
                height="200"
                style={{ border: 0 }}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="grayscale-[20%]"
              />
            </div>

            <a
              href="https://maps.app.goo.gl/mfiXKkc9p1E13myd7"
              target="_blank"
              rel="noopener noreferrer"
              className="mt-2 inline-block text-xs text-(--color-terracotta) hover:underline"
            >
            </a>
          </div>

         
        </div>

        <div className="flex flex-col items-center justify-center gap-3 border-t border-white/10 pt-6 text-center text-xs text-white/50 md:flex-row md:text-left">
          <p>{t.footer.copyright}</p>
        </div>
      </div>
    </footer>
  );
}