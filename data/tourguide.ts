import { TourGuide } from "@/types/tourguide";

import { strapiFetch, strapiImageUrl } from "@/lib/strapi";
import type { StrapiListResponse, StrapiTourGuide } from "@/types/strapi";

export async function getTourGuideList(): Promise<TourGuide[]> {
  const res = await strapiFetch<StrapiListResponse<StrapiTourGuide>>(
    "/tour-guides?populate=*&pagination[pageSize]=100"
  );

  return res.data.map((item) => ({
    slug: item.documentId,
    nama: item.nama_tour_guide,
    gender: item.Gender,
    usia: item.Usia,
    nomorWa: item.Nomor_WA,
    foto: strapiImageUrl(item.foto_profil.url),
  }));
}