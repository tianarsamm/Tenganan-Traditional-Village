export interface StrapiImage {
  id: number;
  url: string;
  width: number;
  height: number;
  formats?: {
    thumbnail?: { url: string };
    small?: { url: string };
    medium?: { url: string };
    large?: { url: string };
  };
}

export interface StrapiKategoriTenun {
  id: number;
  documentId: string;
  nama_id: string;
  nama_en: string;
  harga: number;
  deskripsi_id: string | null;
  deskripsi_en: string | null;
  gambar: StrapiImage[];
}

export interface StrapiKeluargaTenun {
  id: number;
  documentId: string;
  slug: string;
  nama_keluarga_id: string;
  nama_keluarga_en: string;
  no_wa: string;
  kategori: StrapiKategoriTenun[];
}

export interface StrapiListResponse<T> {
  data: T[];
  meta: {
    pagination: {
      page: number;
      pageSize: number;
      pageCount: number;
      total: number;
    };
  };
}

export interface StrapiSectionTentang {
  id: number;
  heading_id: string;
  heading_en: string;
  paragraf_id: string;
  paragraf_en: string;
}

export interface StrapiMisiItem {
  id: number;
  text_id: string;
  text_en: string;
}

export interface StrapiTentangDesa {
  id: number;
  documentId: string;
  title1_id: string;
  title1_en: string;
  title_id: string;
  title_en: string;
  intro_id: string;
  intro_en: string;
  visi_id: string;
  visi_en: string;
  Section: StrapiSectionTentang[];
  Misi: StrapiMisiItem[];
}

export interface StrapiGaleriItem {
  id: number;
  documentId: string;
  alt: string;
  gambar: StrapiImage;
}

export interface StrapiTourGuide {
  id: number;
  documentId: string;
  nama_tour_guide: string;
  Gender: string;
  Usia: string;
  Nomor_WA: number | null;
  foto_profil: StrapiImage;
}