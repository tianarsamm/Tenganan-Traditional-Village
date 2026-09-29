"use client";

import { useEffect, useRef, useState } from "react";
import { useLanguage } from "@/context/LanguageContext";

const TOUR_URL =
  process.env.NEXT_PUBLIC_TOUR_URL ?? "https://tenganan-tour.pages.dev/index.htm";

export default function VirtualTour() {
  const [started, setStarted] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const frameRef = useRef<HTMLDivElement>(null);
  const { t } = useLanguage();

  useEffect(() => {
    const onChange = () => setIsFullscreen(!!document.fullscreenElement);
    document.addEventListener("fullscreenchange", onChange);
    return () => document.removeEventListener("fullscreenchange", onChange);
  }, []);

  const toggleFullscreen = () => {
    const el = frameRef.current;
    if (!el) return;
    if (document.fullscreenElement) {
      document.exitFullscreen().catch(() => {});
    } else {
      el.requestFullscreen?.().catch(() => {});
    }
  };

  return (
    <section id="virtual-tour" className="py-16">
      <div className="mx-auto max-w-6xl px-4">
        <div className="mb-6">
          <h2 className="text-3xl font-bold tracking-tight md:text-4xl">
            {t.virtualTour.title}
          </h2>
        </div>

        <div
          ref={frameRef}
          className="relative aspect-video w-full overflow-hidden bg-neutral-900 shadow-xl ring-1 ring-black/10"
        >
          {started ? (
            <>
              <iframe
                src={TOUR_URL}
                title="Virtual Tour Desa Adat Tenganan"
                allow="fullscreen; accelerometer; gyroscope; xr-spatial-tracking"
                allowFullScreen
                className="absolute inset-0 h-full w-full border-0"
              />

              <button
                type="button"
                onClick={toggleFullscreen}
                aria-label={isFullscreen ? "Keluar layar lebar" : "Layar lebar"}
                title={isFullscreen ? "Keluar layar lebar" : "Layar lebar"}
                className="absolute bottom-4 right-4 flex h-10 w-10 items-center justify-center rounded-full bg-black/60 text-white backdrop-blur transition hover:bg-black/80"
              >
                {isFullscreen ? (
                  <svg
                    viewBox="0 0 24 24"
                    className="h-5 w-5"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    aria-hidden
                  >
                    <path d="M9 4v5H4M15 4v5h5M9 20v-5H4M15 20v-5h5" />
                  </svg>
                ) : (
                  <svg
                    viewBox="0 0 24 24"
                    className="h-5 w-5"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    aria-hidden
                  >
                    <path d="M4 9V4h5M20 9V4h-5M4 15v5h5M20 15v5h-5" />
                  </svg>
                )}
              </button>
            </>
          ) : (
            <button
              type="button"
              onClick={() => setStarted(true)}
              aria-label="Mulai virtual tour"
              className="group absolute inset-0 flex flex-col items-center justify-center gap-4 bg-neutral-900 text-white transition hover:bg-neutral-800"
            >
              <span className="flex h-14 w-14 items-center justify-center rounded-full bg-white/95 text-neutral-900 shadow-lg transition group-hover:scale-105">
                <svg
                  viewBox="0 0 24 24"
                  className="ml-0.5 h-6 w-6"
                  fill="currentColor"
                  aria-hidden
                >
                  <path d="M8 5v14l11-7z" />
                </svg>
              </span>
              <span className="text-lg font-semibold tracking-wide">
                {t.nav.deskVirtualTour}
              </span>
            </button>
          )}
        </div>
      </div>
    </section>
  );
}