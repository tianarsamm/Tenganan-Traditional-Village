"use client";

import { useState } from "react";
import Image from "next/image";
import { useLanguage } from "@/context/LanguageContext";
import NavbarDetail from "@/components/layout/NavbarDetail";

type Tab = "tentang" | "visimisi";

export default function TentangPage() {
  const [activeTab, setActiveTab] = useState<Tab>("tentang");
  const { t } = useLanguage();

  return (
    <div className="relative min-h-screen bg-(--color-cream)">
      <NavbarDetail />

      <div className="flex min-h-screen flex-col pt-24 md:pt-28">
        {/* Tab switcher - fade in duluan */}
        <div className="animate-fade-in border-b border-(--color-dark)/10 px-6 md:px-12">
          <div className="mx-auto flex max-w-6xl items-center gap-8">
            <button
              onClick={() => setActiveTab("tentang")}
              className={`border-b-2 px-1 py-4 text-sm font-semibold uppercase tracking-wide transition-colors ${
                activeTab === "tentang"
                  ? "border-(--color-terracotta) text-(--color-terracotta)"
                  : "border-transparent text-(--color-text-muted) hover:text-(--color-text)"
              }`}
            >
              {t.tabTentang}
            </button>
            <button
              onClick={() => setActiveTab("visimisi")}
              className={`border-b-2 px-1 py-4 text-sm font-semibold uppercase tracking-wide transition-colors ${
                activeTab === "visimisi"
                  ? "border-(--color-terracotta) text-(--color-terracotta)"
                  : "border-transparent text-(--color-text-muted) hover:text-(--color-text)"
              }`}
            >
              {t.tabVisiMisi}
            </button>
          </div>
        </div>

        {/* Area konten - animasi ulang setiap kali activeTab berubah, karena "key" berubah */}
        <div className="flex-1 overflow-auto px-6 py-10 md:px-12">
          <div key={activeTab} className="animate-fade-slide-up mx-auto max-w-6xl">
            {activeTab === "tentang" ? <TentangContent /> : <VisiMisiContent />}
          </div>
        </div>
      </div>
    </div>
  );
}

function TentangContent() {
  const { t } = useLanguage();
  return (
    <div className="h-full overflow-y-auto md:overflow-hidden">
      <div className="relative float-right ml-6 mb-4 aspect-4/3 w-40 overflow-hidden rounded-xl sm:w-56 md:w-64">
        <Image
          src="/images/desa/desa_img.jpg"
          alt={t.tentangDetail.imageAlt}
          fill
          className="object-cover"
        />
      </div>

      <span className="text-sm font-medium uppercase tracking-widest text-(--color-terracotta)">
        {t.tentangDetail.title1}
      </span>
      <h1 className="mt-2 font-serif text-2xl font-bold text-(--color-text) md:text-3xl">
        {t.tentangDetail.title}
      </h1>

      {t.tentangDetail.intro.map((paragraph, index) => (
        <p key={index} className="mt-4 leading-relaxed text-(--color-text-muted)">
          {paragraph}
        </p>
      ))}

      {t.tentangDetail.sections.map((section, index) => (
        <div key={index} className="mt-8">
          <h2 className="text-xl font-semibold text-(--color-text)">{section.heading}</h2>
          {section.paragraphs.map((paragraph, paragraphIndex) => (
            <p key={paragraphIndex} className="mt-4 leading-relaxed text-(--color-text-muted)">
              {paragraph}
            </p>
          ))}
        </div>
      ))}
    </div>
  );
}

function VisiMisiContent() {
  const { t } = useLanguage();
  return (
    <div className="grid h-full grid-cols-1 gap-8 md:grid-cols-2">
      <div className="overflow-y-auto rounded-xl p-8 border border-(--color-dark)/20">
        <span className="text-sm font-medium uppercase tracking-widest text-(--color-terracotta)">
          {t.visiLabel}
        </span>
        <h2 className="mt-2 font-serif text-2xl font-bold text-(--color-text)">
          {t.visiTitle}
        </h2>
        <p className="mt-4 leading-relaxed text-(--color-text-muted)">
          {t.visiText}
        </p>
      </div>

      <div className="overflow-y-auto rounded-xl p-8 border border-(--color-dark)/20">
        <span className="text-sm font-medium uppercase tracking-widest text-(--color-terracotta)">
          {t.misiLabel}
        </span>
        <h2 className="mt-2 font-serif text-2xl font-bold text-(--color-text)">
          {t.misiTitle}
        </h2>
        <ul className="mt-4 space-y-2 text-(--color-text-muted)">
          {t.misiList.map((item: string, i: number) => (
            <li key={i} className="flex gap-2">
              <span className="text-(--color-terracotta)">•</span>
              <span>{item}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}