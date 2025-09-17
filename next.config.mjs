// next.config.mjs
/**
 * 中文：
 * - Next.js 配置：启用严格模式与 typedRoutes 实验功能
 * 
 * English:
 * - Next.js config: enable React strict mode and typedRoutes experiment
 */
/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  experimental: {
    typedRoutes: true,
  },
};

export default nextConfig;


