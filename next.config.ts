import type { NextConfig } from "next";

const nextConfig: NextConfig = {
output: 'export',           
  basePath: '/word-puzzle-game',
  assetPrefix: '/word-puzzle-game/',
  trailingSlash: true,
  unoptimized: true,
};

export default nextConfig;
