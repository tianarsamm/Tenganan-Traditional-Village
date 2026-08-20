import { KeluargaTenun } from "@/types/keluarga";
import type { Language } from "@/data/translations";

export const keluargaList: KeluargaTenun[] = [
  // keluarga 01
  {
    slug: "keluarga-diana",
    namaKeluarga: { id: "Keluarga Ibu Diana", en: "Ibu Diana's Family" },
    noWa: "6282340416162",
    kategori: [
      {
        id: "Kamen",
        nama: { id: "Kamen Batun Kacang", en: "Batun Kacang Kamen" },
        harga: 350000,
        gambar: [
          "/images/produk/1/main.jpg",
          "/images/produk/1/1.jpg",
          "/images/produk/1/1.jpg",
        ],
        deskripsi: {
          id: "Kamen Batun Kacang merupakan tenunan tradisional yang dibuat menggunakan bahan Kapas Bali dengan warna yang tahan lama dan tidak mudah pudar.",
          en: "Kamen Batun Kacang is a traditional woven textile made from Bali Cotton, featuring long-lasting colors that are resistant to fading.",
        },
      },
      {
        id: "selendang",
        nama: { id: "Selendang", en: "Shawl" },
        harga: 375000,
        gambar: [
          "/images/produk/1/2.jpg",
        ],
        deskripsi: {
          id: "Selendang merupakan kain tradisional yang dibuat menggunakan bahan Kapas Bali dengan warna yang tahan lama dan tidak mudah pudar.",
          en: "Selendang is a traditional textile made from Bali Cotton, featuring long-lasting colors that are resistant to fading.",
        },
      },
    ],
  },

  // keluarga 02
  {
    slug: "keluarga-komang-sudiani",
    namaKeluarga: { id: "Keluarga Ibu Komang Sudiani", en: "Ibu Komang Sudiani's Family" },
    noWa: "6281234567891",
    kategori: [
      {
        id: "tenun gedogan",
        nama: { id: "Tenun Gedogan", en: "Gedogan Weaving" },
        harga: 350000,
        gambar: ["/images/produk/2/1.jpg"],
        deskripsi: {
          id: "Tenun Gedogan merupakan kain tradisional yang dibuat dengan teknik tenun manual menggunakan bahan alami. Warna yang dihasilkan memiliki karakter alami dan tahan lama sehingga tidak mudah pudar. Tersedia berbagai pilihan warna, dan pelanggan juga dapat melakukan request warna sesuai keinginan.",
          en: "Gedogan Weaving is a traditional handmade textile crafted using natural materials and traditional weaving techniques. Its naturally derived colors are long-lasting and resistant to fading. Various color options are available, and customers can also request their preferred color.",
        },
      },
    ],
  },

  // keluarga 03
  {
    slug: "keluarga-pasek",
    namaKeluarga: { id: "Keluarga Ibu Pasek", en: "Ibu Pasek's Family" },
    noWa: "6281234567891",
    kategori: [
      {
        id: "tenun double ikat",
        nama: { id: "Tenun Double Ikat Gringsing", en: "Gringsing Double Ikat Weaving" },
        harga: 1000000,
        gambar: ["/images/produk/3/1.jpg"],
        deskripsi: {
          id: "Tenun Double Ikat merupakan kain tradisional yang dibuat menggunakan bahan alami dengan teknik double ikat. Seiring waktu, warna kain akan semakin kuat dan memiliki karakter yang semakin indah.",
          en: "Double Ikat Weaving is a traditional textile made from natural materials using the double ikat technique. Over time, its colors become deeper and stronger, giving the fabric an increasingly beautiful and distinctive character."
        },
      },
      {
        id: "tenun paplendoan",
        nama: { id: "Tenun Paplendoan", en: "Paplendoan Weaving" },
        harga: 250000,
        gambar: ["/images/produk/3/2.jpg"],
        deskripsi: {
          id: "Tenun Paplendoan merupakan kain tradisional dengan warna yang tahan lama dan tidak mudah luntur. Tersedia berbagai pilihan warna, dan pelanggan juga dapat request warna sesuai keinginan.",
          en: "Paplendoan Weaving is a traditional textile with long-lasting colors that are resistant to fading. Various colors are available, and customers can also request their preferred color."
        },

      },
    ],
  },

    // keluarga 05
  // {
  //   slug: "keluarga-ibu-suartini",
  //   namaKeluarga: { id: "Keluarga Ibu Suartini", en: "Ibu Suartini's Family" },
  //   noWa: "ISI_NOMOR_WA",
  //   kategori: [
  //     {
  //       id: "tenun plendo",
  //       nama: { id: "Tenun Plendo", en: "Plendo Weaving" },
  //       harga: 300000,
  //       gambar: ["/images/produk/5/1.jpg"],
  //       deskripsi: {
  //         id: "Tenun Plendo merupakan tenunan tradisional dengan warna merah maroon yang memiliki karakter kuat dan khas.",
  //         en: "Plendo Weaving is a traditional textile featuring a distinctive and rich maroon color.",
  //       },
  //     },
  //     {
  //       id: "tenun lurik",
  //       nama: { id: "Tenun Lurik", en: "Lurik Weaving" },
  //       harga: 400000,
  //       gambar: ["/images/produk/5/2.jpg"],
  //       deskripsi: {
  //         id: "Tenun Lurik merupakan tenunan tradisional yang menggunakan benang Gringsing dengan motif garis yang khas.",
  //         en: "Lurik Weaving is a traditional textile made using Gringsing yarn, featuring distinctive striped patterns.",
  //       },
  //     },
  //     {
  //       id: "tenun semi",
  //       nama: { id: "Tenun Semi", en: "Semi Weaving" },
  //       harga: 1000000,
  //       gambar: ["/images/produk/5/3.jpg"],
  //       deskripsi: {
  //         id: "Tenun Semi merupakan tenunan tradisional dengan proses pengerjaan yang menghasilkan kain bernilai dan memiliki karakter khas.",
  //         en: "Semi Weaving is a traditional textile crafted through a detailed process, resulting in a valuable fabric with distinctive character.",
  //       },
  //     },
  //   ],
  // },

  // // keluarga 06
  // {
  //   slug: "keluarga-ibu-cory",
  //   namaKeluarga: { id: "Keluarga Ibu Cory (Cory Art)", en: "Ibu Cory's Family (Cory Art)" },
  //   noWa: "628311428866",
  //   kategori: [
  //     {
  //       id: "tenun single ikat",
  //       nama: { id: "Tenun Single Ikat", en: "Single Ikat Weaving" },
  //       harga: 500000,
  //       gambar: ["/images/produk/6/1.jpg"],
  //       deskripsi: {
  //         id: "Tenun Single Ikat merupakan kain tradisional yang dibuat dengan teknik single ikat dan memiliki karakter motif yang khas.",
  //         en: "Single Ikat Weaving is a traditional textile made using the single ikat technique, featuring distinctive patterns.",
  //       },
  //     },
  //     {
  //       id: "selendang motif gringsing",
  //       nama: { id: "Selendang Motif Gringsing", en: "Gringsing Motif Shawl" },
  //       harga: 250000,
  //       gambar: ["/images/produk/6/2.jpg"],
  //       deskripsi: {
  //         id: "Selendang Motif Gringsing merupakan selendang tradisional dengan motif khas Gringsing yang memiliki nilai budaya dan keindahan tersendiri.",
  //         en: "The Gringsing Motif Shawl is a traditional shawl featuring distinctive Gringsing patterns with unique cultural and artistic value.",
  //       },
  //     },
  //     {
  //       id: "tenun atbm",
  //       nama: { id: "Tenun ATBM", en: "ATBM Weaving" },
  //       harga: 350000,
  //       gambar: ["/images/produk/6/3.jpg"],
  //       deskripsi: {
  //         id: "Tenun ATBM merupakan tenunan tradisional yang dibuat menggunakan Alat Tenun Bukan Mesin (ATBM) dan menjadi salah satu produk best seller. Pengerjaan membutuhkan waktu sekitar 2 minggu hingga 1 bulan.",
  //         en: "ATBM Weaving is a traditional textile made using a non-machine loom and is one of the best-selling products. The production process takes approximately 2 weeks to 1 month.",
  //       },
  //     },
  //   ],
  // },

  // // keluarga 07
  // {
  //   slug: "keluarga-ni-nyoman-arini",
  //   namaKeluarga: { id: "Keluarga Ni Nyoman Arini", en: "Ni Nyoman Arini's Family" },
  //   noWa: "ISI_NOMOR_WA",
  //   kategori: [
  //     {
  //       id: "tenun selendang",
  //       nama: { id: "Tenun Selendang", en: "Woven Shawl" },
  //       harga: 400000,
  //       gambar: ["/images/produk/7/1.jpg"],
  //       deskripsi: {
  //         id: "Tenun Selendang merupakan selendang tradisional dengan karakter tenunan khas yang cocok digunakan untuk berbagai kebutuhan adat maupun sehari-hari.",
  //         en: "The Woven Shawl is a traditional textile featuring distinctive craftsmanship, suitable for ceremonial and everyday use.",
  //       },
  //     },
  //     {
  //       id: "tenun single ikat",
  //       nama: { id: "Tenun Single Ikat", en: "Single Ikat Weaving" },
  //       harga: 400000,
  //       gambar: ["/images/produk/7/2.jpg"],
  //       deskripsi: {
  //         id: "Tenun Single Ikat merupakan kain tradisional yang dibuat dengan teknik single ikat dan memiliki motif serta karakter tenunan yang khas.",
  //         en: "Single Ikat Weaving is a traditional textile made using the single ikat technique, featuring distinctive patterns and craftsmanship.",
  //       },
  //     },
  //     {
  //       id: "tenun",
  //       nama: { id: "Tenun", en: "Traditional Weaving" },
  //       harga: 500000,
  //       gambar: ["/images/produk/7/3.jpg"],
  //       deskripsi: {
  //         id: "Tenun tradisional yang dibuat secara manual dengan karakter dan keindahan khas tenunan Tenganan.",
  //         en: "Traditional handwoven textile featuring the distinctive character and beauty of Tenganan weaving.",
  //       },
  //     },
  //   ],
  // },

  // // keluarga 08
  // {
  //   slug: "keluarga-bapak-ketut-panca",
  //   namaKeluarga: { id: "Keluarga Bapak Ketut Panca", en: "Bapak Ketut Panca's Family" },
  //   noWa: "6283851050747",
  //   kategori: [
  //     {
  //       id: "selendang single ikat",
  //       nama: { id: "Selendang Single Ikat", en: "Single Ikat Shawl" },
  //       harga: 1500000,
  //       gambar: ["/images/produk/8/1.jpg"],
  //       deskripsi: {
  //         id: "Selendang Single Ikat merupakan selendang tradisional yang dibuat dengan teknik single ikat dan memiliki karakter tenunan yang khas.",
  //         en: "The Single Ikat Shawl is a traditional textile made using the single ikat technique, featuring distinctive craftsmanship.",
  //       },
  //     },
  //     {
  //       id: "tenun double ikat",
  //       nama: { id: "Tenun Double Ikat", en: "Double Ikat Weaving" },
  //       harga: 6000000,
  //       gambar: ["/images/produk/8/2.jpg"],
  //       deskripsi: {
  //         id: "Tenun Double Ikat merupakan tenunan tradisional dengan proses pembuatan yang sangat kompleks. Untuk motif Gringsing, mulai dari pembuatan motif hingga proses pewarnaan dapat membutuhkan waktu hingga 2 tahun.",
  //         en: "Double Ikat Weaving is a traditional textile created through a highly complex process. For Gringsing patterns, the process from pattern preparation to dyeing can take up to 2 years.",
  //       },
  //     },
  //     {
  //       id: "tenun pelendoan",
  //       nama: { id: "Tenun Pelendoan", en: "Pelendoan Weaving" },
  //       harga: 250000,
  //       gambar: ["/images/produk/8/3.jpg"],
  //       deskripsi: {
  //         id: "Tenun Pelendoan merupakan tenunan tradisional dengan karakter motif dan warna yang khas.",
  //         en: "Pelendoan Weaving is a traditional textile featuring distinctive patterns and colors.",
  //       },
  //     },
  //   ],
  // },

  //   // keluarga 09
  // {
  //   slug: "keluarga-ibu-lety",
  //   namaKeluarga: { id: "Ibu Lety (Ni Wayan Muratni)", en: "Ibu Lety (Ni Wayan Muratni)" },
  //   noWa: "ISI_NOMOR_WA",
  //   kategori: [
  //     {
  //       id: "tenun gedogan",
  //       nama: { id: "Tenun Gedogan", en: "Gedogan Weaving" },
  //       harga: 600000,
  //       gambar: ["/images/produk/9/1.jpg"],
  //       deskripsi: {
  //         id: "Tenun Gedogan merupakan kain tradisional yang dibuat secara manual dengan teknik tenun Gedogan.",
  //         en: "Gedogan Weaving is a traditional textile handcrafted using the traditional Gedogan weaving technique.",
  //       },
  //     },
  //     {
  //       id: "tenun",
  //       nama: { id: "Tenun", en: "Traditional Weaving" },
  //       harga: 225000,
  //       gambar: ["/images/produk/9/2.jpg"],
  //       deskripsi: {
  //         id: "Tenun tradisional yang dibuat secara manual dengan karakter khas tenunan Tenganan.",
  //         en: "Traditional handwoven textile featuring the distinctive character of Tenganan weaving.",
  //       },
  //     },
  //   ],
  // },

  // // keluarga 10
  // {
  //   slug: "keluarga-luh-kembang",
  //   namaKeluarga: { id: "Luh Kembang", en: "Luh Kembang" },
  //   noWa: "ISI_NOMOR_WA",
  //   kategori: [
  //     {
  //       id: "tenun double ikat",
  //       nama: { id: "Tenun Double Ikat", en: "Double Ikat Weaving" },
  //       harga: 13000000,
  //       gambar: ["/images/produk/10/1.jpg"],
  //       deskripsi: {
  //         id: "Tenun Double Ikat merupakan tenunan tradisional dengan proses pembuatan yang kompleks dan memiliki nilai budaya yang tinggi. Menggunakan warna dasar bahan kuning.",
  //         en: "Double Ikat Weaving is a traditional textile made through a complex process and holds significant cultural value. It features a yellow base color.",
  //       },
  //     },
  //     {
  //       id: "selendang",
  //       nama: { id: "Selendang", en: "Shawl" },
  //       harga: 3500000,
  //       gambar: ["/images/produk/10/2.jpg"],
  //       deskripsi: {
  //         id: "Selendang tradisional dengan karakter tenunan khas dan menggunakan warna dasar bahan kuning.",
  //         en: "Traditional shawl featuring distinctive weaving craftsmanship with a yellow base color.",
  //       },
  //     },
  //   ],
  // },

  // // keluarga 11
  // {
  //   slug: "keluarga-bu-astiti",
  //   namaKeluarga: { id: "Bu Astiti", en: "Bu Astiti" },
  //   noWa: "6287760267890",
  //   kategori: [
  //     {
  //       id: "tenun pepelendoan",
  //       nama: { id: "Tenun Pepelendoan", en: "Pepelendoan Weaving" },
  //       harga: 200000,
  //       gambar: ["/images/produk/11/1.jpg"],
  //       deskripsi: {
  //         id: "Tenun Pepelendoan merupakan tenunan tradisional dengan karakter motif dan warna yang khas.",
  //         en: "Pepelendoan Weaving is a traditional textile featuring distinctive patterns and colors.",
  //       },
  //     },
  //     {
  //       id: "tenun gedogan",
  //       nama: { id: "Tenun Gedogan", en: "Gedogan Weaving" },
  //       harga: 350000,
  //       gambar: ["/images/produk/11/2.jpg"],
  //       deskripsi: {
  //         id: "Tenun Gedogan merupakan kain tradisional yang dibuat secara manual menggunakan teknik tenun Gedogan.",
  //         en: "Gedogan Weaving is a traditional textile handcrafted using the traditional Gedogan weaving technique.",
  //       },
  //     },
  //     {
  //       id: "tenun perengisingan kecil",
  //       nama: { id: "Tenun Perengisingan Kecil", en: "Small Perengisingan Weaving" },
  //       harga: 2800000,
  //       gambar: ["/images/produk/11/3.jpg"],
  //       deskripsi: {
  //         id: "Tenun Perengisingan Kecil merupakan tenunan tradisional dengan motif khas dan proses pengerjaan yang menghasilkan kain bernilai budaya.",
  //         en: "Small Perengisingan Weaving is a traditional textile featuring distinctive patterns and a craftsmanship process that gives it significant cultural value.",
  //       },
  //     },
  //   ],
  // },

  // // keluarga 12
  // {
  //   slug: "keluarga-julita",
  //   namaKeluarga: { id: "Julita", en: "Julita" },
  //   noWa: "6283119537945",
  //   kategori: [
  //     {
  //       id: "tenun pepelendoan",
  //       nama: { id: "Tenun Pepelendoan", en: "Pepelendoan Weaving" },
  //       harga: 300000,
  //       gambar: ["/images/produk/12/1.jpg"],
  //       deskripsi: {
  //         id: "Tenun Pepelendoan merupakan tenunan tradisional dengan motif dan warna yang khas.",
  //         en: "Pepelendoan Weaving is a traditional textile featuring distinctive patterns and colors.",
  //       },
  //     },
  //     {
  //       id: "tenun gringsing",
  //       nama: { id: "Tenun Gringsing", en: "Gringsing Weaving" },
  //       harga: 4000000,
  //       gambar: ["/images/produk/12/2.jpg"],
  //       deskripsi: {
  //         id: "Tenun Gringsing merupakan kain tradisional khas Tenganan dengan teknik dan motif yang memiliki nilai budaya tinggi.",
  //         en: "Gringsing Weaving is a traditional textile from Tenganan, featuring techniques and patterns with significant cultural value.",
  //       },
  //     },
  //     {
  //       id: "tenun garis gedogan",
  //       nama: { id: "Tenun Garis Gedogan", en: "Striped Gedogan Weaving" },
  //       harga: 300000,
  //       gambar: ["/images/produk/12/3.jpg"],
  //       deskripsi: {
  //         id: "Tenun Garis Gedogan merupakan tenunan tradisional dengan motif garis yang dibuat menggunakan teknik Gedogan.",
  //         en: "Striped Gedogan Weaving is a traditional textile featuring striped patterns made using the Gedogan technique.",
  //       },
  //     },
  //     {
  //       id: "tenun luar",
  //       nama: { id: "Tenun Luar", en: "Luar Weaving" },
  //       harga: 150000,
  //       gambar: ["/images/produk/12/4.jpg"],
  //       deskripsi: {
  //         id: "Tenun Luar merupakan tenunan tradisional dengan karakter motif dan tekstur yang khas.",
  //         en: "Luar Weaving is a traditional textile featuring distinctive patterns and texture.",
  //       },
  //     },
  //   ],
  // },

  // // keluarga 13
  // {
  //   slug: "keluarga-bapak-aga",
  //   namaKeluarga: { id: "Bapak Aga", en: "Bapak Aga" },
  //   noWa: "6281930410915",
  //   kategori: [
  //     {
  //       id: "tenun pepelendoan",
  //       nama: { id: "Tenun Pepelendoan", en: "Pepelendoan Weaving" },
  //       harga: 300000,
  //       gambar: ["/images/produk/13/1.jpg"],
  //       deskripsi: {
  //         id: "Tenun Pepelendoan merupakan tenunan tradisional dengan motif dan warna yang khas.",
  //         en: "Pepelendoan Weaving is a traditional textile featuring distinctive patterns and colors.",
  //       },
  //     },
  //     {
  //       id: "selendang double ikat",
  //       nama: { id: "Selendang Double Ikat", en: "Double Ikat Shawl" },
  //       harga: 3000000,
  //       gambar: ["/images/produk/13/2.jpg"],
  //       deskripsi: {
  //         id: "Selendang Double Ikat merupakan selendang tradisional yang dibuat menggunakan teknik double ikat dengan karakter motif yang khas.",
  //         en: "The Double Ikat Shawl is a traditional textile made using the double ikat technique, featuring distinctive patterns.",
  //       },
  //     },
  //   ],
  // },

  // // keluarga 14
  // {
  //   slug: "keluarga-ariani",
  //   namaKeluarga: { id: "Ariani", en: "Ariani" },
  //   noWa: "6287863213880",
  //   kategori: [
  //     {
  //       id: "gringsing double ikat",
  //       nama: { id: "Gringsing Double Ikat", en: "Gringsing Double Ikat" },
  //       harga: 3200000,
  //       gambar: ["/images/produk/14/1.jpg"],
  //       deskripsi: {
  //         id: "Gringsing Double Ikat merupakan tenunan tradisional khas dengan teknik double ikat dan motif yang memiliki karakter kuat.",
  //         en: "Gringsing Double Ikat is a distinctive traditional textile made using the double ikat technique, featuring strong and characteristic patterns.",
  //       },
  //     },
  //     {
  //       id: "tenun pepelendoan",
  //       nama: { id: "Tenun Pepelendoan", en: "Pepelendoan Weaving" },
  //       harga: 250000,
  //       gambar: ["/images/produk/14/2.jpg"],
  //       deskripsi: {
  //         id: "Tenun Pepelendoan merupakan tenunan tradisional dengan motif dan warna yang khas.",
  //         en: "Pepelendoan Weaving is a traditional textile featuring distinctive patterns and colors.",
  //       },
  //     },
  //     {
  //       id: "tenun gedogan",
  //       nama: { id: "Tenun Gedogan", en: "Gedogan Weaving" },
  //       harga: 250000,
  //       gambar: ["/images/produk/14/3.jpg"],
  //       deskripsi: {
  //         id: "Tenun Gedogan merupakan kain tradisional yang dibuat secara manual menggunakan teknik tenun Gedogan.",
  //         en: "Gedogan Weaving is a traditional textile handcrafted using the traditional Gedogan weaving technique.",
  //       },
  //     },
  //     {
  //       id: "tenun",
  //       nama: { id: "Tenun", en: "Traditional Weaving" },
  //       harga: 400000,
  //       gambar: ["/images/produk/14/4.jpg"],
  //       deskripsi: {
  //         id: "Tenun tradisional yang dibuat secara manual dengan karakter khas tenunan Tenganan.",
  //         en: "Traditional handwoven textile featuring the distinctive character of Tenganan weaving.",
  //       },
  //     },
  //     {
  //       id: "gringsing besar",
  //       nama: { id: "Gringsing Besar", en: "Large Gringsing" },
  //       harga: 6000000,
  //       gambar: ["/images/produk/14/5.jpg"],
  //       deskripsi: {
  //         id: "Gringsing Besar merupakan tenunan tradisional dengan ukuran besar dan proses pengerjaan yang menghasilkan kain bernilai budaya tinggi.",
  //         en: "Large Gringsing is a traditional textile with a larger size and a detailed craftsmanship process, giving it significant cultural value.",
  //       },
  //     },
  //   ],
  // },

  // // keluarga 16
  // {
  //   slug: "endo-shop-ibu-lodri",
  //   namaKeluarga: { id: "Endo Shop Ibu Lodri", en: "Endo Shop Ibu Lodri" },
  //   noWa: "6281239612080",
  //   kategori: [
  //     {
  //       id: "tenun gedogan",
  //       nama: { id: "Tenun Gedogan", en: "Gedogan Weaving" },
  //       harga: 400000,
  //       gambar: ["/images/produk/16/1.jpg"],
  //       deskripsi: {
  //         id: "Tenun Gedogan merupakan kain tradisional yang dibuat secara manual menggunakan teknik tenun Gedogan.",
  //         en: "Gedogan Weaving is a traditional textile handcrafted using the traditional Gedogan weaving technique.",
  //       },
  //     },
  //     {
  //       id: "tenun",
  //       nama: { id: "Tenun", en: "Traditional Weaving" },
  //       harga: 350000,
  //       gambar: ["/images/produk/16/2.jpg"],
  //       deskripsi: {
  //         id: "Tenun tradisional yang dibuat secara manual dengan karakter khas tenunan Tenganan.",
  //         en: "Traditional handwoven textile featuring the distinctive character of Tenganan weaving.",
  //       },
  //     },
  //     {
  //       id: "tenun gringsing single ikat",
  //       nama: { id: "Tenun Gringsing Single Ikat", en: "Gringsing Single Ikat Weaving" },
  //       harga: 500000,
  //       gambar: ["/images/produk/16/3.jpg"],
  //       deskripsi: {
  //         id: "Tenun Gringsing Single Ikat merupakan tenunan tradisional dengan teknik single ikat dan motif khas Gringsing.",
  //         en: "Gringsing Single Ikat Weaving is a traditional textile made using the single ikat technique, featuring distinctive Gringsing patterns.",
  //       },
  //     },
  //   ],
  // },

  // // keluarga 18
  // {
  //   slug: "gebah-art-shop-ibu-sukma",
  //   namaKeluarga: { id: "Gebah Art Shop Ibu Sukma", en: "Gebah Art Shop Ibu Sukma" },
  //   noWa: "6287863199040",
  //   kategori: [
  //     {
  //       id: "tenun single ikat",
  //       nama: { id: "Tenun Single Ikat", en: "Single Ikat Weaving" },
  //       harga: 700000,
  //       gambar: ["/images/produk/18/1.jpg"],
  //       deskripsi: {
  //         id: "Tenun Single Ikat merupakan kain tradisional yang dibuat menggunakan teknik single ikat dengan motif yang khas.",
  //         en: "Single Ikat Weaving is a traditional textile made using the single ikat technique, featuring distinctive patterns.",
  //       },
  //     },
  //     {
  //       id: "tenun plendo",
  //       nama: { id: "Tenun Plendo", en: "Plendo Weaving" },
  //       harga: 250000,
  //       gambar: ["/images/produk/18/2.jpg"],
  //       deskripsi: {
  //         id: "Tenun Plendo merupakan tenunan tradisional dengan karakter warna dan motif yang khas.",
  //         en: "Plendo Weaving is a traditional textile featuring distinctive colors and patterns.",
  //       },
  //     },
  //     {
  //       id: "tenun apbn",
  //       nama: { id: "Tenun APBN", en: "APBN Weaving" },
  //       harga: 350000,
  //       gambar: ["/images/produk/18/3.jpg"],
  //       deskripsi: {
  //         id: "Tenun APBN merupakan tenunan tradisional dengan karakter khas dan dibuat secara manual.",
  //         en: "APBN Weaving is a traditional handwoven textile featuring distinctive craftsmanship.",
  //       },
  //     },
  //     {
  //       id: "tenun tuban",
  //       nama: { id: "Tenun Tuban", en: "Tuban Weaving" },
  //       harga: 300000,
  //       gambar: ["/images/produk/18/4.jpg"],
  //       deskripsi: {
  //         id: "Tenun Tuban merupakan tenunan tradisional dengan karakter motif dan tekstur yang khas.",
  //         en: "Tuban Weaving is a traditional textile featuring distinctive patterns and texture.",
  //       },
  //     },
  //   ],
  // },
];

export function getKeluargaBySlug(slug: string): KeluargaTenun | undefined {
  return keluargaList.find((k) => k.slug === slug);
}

export function getHargaRange(keluarga: KeluargaTenun): string {
  const hargaList = keluarga.kategori.map((k) => k.harga);
  const min = Math.min(...hargaList);
  const max = Math.max(...hargaList);

  const format = (n: number) => `Rp ${n.toLocaleString("id-ID")}`;

  if (min === max) return format(min);
  return `${format(min)} - ${format(max)}`;
}

// Ambil teks sesuai bahasa aktif, fallback ke Indonesia kalau ada yang kosong
export function localize(text: { id: string; en: string }, lang: Language): string {
  return text[lang] || text.id;
}