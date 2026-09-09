import { getTourGuideList } from "@/data/tourguide";
import TourGuideGrid from "@/components/tourguide/TourGuideGrid";
import TourGuidePageHeading from "@/components/tourguide/TourGuidePageHeading";
import NavbarDetail from "@/components/layout/NavbarDetail";

export const metadata = {
  title: "Tour Guide Desa | Desa Adat Tenganan",
  description: "Kenali para pemandu wisata lokal Desa Adat Tenganan.",
  alternates: {
    canonical: "/tour-guide",
  },
};

export default async function TourGuidePage() {
  const tourGuideList = await getTourGuideList();

  return (
    <>
      <NavbarDetail />
      <main className="min-h-screen bg-(--color-cream) px-6 pb-16 pt-32 md:px-12">
        <div className="mx-auto max-w-6xl">
          <div className="animate-fade-in">
            <TourGuidePageHeading />
          </div>

          <div
            className="animate-fade-slide-up"
            style={{ animationDelay: "0.15s", animationFillMode: "backwards" }}
          >
            <TourGuideGrid tourGuideList={tourGuideList} />
          </div>
        </div>
      </main>
    </>
  );
}