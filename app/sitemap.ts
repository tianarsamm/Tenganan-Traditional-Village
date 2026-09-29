// app/sitemap.ts — otomatis expose di /sitemap.xml
import type { MetadataRoute } from "next";
import { getAllKeluarga } from "@/data/keluarga";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://tengananpegringsingan.com";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const keluargaList = await getAllKeluarga();

  const staticRoutes: MetadataRoute.Sitemap = [
    { url: SITE_URL, lastModified: new Date(), changeFrequency: "monthly", priority: 1 },
    { url: `${SITE_URL}/produk`, lastModified: new Date(), changeFrequency: "weekly", priority: 0.9 },
    { url: `${SITE_URL}/tentang`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.8 },
    { url: `${SITE_URL}/tour-guide`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.8 },
  ];

  const produkRoutes: MetadataRoute.Sitemap = keluargaList.map((k) => ({
    url: `${SITE_URL}/produk/${k.slug}`,
    lastModified: new Date(),
    changeFrequency: "weekly",
    priority: 0.7,
  }));

  return [...staticRoutes, ...produkRoutes];
}