import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        // Dev: Strapi lokal
        protocol: "http",
        hostname: "localhost",
        port: "1337",
        pathname: "/uploads/**",
      },
      {
        // Production: domain publik Strapi
        protocol: "https",
        hostname: "tengananpegringsingan.com",
        pathname: "/uploads/**",
      },
    ],
    dangerouslyAllowLocalIP: true, // hanya relevan saat dev, tidak berpengaruh di production
  },

  // Jangan expose header "X-Powered-By: Next.js" ke publik
  poweredByHeader: false,

  async headers() {
    return [
      {
        source: "/(.*)",
        headers: [
          {
            key: "X-Frame-Options",
            value: "DENY", // cegah website di-embed di iframe orang lain (clickjacking)
          },
          {
            key: "X-Content-Type-Options",
            value: "nosniff", // cegah browser "menebak" tipe file (MIME sniffing)
          },
          {
            key: "Referrer-Policy",
            value: "strict-origin-when-cross-origin",
          },
          {
            key: "Permissions-Policy",
            value: "camera=(), microphone=(), geolocation=()",
          },
          {
            key: "Strict-Transport-Security",
            value: "max-age=63072000; includeSubDomains; preload", // paksa HTTPS
          },
          {
            key: "X-XSS-Protection",
            value: "1; mode=block",
          },
          {
  // Content Security Policy — sesuaikan domain saat production
  key: "Content-Security-Policy",
  value: [
    "default-src 'self'",
    "script-src 'self' 'unsafe-inline' 'unsafe-eval' https://cdn.jsdelivr.net",
    "style-src 'self' 'unsafe-inline' https://cdn.jsdelivr.net",
    "img-src 'self' data: blob: http://localhost:1337 https://tengananpegringsingan.com https://*.googleusercontent.com",
    "connect-src 'self' http://localhost:1337 https://tengananpegringsingan.com",
    "frame-src 'self' https://www.google.com https://tengananvillage-tour.pages.dev", // untuk embed Google Maps dan Virtual Tour
    "font-src 'self' data:",
    "object-src 'none'",
    "base-uri 'self'",
  ].join("; "),
},
        ],
      },
    ];
  },
};

export default nextConfig;