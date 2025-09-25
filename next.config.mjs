import createNextIntlPlugin from 'next-intl/plugin';
// 使用 next-intl 的请求级配置文件 i18n.ts
// Chinese: 指向 i18n.ts（getRequestConfig），否则会出现 Invalid i18n request configuration 错误
const withNextIntl = createNextIntlPlugin('./i18n.ts');

const nextConfig = {
  reactStrictMode: true,
  experimental: {
    typedRoutes: true
  }
};

export default withNextIntl(nextConfig);
