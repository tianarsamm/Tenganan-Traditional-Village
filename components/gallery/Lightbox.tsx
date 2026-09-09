"use client";

import { useEffect } from "react";
import Image from "next/image";

interface LightboxImage {
  src: string;
  alt: string;
}

interface LightboxProps {
  images: LightboxImage[];
  activeIndex: number;
  onClose: () => void;
  onNavigate: (index: number) => void;
}

export default function Lightbox({ images, activeIndex, onClose, onNavigate }: LightboxProps) {
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowRight") onNavigate((activeIndex + 1) % images.length);
      if (e.key === "ArrowLeft") onNavigate((activeIndex - 1 + images.length) % images.length);
    };
    window.addEventListener("keydown", handleKey);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", handleKey);
      document.body.style.overflow = "";
    };
  }, [activeIndex, images.length, onClose, onNavigate]);

  const current = images[activeIndex];
  if (!current) return null;

  return (
    <div
      className="fixed inset-0 z-100 flex items-center justify-center bg-black/90 px-4 backdrop-blur-sm"
      onClick={onClose}
    >
      {/* Tombol tutup */}
      <button
        onClick={onClose}
        aria-label="Tutup"
        className="absolute right-5 top-5 flex h-10 w-10 items-center justify-center bg-white/10 text-white transition-colors hover:bg-white/20"
      >
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M6 6L18 18M6 18L18 6" strokeLinecap="round" />
        </svg>
      </button>

      {/* Counter */}
      <span className="absolute left-5 top-5 text-sm font-medium text-white/70">
        {activeIndex + 1} / {images.length}
      </span>

      {/* Tombol prev */}
      <button
        onClick={(e) => {
          e.stopPropagation();
          onNavigate((activeIndex - 1 + images.length) % images.length);
        }}
        aria-label="Sebelumnya"
        className="absolute left-3 flex h-11 w-11 items-center justify-center rounded-full bg-white/10 text-white transition-colors hover:bg-white/20 md:left-6"
      >
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M15 18l-6-6 6-6" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </button>

      {/* Gambar utama */}
      <Image
        src={current.src}
        alt={current.alt}
        width={1600}
        height={1200}
        onClick={(e) => e.stopPropagation()}
        className="max-h-[85vh] max-w-full object-contain"
      />

      {/* Tombol next */}
      <button
        onClick={(e) => {
          e.stopPropagation();
          onNavigate((activeIndex + 1) % images.length);
        }}
        aria-label="Selanjutnya"
        className="absolute right-3 flex h-11 w-11 items-center justify-center rounded-full bg-white/10 text-white transition-colors hover:bg-white/20 md:right-6"
      >
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M9 18l6-6-6-6" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </button>
    </div>
  );
}