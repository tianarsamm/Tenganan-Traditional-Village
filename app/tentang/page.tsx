import { getTentangDesa } from "@/data/tentang";
import TentangPageClient from "./TentangPageClient";

export const metadata = {
  title: "Tentang Desa Adat Tenganan",
  description:
    "Kenali sejarah, budaya, dan kehidupan masyarakat Desa Adat Tenganan di Karangasem, Bali.",
  alternates: {
    canonical: "/tentang",
  },
};

export default async function TentangPage() {
  const tentang = await getTentangDesa();
  return <TentangPageClient tentang={tentang} />;
}