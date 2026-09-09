"use client";

import Link from "next/link";
import { useEffect, useMemo, useRef, useState } from "react";
import { useLanguage } from "@/context/LanguageContext";

const LANGUAGES = {
  id: { label: "Indonesia", flag: "🇮🇩" },
  en: { label: "English", flag: "🇬🇧" },
} as const;

function LanguageToggle({ mobile }: { mobile?: boolean }) {
  const { language, setLanguage } = useLanguage();
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="relative" ref={ref}>
      <button
        onClick={() => setOpen((prev) => !prev)}
        aria-label="Pilih bahasa"
        className="flex items-center gap-1 border border-(--color-dark)/20 px-2.5 py-1 text-xs font-semibold text-(--color-dark)/70 transition-colors hover:text-(--color-dark)"
      >
        <span className="text-base leading-none">{LANGUAGES[language].flag}</span>
        <svg
          width="10"
          height="10"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="3"
          className={`transition-transform ${open ? "rotate-180" : ""}`}
        >
          <path d="M6 9l6 6 6-6" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </button>

      {open && (
        <div
          className={`absolute top-full z-50 mt-1 w-32 border border-(--color-dark)/20 bg-white text-xs font-semibold shadow-md ${
            mobile ? "right-0" : "left-0"
          }`}
        >
          {(Object.keys(LANGUAGES) as Array<keyof typeof LANGUAGES>).map((lang) => (
            <button
              key={lang}
              onClick={() => {
                setLanguage(lang);
                setOpen(false);
              }}
              className={`flex w-full items-center gap-2 px-2.5 py-1.5 text-left transition-colors ${
                language === lang
                  ? "bg-(--color-terracotta) text-white"
                  : "text-(--color-dark)/70 hover:bg-(--color-dark)/5 hover:text-(--color-dark)"
              }`}
            >
              <span className="text-base leading-none">{LANGUAGES[lang].flag}</span>
              <span>{LANGUAGES[lang].label}</span>
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

export default function Navbar() {
  const { t } = useLanguage();
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("#beranda");

  const navLinks = useMemo(
    () => [
      { label: t.nav.beranda, href: "#beranda" },
      { label: t.nav.tentang, href: "#tentang" },
      { label: t.nav.tenun, href: "#tenun" },
      { label: t.nav.virtualTour, href: "#virtual-tour" },
      { label: t.nav.galeri, href: "#galeri" },
      { label: t.nav.tourGuide, href: "#tour-guide" },
      // { label: t.nav.lokasi, href: "#kontak-lokasi" },
    ],
    [t]
  );

  useEffect(() => {
    const sections = navLinks
      .map((link) => document.querySelector(link.href))
      .filter(Boolean) as HTMLElement[];

    if (!sections.length) {
      return;
    }

    const ratios = new Map<string, number>();

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          ratios.set(entry.target.id, entry.intersectionRatio);
        });

        let maxId = "";
        let maxRatio = 0;
        ratios.forEach((ratio, id) => {
          if (ratio > maxRatio) {
            maxRatio = ratio;
            maxId = id;
          }
        });

        if (maxId) {
          setActiveSection(`#${maxId}`);
        }
      },
      {
        root: null,
        rootMargin: "-20% 0px -35% 0px",
        threshold: Array.from({ length: 21 }, (_, i) => i / 20),
      }
    );

    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, [navLinks]);

  // Kunci scroll body saat drawer mobile terbuka
  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  const handleAnchorClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    const el = document.querySelector(href) as HTMLElement | null;
    if (!el) return;
    const headerEl = document.querySelector("header") as HTMLElement | null;
    const offset = headerEl?.offsetHeight ?? 0;
    const top = el.getBoundingClientRect().top + window.scrollY;
    window.scrollTo({ top: top - offset - 12, behavior: "smooth" });
  };

  return (
    <header className="fixed inset-x-0 top-0 z-30 px-4 py-4 sm:px-6">
      <nav className="mx-auto flex max-w-6xl items-center justify-between gap-4  border border-white/20 bg-white/90 px-6 py-3 shadow-xl shadow-black/10 backdrop-blur-md">
        <Link href="/" className="font-body text-lg font-semibold tracking-wide text-(--color-dark)">
          {t.nav.judul1}
          <span className="block text-xs font-normal tracking-widest text-(--color-terracotta)">
            {t.nav.judul2}
          </span>
        </Link>

        <ul className="hidden items-center gap-8 md:flex">
          {navLinks.map((link) => (
            <li key={link.href}>
              <a
                href={link.href}
                onClick={(e) => handleAnchorClick(e, link.href)}
                className={`text-sm transition duration-200 ease-out ${
                  activeSection === link.href
                    ? "text-(--color-terracotta) font-semibold"
                    : "text-(--color-dark) hover:text-(--color-terracotta)"
                }`}
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>

        <div className="hidden items-center gap-3 md:flex">
          <LanguageToggle />
          <Link
            href="/produk"
            className=" bg-(--color-terracotta) px-5 py-2 text-sm font-medium text-white transition duration-200 ease-out hover:bg-(--color-terracotta-hover)"
          >
            {t.nav.belanja}
          </Link>
        </div>

        <div className="flex items-center gap-3 md:hidden">
          <LanguageToggle mobile />
          <button
            onClick={() => setMenuOpen(true)}
            className="flex h-11 w-11 items-center justify-center rounded-xl text-(--color-dark) transition duration-300 ease-out hover:text-(--color-terracotta) active:scale-95"
            aria-label="Buka menu"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
              <path d="M4 7h16" strokeLinecap="round" />
              <path d="M4 12h16" strokeLinecap="round" />
              <path d="M4 17h16" strokeLinecap="round" />
            </svg>
          </button>
        </div>
      </nav>

      {/* Backdrop gelap */}
      <div
        onClick={() => setMenuOpen(false)}
        className={`fixed inset-0 z-40 bg-black/50 backdrop-blur-sm transition-opacity duration-300 md:hidden ${
          menuOpen ? "pointer-events-auto opacity-100" : "pointer-events-none opacity-0"
        }`}
      />

      {/* Drawer dari kiri */}
      <aside
        className={`fixed inset-y-0 left-0 z-50 flex h-full w-72 flex-col bg-(--color-dark) px-6 py-6 shadow-2xl transition-transform duration-300 ease-out md:hidden ${
          menuOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex items-center justify-between">
          <Link href="/" className="font-serif text-lg font-bold tracking-wide text-white">
            {t.nav.judul1}
            <span className="block text-xs font-normal tracking-widest text-(--color-terracotta)">
              {t.nav.judul2}
            </span>
          </Link>

          <button
            onClick={() => setMenuOpen(false)}
            aria-label="Tutup menu"
            className="flex h-9 w-9 items-center justify-center rounded-full text-white/80 transition-colors hover:bg-white/10 hover:text-white"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <path d="M6 6L18 18M6 18L18 6" strokeLinecap="round" />
            </svg>
          </button>
        </div>

        <ul className="mt-10 flex flex-1 flex-col gap-1">
          {navLinks.map((link, index) => (
            <li
              key={link.href}
              className={menuOpen ? "animate-fade-slide-up opacity-0" : "opacity-0"}
              style={
                menuOpen
                  ? { animationDelay: `${index * 60}ms`, animationFillMode: "forwards" }
                  : undefined
              }
            >
              <a
                href={link.href}
                onClick={(e) => {
                  handleAnchorClick(e, link.href);
                  setMenuOpen(false);
                }}
                className={`block rounded-lg px-3 py-3 text-sm font-medium transition-colors ${
                  activeSection === link.href
                    ? "bg-(--color-terracotta)/15 text-(--color-terracotta)"
                    : "text-white/80 hover:bg-white/5 hover:text-white"
                }`}
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>

        <Link
          href="/produk"
          onClick={() => setMenuOpen(false)}
          className="mt-4 block rounded-full bg-(--color-terracotta) px-5 py-3 text-center text-sm font-medium text-white transition-colors hover:bg-(--color-terracotta-hover)"
        >
          {t.nav.belanja}
        </Link>
      </aside>
    </header>
  );
}