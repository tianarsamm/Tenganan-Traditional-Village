export interface LocalizedText {
  id: string;
  en: string;
}

export interface SectionTentang {
  heading: LocalizedText;
  paragraf: LocalizedText;
}

export interface MisiItem {
  text: LocalizedText;
}

export interface TentangDesa {
  title1: LocalizedText;
  title: LocalizedText;
  intro: LocalizedText; // teks utuh, di-split jadi paragraf saat render
  visi: LocalizedText;
  sections: SectionTentang[];
  misi: MisiItem[];
}