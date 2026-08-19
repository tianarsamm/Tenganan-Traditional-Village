import { KeluargaTenun } from "@/types/keluarga";
import type { Language } from "@/data/translations";

export const keluargaList: KeluargaTenun[] = [
  // keluarga 01
  {
    slug: "keluarga-diana",
    namaKeluarga: { id: "Keluarga Ibu Diana", en: "Ibu Diana's Family" },
    noWa: "6282340416162",
    kategori: [
      {
        id: "Kamen",
        nama: { id: "Kamen Batun Kacang", en: "Batun Kacang Kamen" },
        harga: 350000,
        gambar: [
          "/images/produk/1/1.jpg",
          "/images/produk/wayan-sudira/selendang/2.jpg",
          "/images/produk/wayan-sudira/selendang/3.jpg",
        ],
        deskripsi: {
          id: "Kamen Batun Kacang merupakan tenunan tradisional yang dibuat menggunakan bahan Kapas Bali dengan warna yang tahan lama dan tidak mudah pudar.",
          en: "Kamen Batun Kacang is a traditional woven textile made from Bali Cotton, featuring long-lasting colors that are resistant to fading.",
        },
      },
      {
        id: "selendang",
        nama: { id: "Selendang", en: "Shawl" },
        harga: 375000,
        gambar: [
          "/images/produk/1/2.jpg",
          "/images/produk/wayan-sudira/double-ikat/2.jpg",
        ],
        deskripsi: {
          id: "Selendang merupakan kain tradisional yang dibuat menggunakan bahan Kapas Bali dengan warna yang tahan lama dan tidak mudah pudar.",
          en: "Selendang is a traditional textile made from Bali Cotton, featuring long-lasting colors that are resistant to fading.",
        },
      },
    ],
  },

  // keluarga 02
  {
    slug: "keluarga-komang-sudiani",
    namaKeluarga: { id: "Keluarga Ibu Komang Sudiani", en: "Ibu Komang Sudiani's Family" },
    noWa: "6281234567891",
    kategori: [
      {
        id: "tenun gedogan",
        nama: { id: "Tenun Gedogan", en: "Gedogan Weaving" },
        harga: 350000,
        gambar: ["/images/produk/2/2.jpg"],
        deskripsi: {
          id: "Tenun Gedogan merupakan kain tradisional yang dibuat dengan teknik tenun manual menggunakan bahan alami. Warna yang dihasilkan memiliki karakter alami dan tahan lama sehingga tidak mudah pudar. Tersedia berbagai pilihan warna, dan pelanggan juga dapat melakukan request warna sesuai keinginan.",
          en: "Gedogan Weaving is a traditional handmade textile crafted using natural materials and traditional weaving techniques. Its naturally derived colors are long-lasting and resistant to fading. Various color options are available, and customers can also request their preferred color.",
        },
      },
    ],
  },

  // keluarga 03
  {
    slug: "keluarga-pasek",
    namaKeluarga: { id: "Keluarga Ibu Pasek", en: "Ibu Pasek's Family" },
    noWa: "6281234567891",
    kategori: [
      {
        id: "tenun double ikat",
        nama: { id: "Tenun Double Ikat Gringsing", en: "Gringsing Double Ikat Weaving" },
        harga: 1000000,
        gambar: ["/images/produk/2/2.jpg"],
        deskripsi: {
          id: "Tenun Double Ikat merupakan kain tradisional yang dibuat menggunakan bahan alami dengan teknik double ikat. Seiring waktu, warna kain akan semakin kuat dan memiliki karakter yang semakin indah.",
          en: "Double Ikat Weaving is a traditional textile made from natural materials using the double ikat technique. Over time, its colors become deeper and stronger, giving the fabric an increasingly beautiful and distinctive character."
        },
      },
      {
        id: "tenun paplendoan",
        nama: { id: "Tenun Paplendoan", en: "Paplendoan Weaving" },
        harga: 250000,
        gambar: ["/images/produk/2/2.jpg"],
        deskripsi: {
          id: "Tenun Paplendoan merupakan kain tradisional dengan warna yang tahan lama dan tidak mudah luntur. Tersedia berbagai pilihan warna, dan pelanggan juga dapat request warna sesuai keinginan.",
          en: "Paplendoan Weaving is a traditional textile with long-lasting colors that are resistant to fading. Various colors are available, and customers can also request their preferred color."
        },

      },
    ],
  },
];

export function getKeluargaBySlug(slug: string): KeluargaTenun | undefined {
  return keluargaList.find((k) => k.slug === slug);
}

export function getHargaRange(keluarga: KeluargaTenun): string {
  const hargaList = keluarga.kategori.map((k) => k.harga);
  const min = Math.min(...hargaList);
  const max = Math.max(...hargaList);

  const format = (n: number) => `Rp ${n.toLocaleString("id-ID")}`;

  if (min === max) return format(min);
  return `${format(min)} - ${format(max)}`;
}

// Ambil teks sesuai bahasa aktif, fallback ke Indonesia kalau ada yang kosong
export function localize(text: { id: string; en: string }, lang: Language): string {
  return text[lang] || text.id;
}