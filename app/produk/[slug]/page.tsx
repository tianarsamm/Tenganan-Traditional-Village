import { notFound } from "next/navigation";
import { keluargaList, getKeluargaBySlug } from "@/data/keluarga";
import KeluargaDetailGallery from "@/components/produk/KeluargaDetailGallery";

interface DetailPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return keluargaList.map((k) => ({ slug: k.slug }));
}

export async function generateMetadata({ params }: DetailPageProps) {
  const { slug } = await params;
  const keluarga = getKeluargaBySlug(slug);

  if (!keluarga) return { title: "Tidak Ditemukan" };

  return {
    title: `${keluarga.namaKeluarga} | Kain Tenun Desa`,
    description: `Koleksi tenun dari ${keluarga.namaKeluarga}`,
  };
}

export default async function KeluargaDetailPage({ params }: DetailPageProps) {
  const { slug } = await params;
  const keluarga = getKeluargaBySlug(slug);

  if (!keluarga) notFound();

  return (
    <main className="relative z-0 min-h-screen bg-(--color-cream) px-6 py-16 md:px-12">
      <div className="mx-auto max-w-6xl">
        <KeluargaDetailGallery keluarga={keluarga} />
      </div>
    </main>
  );
}