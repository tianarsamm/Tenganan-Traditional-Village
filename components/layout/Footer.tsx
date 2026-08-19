"use client";

import Link from "next/link";
import { useLanguage } from "@/context/LanguageContext";
import { InstagramIcon, FacebookIcon, WhatsAppIcon } from "@/components/icons/SocialIcons";

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
            className="inline-block whitespace-nowrap rounded-full bg-(--color-terracotta) px-6 py-3 text-sm font-medium text-white transition-colors hover:bg-(--color-terracotta-hover)"
          >
            {t.footer.ctaButton}
          </Link>
        </div>

        <div className="grid grid-cols-1 gap-10 py-10 md:grid-cols-3">
          <div>
            <h3 className="font-serif text-lg font-bold">DESA ADAT</h3>
            <p className="mt-1 text-sm tracking-widest text-(--color-terracotta)">
              TENGANAN
            </p>
            <p className="mt-4 text-sm leading-relaxed text-white/60">
              {t.footer.description}
            </p>
          </div>

          <div>
            <h4 className="text-sm font-semibold uppercase tracking-wide text-white/80">
              {t.footer.addressHeading}
            </h4>
            <p className="mt-3 text-sm leading-relaxed text-white/60">
              Desa Adat Tenganan
              <br />
              Kec. Manggis
              <br />
              Kabupaten Karangasem
              <br />
              Bali
            </p>
            <p className="mt-3 text-sm text-white/60">{t.footer.openHours}</p>
          </div>

          <div>
            <h4 className="text-sm font-semibold uppercase tracking-wide text-white/80">
              {t.footer.contactHeading}
            </h4>
            <p className="mt-3 text-sm text-white/60">
              {t.kontakLokasi.phoneLabel}: +62 812 3456 7890
            </p>
            <p className="mt-1 text-sm text-white/60">Email: info@tenganan.id</p>

            <div className="mt-4 flex gap-3">
              <a
                href="#"
                aria-label={t.footer.socialInstagram}
                className="flex h-9 w-9 items-center justify-center rounded-full border border-white/20 text-white/70 transition-colors hover:border-(--color-terracotta) hover:text-(--color-terracotta)"
              >
                <InstagramIcon className="h-4 w-4" />
              </a>
              <a
                href="#"
                aria-label={t.footer.socialFacebook}
                className="flex h-9 w-9 items-center justify-center rounded-full border border-white/20 text-white/70 transition-colors hover:border-(--color-terracotta) hover:text-(--color-terracotta)"
              >
                <FacebookIcon className="h-4 w-4" />
              </a>
              <a
                href="#"
                aria-label={t.footer.socialWhatsApp}
                className="flex h-9 w-9 items-center justify-center rounded-full border border-white/20 text-white/70 transition-colors hover:border-(--color-terracotta) hover:text-(--color-terracotta)"
              >
                <WhatsAppIcon className="h-4 w-4" />
              </a>
            </div>
          </div>
        </div>

        <div className="border-t border-white/10 pt-6 text-center text-xs text-white/50">
          <p>{t.footer.copyright}</p>
        </div>
      </div>
    </footer>
  );
}