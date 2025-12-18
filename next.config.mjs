/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  transpilePackages: ["mui-tel-input"],
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "api.dynopay.com",
      },
    ],
  },
};

export default nextConfig;
