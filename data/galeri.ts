import { strapiFetch, strapiImageUrl } from "@/lib/strapi";
import type { StrapiGaleriItem, StrapiListResponse } from "@/types/strapi";

export interface GaleriItem {
  src: string;
  alt: string;
}

export async function getGaleriItems(): Promise<GaleriItem[]> {
  const res = await strapiFetch<StrapiListResponse<StrapiGaleriItem>>(
    "/galeris?populate=*&pagination[pageSize]=100"
  );
  return res.data.map((item) => ({
    src: strapiImageUrl(item.gambar.url),
    alt: item.alt,
  }));
}