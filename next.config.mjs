/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: [
      "localhost",
      "minio-vandad.chbk.app",
    ],
  },
  experimental: {
    serverActions: {
      bodySizeLimit: '10mb', // می‌تونید بیشتر یا کمتر بذارید
    },
  },
};

export default nextConfig;
