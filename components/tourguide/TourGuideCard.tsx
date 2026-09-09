"use client";

import Image from "next/image";
import { TourGuide } from "@/types/tourguide";
import { useLanguage } from "@/context/LanguageContext";
import { WhatsAppIcon } from "@/components/icons/SocialIcons";

interface TourGuideCardProps {
  guide: TourGuide;
}

export default function TourGuideCard({ guide }: TourGuideCardProps) {
  const { t } = useLanguage();
  const rawWhatsappNumber = guide.nomorWa ? String(guide.nomorWa).replace(/\D/g, "") : "";
  const whatsappNumber = rawWhatsappNumber
    ? rawWhatsappNumber.startsWith("62")
      ? rawWhatsappNumber
      : `62${rawWhatsappNumber.replace(/^0/, "")}`
    : null;

  return (
    <div className="group overflow-hidden border border-(--color-dark)/10 bg-(--color-card) p-3 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg">
      <div className="relative aspect-5/6 w-full overflow-hidden bg-(--color-cream)">
        <Image
          src={guide.foto}
          alt={guide.nama}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-105"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
      </div>

      <div className="px-1 pt-4">
        <div className="flex items-start justify-between gap-3">
          <h3 className="min-w-0 flex-1 font-serif text-lg font-semibold leading-snug text-(--color-text)">
            {guide.nama}
          </h3>

          {whatsappNumber && (
            <a
              href={`https://wa.me/${whatsappNumber}`}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`${t.tourGuidePage.contactButton} ${guide.nama}`}
              className="inline-flex shrink-0 items-center gap-1.5 bg-(--color-terracotta) px-3 py-2 text-xs font-medium text-white transition-colors hover:bg-(--color-terracotta-hover)"
            >
              <WhatsAppIcon className="h-4 w-4" />
              <span>{t.tourGuidePage.contactButton}</span>
            </a>
          )}
        </div>

        <div className="mt-1 flex items-center gap-2 text-xs text-(--color-text-muted)">
          <span>{guide.usia} {t.tourGuidePage.tahun}</span>
          <span aria-hidden="true">&bull;</span>
          <span>{guide.gender}</span>
        </div>
      </div>
    </div>
  );
}
