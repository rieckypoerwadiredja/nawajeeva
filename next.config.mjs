/** @type {import('next').NextConfig} */
const nextConfig = {
  reactCompiler: true,

  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "hdrzhqscuxbsxxsleitz.supabase.co",
      },
    ],
  },
};

export default nextConfig;
