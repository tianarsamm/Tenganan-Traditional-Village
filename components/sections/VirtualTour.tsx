"use client";

import { useEffect, useRef, useState } from "react";
import Script from "next/script";
import { useLanguage } from "@/context/LanguageContext";

declare global {
  interface PannellumViewer {
    on: (event: string, callback: (value: string) => void) => void;
    loadScene: (sceneId: string) => void;
    destroy: () => void;
  }

  interface Window {
    pannellum: {
      viewer: (element: HTMLDivElement, config: unknown) => PannellumViewer;
    };
  }
}

const PANNELLUM_CSS_ID = "pannellum-css";

// Konfigurasi dummy multi-scene. Ganti panorama & hotspot sesuai lokasi asli nanti.
const TOUR_SCENES = {
  depan: {
    title: "Halaman Depan Desa",
    panorama: "/images/virtual-tour/depan2.jpg",
    hfov: 100,
    pitch: 0,
    yaw: 0,
    hotSpots: [
      {
        pitch: -1,
        yaw: 90,
        type: "scene",
        text: "Menuju Balai Desa",
        sceneId: "balai",
      },
    ],
  },
  balai: {
    title: "Balai Desa",
    panorama: "/images/virtual-tour/taman.jpg",
    hfov: 100,
    pitch: 0,
    yaw: 180,
    hotSpots: [
      {
        pitch: -1,
        yaw: 270,
        type: "scene",
        text: "Kembali ke Halaman Depan",
        sceneId: "depan",
      },
    ],
  },
};

export default function VirtualTour() {
  const { t } = useLanguage();
  const [showAudioPrompt, setShowAudioPrompt] = useState(true);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [pannellumReady, setPannellumReady] = useState(false);
  const [activeScene, setActiveScene] = useState("depan");

  const frameRef = useRef<HTMLDivElement>(null);
  const viewerRef = useRef<HTMLDivElement>(null);
  const panoramaInstance = useRef<PannellumViewer | null>(null);

  // Inject CSS Pannellum sekali saja
  useEffect(() => {
    if (document.getElementById(PANNELLUM_CSS_ID)) return;
    const link = document.createElement("link");
    link.id = PANNELLUM_CSS_ID;
    link.rel = "stylesheet";
    link.href = "https://cdn.jsdelivr.net/npm/pannellum@2.5.6/build/pannellum.css";
    document.head.appendChild(link);
  }, []);

  // Fullscreen listener
  useEffect(() => {
    function handleFullscreenChange() {
      setIsFullscreen(Boolean(document.fullscreenElement));
    }
    document.addEventListener("fullscreenchange", handleFullscreenChange);
    return () =>
      document.removeEventListener("fullscreenchange", handleFullscreenChange);
  }, []);

  // Init viewer Pannellum setelah script siap
  useEffect(() => {
    if (!pannellumReady || !viewerRef.current || panoramaInstance.current) return;

    panoramaInstance.current = window.pannellum.viewer(viewerRef.current, {
      default: {
        firstScene: "depan",
        author: "Desa Adat Tenganan",
        sceneFadeDuration: 800,
        autoLoad: true,
        compass: false,
        showControls: false,
        hotSpotDebug: false,
      },
      scenes: TOUR_SCENES,
    });

    panoramaInstance.current.on("scenechange", (sceneId: string) => {
      setActiveScene(sceneId);
    });

    return () => {
      panoramaInstance.current?.destroy?.();
      panoramaInstance.current = null;
    };
  }, [pannellumReady]);

  const toggleFullscreen = async () => {
    if (!frameRef.current) return;
    if (!document.fullscreenElement) {
      try {
        await frameRef.current.requestFullscreen();
      } catch (err) {
        console.error("Gagal masuk fullscreen:", err);
      }
    } else {
      await document.exitFullscreen();
    }
  };

  const goToScene = (sceneId: string) => {
    panoramaInstance.current?.loadScene?.(sceneId);
  };

  return (
    <>
      <Script
        src="https://cdn.jsdelivr.net/npm/pannellum@2.5.6/build/pannellum.js"
        strategy="afterInteractive"
        onLoad={() => setPannellumReady(true)}
      />

      <section id="virtual-tour" className="bg-(--color-cream) px-6 py-20 md:px-12">
        <div className="mx-auto max-w-5xl">
          <div className="mb-10 text-center">
            <h2 className="mt-2 font-serif text-3xl font-bold text-(--color-text) md:text-4xl">
              {t.virtualTour.title}
            </h2>
            <p className="mx-auto mt-3 max-w-lg text-(--color-text-muted)">
              {t.virtualTour.description}
            </p>
          </div>

          <div
            ref={frameRef}
            className={`relative w-full overflow-hidden border border-(--color-dark)/10 bg-(--color-dark) shadow-2xl shadow-black/20 ${
              isFullscreen ? "h-screen" : "aspect-video"
            }`}
          >
            {/* Container Pannellum */}
            <div ref={viewerRef} className="absolute inset-0 h-full w-full" />

            {/* Top bar: judul scene aktif */}
            <div className="pointer-events-none absolute inset-x-0 top-0 z-10 flex items-center justify-between p-4">
              <span className="text-xs font-semibold tracking-wide text-white [text-shadow:0_1px_3px_rgba(0,0,0,0.6)]">
                {TOUR_SCENES[activeScene as keyof typeof TOUR_SCENES]?.title ?? "DESA ADAT TENGANAN"}
              </span>
            </div>

            {/* Modal enable audio */}
            {showAudioPrompt && (
              <div className="absolute inset-0 z-20 flex items-center justify-center bg-black/30">
                <div className="w-64 bg-white p-5 text-center">
                  <p className="border-b border-(--color-dark)/10 pb-3 text-sm text-(--color-text)">
                    {t.virtualTour.enableAudio}
                  </p>
                  <div className="mt-3 flex justify-center gap-3">
                    <button
                      onClick={() => setShowAudioPrompt(false)}
                      className="bg-(--color-terracotta) px-4 py-1.5 text-xs font-medium text-white transition-colors hover:bg-(--color-terracotta-hover)"
                    >
                      {t.virtualTour.yes}
                    </button>
                  </div>
                </div>
              </div>
            )}

            {/* Bottom bar: navigasi scene + fullscreen */}
            <div className="absolute inset-x-0 bottom-0 z-10 flex items-center justify-between bg-(--color-dark)/60 px-4 py-2.5 backdrop-blur-sm">
              <div className="flex gap-2">
                {Object.entries(TOUR_SCENES).map(([id, scene]) => (
                  <button
                    key={id}
                    onClick={() => goToScene(id)}
                    className={`rounded-md px-2.5 py-1 text-[11px] font-medium transition-colors ${
                      activeScene === id
                        ? "bg-(--color-terracotta) text-white"
                        : "bg-white/10 text-white hover:bg-white/20"
                    }`}
                  >
                    {scene.title}
                  </button>
                ))}
              </div>

              <button
                onClick={toggleFullscreen}
                aria-label={isFullscreen ? "Keluar dari layar penuh" : "Tampilkan layar penuh"}
                className="flex h-7 w-7 items-center justify-center rounded-md bg-white/10 text-white transition-colors hover:bg-white/20"
              >
                {isFullscreen ? (
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M9 4v5H4M15 4v5h5M9 20v-5H4M15 20v-5h5" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                ) : (
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M4 9V4h5M20 9V4h-5M4 15v5h5M20 15v5h-5" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                )}
              </button>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}