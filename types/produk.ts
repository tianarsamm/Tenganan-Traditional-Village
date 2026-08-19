export interface Produk {
  slug: string;
  nama: string;
  keluarga: string;         // Dibuat oleh keluarga siapa
  deskripsi: string;
  harga: number;
  gambarUtama: string;      // Untuk card di halaman /produk
  gambarDetail: string[];   // Kumpulan gambar untuk halaman detail
  linkPenjualan?: string;   // Link WhatsApp / marketplace (opsional)
}