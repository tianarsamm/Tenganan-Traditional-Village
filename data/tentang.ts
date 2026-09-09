import { strapiFetch } from "@/lib/strapi";
import { mapTentangDesa } from "@/lib/mappers/tentang";
import type { StrapiTentangDesa } from "@/types/strapi";
import type { TentangDesa } from "@/types/tentang";

interface StrapiSingleResponse<T> {
  data: T;
  meta: Record<string, never>;
}

export async function getTentangDesa(): Promise<TentangDesa> {
  const res = await strapiFetch<StrapiSingleResponse<StrapiTentangDesa>>(
    "/tentang-desa?populate[Section]=*&populate[Misi]=*"
  );
  return mapTentangDesa(res.data);
}