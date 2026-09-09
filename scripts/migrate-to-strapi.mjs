// Skrip migrasi satu kali: data/keluarga.ts lama -> Strapi
// Jalankan dari root folder virtual-web:
//   node --env-file=.env.local scripts/migrate-to-strapi.mjs
//
// Prasyarat:
// - Strapi lokal sudah jalan (npm run develop di folder tenganan-cms)
// - .env.local sudah punya STRAPI_API_TOKEN (Full access token)
// - File scripts/seed-data.mjs sudah ada (salinan data lama)

import fs from "node:fs";
import path from "node:path";
import { keluargaList } from "./seed-data.mjs";

const STRAPI_URL = process.env.NEXT_PUBLIC_STRAPI_URL || "http://localhost:1337";
const TOKEN = process.env.STRAPI_API_TOKEN;

if (!TOKEN) {
  console.error("STRAPI_API_TOKEN tidak ditemukan. Pastikan sudah diisi di .env.local");
  process.exit(1);
}

const headers = {
  Authorization: `Bearer ${TOKEN}`,
};

// Upload satu file gambar ke Strapi, kembalikan numeric id media-nya
async function uploadImage(relativePath) {
  const absolutePath = path.join(process.cwd(), "public", relativePath);

  if (!fs.existsSync(absolutePath)) {
    console.warn(`  [SKIP] File tidak ditemukan: ${relativePath}`);
    return null;
  }

  const buffer = fs.readFileSync(absolutePath);
  const filename = path.basename(absolutePath);
  const ext = path.extname(filename).toLowerCase();
  const mime = ext === ".png" ? "image/png" : "image/jpeg";

  const form = new FormData();
  form.append("files", new Blob([buffer], { type: mime }), filename);

  const res = await fetch(`${STRAPI_URL}/api/upload`, {
    method: "POST",
    headers, // JANGAN set Content-Type manual, biar boundary multipart otomatis
    body: form,
  });

  if (!res.ok) {
    const errText = await res.text();
    console.warn(`  [GAGAL UPLOAD] ${relativePath}: ${res.status} ${errText}`);
    return null;
  }

  const data = await res.json();
  return data[0]?.id ?? null;
}

// Upload banyak gambar sekaligus (berurutan, supaya tidak membebani Strapi)
async function uploadImages(paths) {
  const ids = [];
  for (const p of paths) {
    const id = await uploadImage(p);
    if (id) ids.push(id);
  }
  return ids;
}

async function createKeluarga(keluarga) {
  const res = await fetch(`${STRAPI_URL}/api/keluarga-tenuns`, {
    method: "POST",
    headers: { ...headers, "Content-Type": "application/json" },
    body: JSON.stringify({
      data: {
        slug: keluarga.slug,
        nama_keluarga_id: keluarga.namaKeluarga.id,
        nama_keluarga_en: keluarga.namaKeluarga.en,
        no_wa: keluarga.noWa,
        publishedAt: new Date().toISOString(), // langsung publish, bukan draft
      },
    }),
  });

  if (!res.ok) {
    const errText = await res.text();
    throw new Error(`Gagal create Keluarga Tenun "${keluarga.slug}": ${res.status} ${errText}`);
  }

  const json = await res.json();
  return json.data.documentId;
}

async function createKategori(kategori, keluargaDocumentId) {
  const imageIds = await uploadImages(kategori.gambar);

  const res = await fetch(`${STRAPI_URL}/api/kategori-tenuns`, {
    method: "POST",
    headers: { ...headers, "Content-Type": "application/json" },
    body: JSON.stringify({
      data: {
        nama_id: kategori.nama.id,
        nama_en: kategori.nama.en,
        harga: kategori.harga,
        deskripsi_id: kategori.deskripsi?.id ?? null,
        deskripsi_en: kategori.deskripsi?.en ?? null,
        gambar: imageIds,
        keluarga_tenun: keluargaDocumentId,
        publishedAt: new Date().toISOString(),
      },
    }),
  });

  if (!res.ok) {
    const errText = await res.text();
    throw new Error(`Gagal create Kategori Tenun "${kategori.nama.id}": ${res.status} ${errText}`);
  }
}

async function main() {
  console.log(`Memulai migrasi ${keluargaList.length} keluarga tenun ke Strapi...\n`);

  let successCount = 0;
  let failCount = 0;

  for (const keluarga of keluargaList) {
    try {
      console.log(`-> ${keluarga.namaKeluarga.id} (${keluarga.slug})`);
      const keluargaDocumentId = await createKeluarga(keluarga);

      for (const kategori of keluarga.kategori) {
        console.log(`   - ${kategori.nama.id}`);
        await createKategori(kategori, keluargaDocumentId);
      }

      successCount++;
    } catch (err) {
      console.error(`   [ERROR] ${err.message}`);
      failCount++;
    }
  }

  console.log(`\nSelesai. Berhasil: ${successCount}, Gagal: ${failCount}`);
}

main();
