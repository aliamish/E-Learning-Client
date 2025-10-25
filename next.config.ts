import type { NextConfig } from "next";

const nextConfig: NextConfig = {
      images: {
           domains: ['res.cloudinary.com', 'randomuser.me']
      },
      // Don't fail production builds on ESLint errors. Fix linting issues separately.
      eslint: {
        ignoreDuringBuilds: true,
      },
      // Skip TypeScript type checking during production builds. Fix types separately.
      typescript: {
        ignoreBuildErrors: true,
      },
};

export default nextConfig;
