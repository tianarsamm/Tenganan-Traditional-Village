import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import Hero from "@/components/sections/Hero";
import TentangDesa from "@/components/sections/TentangDesa";
import Tenun from "@/components/sections/Tenun";
import GaleriDesa from "@/components/sections/GaleriDesa";
import VirtualTour from "@/components/sections/VirtualTour";
import TourGuideSection from "@/components/sections/TourGuideSection";
// import KontakLokasi from "@/components/sections/KontakLokasi";
import { getGaleriItems } from "@/data/galeri";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";

const structuredData = {
  "@context": "https://schema.org",
  "@type": "TouristDestination",
  name: "Desa Adat Tenganan",
  description: "Destinasi wisata budaya, tenun, dan kehidupan tradisional di Karangasem, Bali.",
  url: SITE_URL,
  image: `${SITE_URL}/og-image.png`,
  touristType: ["Cultural tourism", "Heritage tourism"],
  geo: {
    "@type": "GeoCoordinates",
    latitude: -8.4775,
    longitude: 115.56639,
  },
  address: {
    "@type": "PostalAddress",
    streetAddress: "Desa Adat Tenganan",
    addressLocality: "Manggis",
    addressRegion: "Bali",
    addressCountry: "ID",
  },
};

export default async function Home() {
  const galeriItems = await getGaleriItems();

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
      <Navbar />
      <Hero />
      <TentangDesa />
      <Tenun />
      <VirtualTour />
      <GaleriDesa items={galeriItems} />
      <TourGuideSection />
      {/* <KontakLokasi /> */}
      <Footer />
    </>
  );
}