import { getAllKeluarga } from "@/data/keluarga";
import KeluargaGrid from "@/components/produk/KeluargaGrid";
import Navbar from "@/components/layout/NavbarDetail";

export const metadata = {
  title: "Kain Tenun Desa | Halaman Penjualan",
  description: "Jelajahi koleksi kain tenun asli hasil karya para penenun desa.",
  alternates: {
    canonical: "/produk",
  },
};

export default async function ProdukPage() {
  const keluargaList = await getAllKeluarga();

  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-(--color-cream) px-6 py-36 md:px-12">
        <div className="mx-auto max-w-6xl">
          <div
            className="animate-fade-slide-up"
            style={{ animationDelay: "0.15s", animationFillMode: "backwards" }}
          >
            <KeluargaGrid keluargaList={keluargaList} />
          </div>
        </div>
      </main>
    </>
  );
}