"use client";

import Link from "next/link";
import { useLanguage } from "@/context/LanguageContext";

export default function ProdukPageHeading() {
  const { t } = useLanguage();

  return (
    <>
      <Link
        href="/"
        className="rounded-full bg-(--color-terracotta) px-5 py-2 text-sm font-medium text-white transition duration-200 ease-out hover:bg-(--color-terracotta-hover)"
      >
        {t.produk.backToHome}
      </Link>

      <div className="mb-12 text-center">
        <span className="text-sm font-medium uppercase tracking-widest text-(--color-terracotta)">
          {t.produk.sectionLabel}
        </span>
        <h1 className="mt-2 font-serif text-3xl font-bold text-(--color-text) md:text-4xl">
          {t.produk.collectionTitle}
        </h1>
        <p className="mx-auto mt-3 max-w-xl text-(--color-text-muted)">
          {t.produk.collectionSubtitle}
        </p>
      </div>
    </>
  );
}
