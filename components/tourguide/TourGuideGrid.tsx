"use client";

import { TourGuide } from "@/types/tourguide";
import { useLanguage } from "@/context/LanguageContext";
import TourGuideCard from "./TourGuideCard";

interface TourGuideGridProps {
  tourGuideList: TourGuide[];
}

export default function TourGuideGrid({ tourGuideList }: TourGuideGridProps) {
  const { t } = useLanguage();

  if (tourGuideList.length === 0) {
    return (
      <p className="py-16 text-center text-(--color-text-muted)">
        {t.tourGuidePage.emptyMessage}
      </p>
    );
  }

  return (
    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {tourGuideList.map((guide) => (
        <TourGuideCard key={guide.slug} guide={guide} />
      ))}
    </div>
  );
}