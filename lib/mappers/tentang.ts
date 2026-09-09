import type { StrapiTentangDesa } from "@/types/strapi";
import type { TentangDesa } from "@/types/tentang";

export function mapTentangDesa(item: StrapiTentangDesa): TentangDesa {
  return {
    title1: { id: item.title1_id, en: item.title1_en },
    title: { id: item.title_id, en: item.title_en },
    intro: { id: item.intro_id, en: item.intro_en },
    visi: { id: item.visi_id, en: item.visi_en },
    sections: item.Section.map((s) => ({
      heading: { id: s.heading_id, en: s.heading_en },
      paragraf: { id: s.paragraf_id, en: s.paragraf_en },
    })),
    misi: item.Misi.map((m) => ({
      text: { id: m.text_id, en: m.text_en },
    })),
  };
}