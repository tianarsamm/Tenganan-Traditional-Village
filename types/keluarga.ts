export interface LocalizedText {
  id: string;
  en: string;
}

export interface KategoriTenun {
  id: string;
  nama: LocalizedText;
  harga: number;
  gambar: string[];
  deskripsi?: LocalizedText;
}

export interface KeluargaTenun {
  slug: string;
  namaKeluarga: LocalizedText;
  noWa: string;
  kategori: KategoriTenun[];
}