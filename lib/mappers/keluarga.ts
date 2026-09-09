import { strapiImageUrl } from "@/lib/strapi";
import type { StrapiKeluargaTenun, StrapiKategoriTenun } from "@/types/strapi";
import type { KeluargaTenun, KategoriTenun } from "@/types/keluarga";

function mapKategori(k: StrapiKategoriTenun): KategoriTenun {
  return {
    id: k.documentId,
    nama: {
      id: k.nama_id,
      en: k.nama_en,
    },
    harga: k.harga,
    gambar: (k.gambar || []).map((img) => strapiImageUrl(img.url)),
    deskripsi:
      k.deskripsi_id || k.deskripsi_en
        ? {
            id: k.deskripsi_id || "",
            en: k.deskripsi_en || "",
          }
        : undefined,
  };
}

export function mapKeluargaTenun(item: StrapiKeluargaTenun): KeluargaTenun {
  return {
    slug: item.slug,
    namaKeluarga: {
      id: item.nama_keluarga_id,
      en: item.nama_keluarga_en,
    },
    noWa: item.no_wa,
    kategori: (item.kategori || []).map(mapKategori),
  };
}