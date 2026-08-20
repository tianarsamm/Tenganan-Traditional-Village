"use client";

import { useState } from "react";
import { useLanguage } from "@/context/LanguageContext";

export default function VirtualTour() {
  const { t } = useLanguage();
  const [showAudioPrompt, setShowAudioPrompt] = useState(true);
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <section
      id="virtual-tour"
      className="bg-(--color-cream) px-6 py-20 md:px-12"
    >
      <div className="mx-auto max-w-5xl">
        <div className="mb-10 text-center">
          {/* <span className="text-sm font-medium uppercase tracking-widest text-(--color-terracotta)">
            {t.virtualTour.sectionLabel}
          </span> */}
          <h2 className="mt-2 font-serif text-3xl font-bold text-(--color-text) md:text-4xl">
            {t.virtualTour.title}
          </h2>
          <p className="mx-auto mt-3 max-w-lg text-(--color-text-muted)">
            {t.virtualTour.description}
          </p>
        </div>

        {/* Frame tour 360 */}
        <div
          className="relative aspect-video w-full overflow-hidden rounded-xl border border-(--color-dark)/10 bg-(--color-dark) bg-cover bg-center shadow-2xl shadow-black/20"
          style={{ backgroundImage: "url('/images/desa/virtual-tour.jpg')" }}
        >
          {/* Overlay gelap supaya elemen UI tetap terbaca */}
          <div className="absolute inset-0 bg-(--color-dark)/50" />

          {/* Top bar */}
          <div className="absolute inset-x-0 top-0 z-10 flex items-center justify-between p-4">
            <div className="flex items-center gap-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-full bg-white/10 backdrop-blur-sm">
                <span className="font-serif text-xs font-bold text-white">DA</span>
              </div>
              <span className="hidden text-xs font-semibold tracking-wide text-white sm:block">
                DESA ADAT TENGANAN
              </span>
            </div>

            <button
              onClick={() => setMenuOpen(!menuOpen)}
              aria-label={t.virtualTour.menuLabel}
              className="flex h-9 w-9 items-center justify-center rounded-full bg-white/10 text-white backdrop-blur-sm transition-colors hover:bg-white/20"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M4 7h16M4 12h16M4 17h16" strokeLinecap="round" />
              </svg>
            </button>
          </div>

          {/* Dropdown menu (opsional, muncul saat ikon menu diklik) */}
          {menuOpen && (
            <div className="absolute right-4 top-16 z-20 w-40 rounded-lg bg-white py-2 shadow-xl">
              {[t.virtualTour.navHome, t.virtualTour.navAbout, t.virtualTour.navLocation, t.virtualTour.navGallery].map(
                (item) => (
                  <a
                    key={item}
                    href="#"
                    className="block px-4 py-2 text-sm text-(--color-text) hover:bg-(--color-cream)"
                  >
                    {item}
                  </a>
                )
              )}
            </div>
          )}

          {/* Modal enable audio */}
          {showAudioPrompt && (
            <div className="absolute inset-0 z-10 flex items-center justify-center">
              <div className="w-64 rounded-lg bg-white p-5 text-center shadow-2xl">
                <p className="border-b border-(--color-dark)/10 pb-3 text-sm text-(--color-text)">
                  {t.virtualTour.enableAudio}
                </p>
                <div className="mt-3 flex justify-center gap-3">
                  <button
                    onClick={() => setShowAudioPrompt(false)}
                    className="rounded-md bg-(--color-terracotta) px-4 py-1.5 text-xs font-medium text-white transition-colors hover:bg-(--color-terracotta-hover)"
                  >
                    {t.virtualTour.yes}
                  </button>
                  {/* <button
                    onClick={() => setShowAudioPrompt(false)}
                    className="rounded-md bg-(--color-dark)/80 px-4 py-1.5 text-xs font-medium text-white transition-colors hover:bg-(--color-dark)"
                  >
                    {t.virtualTour.no}
                  </button> */}
                </div>
              </div>
            </div>
          )}

          {/* Center play/360 indicator, tampil hanya kalau modal audio sudah ditutup */}
          {!showAudioPrompt && (
            <div className="absolute inset-0 z-0 flex items-center justify-center">
              <span className="rounded-full border border-white/40 px-4 py-1.5 text-xs font-medium tracking-widest text-white/90">
                360°
              </span>
            </div>
          )}

          {/* Bottom bar */}
          <div className="absolute inset-x-0 bottom-0 z-10 flex items-center justify-between bg-(--color-dark)/60 px-4 py-2.5 backdrop-blur-sm">
            <nav className="hidden gap-4 text-[10px] font-semibold uppercase tracking-wider text-white/80 sm:flex">
              <a href="#beranda" className="hover:text-(--color-terracotta)">
                {t.virtualTour.navHome}
              </a>
              <a href="#tentang" className="hover:text-(--color-terracotta)">
                {t.virtualTour.navAbout}
              </a>
              <a href="#kontak-lokasi" className="hover:text-(--color-terracotta)">
                {t.virtualTour.navLocation}
              </a>
              <a href="#galeri" className="hover:text-(--color-terracotta)">
                {t.virtualTour.navGallery}
              </a>
            </nav>

            <span className="ml-auto flex h-7 w-7 items-center justify-center rounded-md bg-white/10 text-white">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M4 9V4h5M20 9V4h-5M4 15v5h5M20 15v5h-5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}