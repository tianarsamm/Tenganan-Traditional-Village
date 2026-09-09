"use client";

import { useLanguage } from "@/context/LanguageContext";

export default function TourGuidePageHeading() {
  const { t } = useLanguage();

  return (
    <div className="mb-12 text-center">
      {/* <span className="text-sm font-medium uppercase tracking-widest text-(--color-terracotta)">
        {t.tourGuidePage.sectionLabel}
      </span> */}
      <h1 className="mt-2 font-serif text-3xl font-bold text-(--color-text) md:text-4xl">
        {t.tourGuidePage.title}
      </h1>
      {/* <p className="mx-auto mt-3 max-w-xl text-(--color-text-muted)">
        {t.tourGuidePage.description}
      </p> */}
    </div>
  );
}