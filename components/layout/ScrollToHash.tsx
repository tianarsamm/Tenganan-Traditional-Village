"use client";

import { useEffect } from "react";

export default function ScrollToHash() {
  useEffect(() => {
    const scrollToHash = () => {
      const hash = window.location.hash;
      if (!hash) return;

      const el = document.querySelector(hash) as HTMLElement | null;
      if (!el) return;

      const headerEl = document.querySelector("header") as HTMLElement | null;
      const offset = headerEl?.offsetHeight ?? 0;
      const top = el.getBoundingClientRect().top + window.scrollY;

      window.scrollTo({ top: top - offset - 12, behavior: "smooth" });
    };

    // Delay sedikit supaya layout/gambar sempat render dulu sebelum posisi dihitung
    const timeout = setTimeout(scrollToHash, 150);
    window.addEventListener("hashchange", scrollToHash);

    return () => {
      clearTimeout(timeout);
      window.removeEventListener("hashchange", scrollToHash);
    };
  }, []);

  return null;
}