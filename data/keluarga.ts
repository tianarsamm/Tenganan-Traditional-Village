import qs from "qs";
import { strapiFetch } from "@/lib/strapi";
import { mapKeluargaTenun } from "@/lib/mappers/keluarga";
import type { StrapiKeluargaTenun, StrapiListResponse } from "@/types/strapi";
import type { KeluargaTenun } from "@/types/keluarga";
import type { Language } from "@/data/translations";

// Populate spesifik, bukan wildcard "*" — cuma ambil field yang benar-benar dipakai.
// Ini juga menghindari data sirkular (kategori.keluarga_tenun balik lagi ke parent-nya).
const POPULATE_QUERY = qs.stringify(
  {
    populate: {
      kategori: {
        fields: ["nama_id", "nama_en", "harga", "deskripsi_id", "deskripsi_en"],
        populate: {
          gambar: {
            fields: ["url", "alternativeText", "width", "height"],
          },
        },
      },
    },
  },
  { encodeValuesOnly: true }
);

export async function getAllKeluarga(): Promise<KeluargaTenun[]> {
  const res = await strapiFetch<StrapiListResponse<StrapiKeluargaTenun>>(
    `/keluarga-tenuns?${POPULATE_QUERY}`
  );
  return res.data.map(mapKeluargaTenun);
}

export async function getKeluargaBySlug(slug: string): Promise<KeluargaTenun | undefined> {
  const query = qs.stringify(
    {
      filters: { slug: { $eq: slug } },
      populate: {
        kategori: {
          fields: ["nama_id", "nama_en", "harga", "deskripsi_id", "deskripsi_en"],
          populate: {
            gambar: {
              fields: ["url", "alternativeText", "width", "height"],
            },
          },
        },
      },
    },
    { encodeValuesOnly: true }
  );

  const res = await strapiFetch<StrapiListResponse<StrapiKeluargaTenun>>(
    `/keluarga-tenuns?${query}`
  );
  const item = res.data[0];
  return item ? mapKeluargaTenun(item) : undefined;
}

export function getHargaRange(keluarga: KeluargaTenun): string {
  const hargaList = keluarga.kategori.map((k) => k.harga);
  const min = Math.min(...hargaList);
  const max = Math.max(...hargaList);

  const format = (n: number) => `Rp ${n.toLocaleString("id-ID")}`;

  if (min === max) return format(min);
  return `${format(min)} - ${format(max)}`;
}

export function localize(text: { id: string; en: string }, lang: Language): string {
  return text[lang] || text.id;
}