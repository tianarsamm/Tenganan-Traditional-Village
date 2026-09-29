"use client";

import { useState } from "react";

const TOUR_URL =
  process.env.NEXT_PUBLIC_TOUR_URL ?? "https://tenganan-tour.pages.dev/index.htm";

export default function VirtualTour() {
  const [started, setStarted] = useState(false);

  return (
    <section id="virtual-tour" className="py-16">
      <div className="mx-auto max-w-6xl px-4">
        <h2 className="mb-6 text-3xl font-bold">Virtual Tour</h2>

        <div className="relative aspect-video w-full overflow-hidden rounded-2xl bg-neutral-900">
          {started ? (
            <iframe
              src={TOUR_URL}
              title="Virtual Tour Desa Adat Tenganan"
              allow="fullscreen; accelerometer; gyroscope; xr-spatial-tracking"
              allowFullScreen
              className="absolute inset-0 h-full w-full border-0"
            />
          ) : (
            <button
              type="button"
              onClick={() => setStarted(true)}
              className="absolute inset-0 flex flex-col items-center justify-center gap-3 text-white"
            >
              <span className="rounded-full bg-white/90 px-6 py-3 font-semibold text-neutral-900">
                ▶ Mulai Virtual Tour
              </span>
              <span className="text-sm text-white/80">
                Disarankan menggunakan Wi-Fi
              </span>
            </button>
          )}
        </div>
      </div>
    </section>
  );
}