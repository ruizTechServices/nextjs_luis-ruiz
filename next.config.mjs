/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'relume-assets.s3.amazonaws.com',
      },
    ],
  },
};

export default nextConfig;
