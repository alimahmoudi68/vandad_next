/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ["localhost"],
  },
  experimental: {
    serverActions: {
      bodySizeLimit: '10mb', // می‌تونید بیشتر یا کمتر بذارید
    },
  },
};

export default nextConfig;
