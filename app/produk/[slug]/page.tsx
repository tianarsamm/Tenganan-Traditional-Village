import { notFound } from "next/navigation";
import { getAllKeluarga, getKeluargaBySlug, localize } from "@/data/keluarga";
import KeluargaDetailGallery from "@/components/produk/KeluargaDetailGallery";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";

interface DetailPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const keluargaList = await getAllKeluarga();
  return keluargaList.map((k) => ({ slug: k.slug }));
}

export async function generateMetadata({ params }: DetailPageProps) {
  const { slug } = await params;
  const keluarga = await getKeluargaBySlug(slug);

  if (!keluarga) return { title: "Tidak Ditemukan" };

  const nama = localize(keluarga.namaKeluarga, "id");
  const gambarPertama = keluarga.kategori?.[0]?.gambar?.[0];

  return {
    title: `${nama} | Kain Tenun Desa`,
    description: `Koleksi tenun dari ${nama}`,
    alternates: {
      canonical: `${SITE_URL}/produk/${slug}`,
    },
    openGraph: {
      title: `${nama} | Kain Tenun Desa`,
      description: `Koleksi tenun dari ${nama}`,
      images: gambarPertama ? [{ url: gambarPertama }] : undefined,
    },
  };
}

export default async function KeluargaDetailPage({ params }: DetailPageProps) {
  const { slug } = await params;
  const keluarga = await getKeluargaBySlug(slug);

  if (!keluarga) notFound();

  return (
    <main className="relative z-0 min-h-screen bg-(--color-cream) px-6 py-16 md:px-12">
      <div className="mx-auto max-w-6xl">
        <KeluargaDetailGallery keluarga={keluarga} />
      </div>
    </main>
  );
}