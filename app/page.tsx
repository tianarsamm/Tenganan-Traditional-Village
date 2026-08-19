import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import Hero from "@/components/sections/Hero";
import TentangDesa from "@/components/sections/TentangDesa";
import Tenun from "@/components/sections/Tenun";
import GaleriDesa from "@/components/sections/GaleriDesa";
import VirtualTour from "@/components/sections/VirtualTour";
import TourGuideSection from "@/components/sections/TourGuideSection";
// import KontakLokasi from "@/components/sections/KontakLokasi";

export default function Home() {
  return (
    <>
      <Navbar />
      <Hero />
      <TentangDesa />
      <Tenun />
      <VirtualTour />
      <GaleriDesa />
<TourGuideSection />
      {/* <KontakLokasi /> */}
      <Footer />
    </>
  );
}