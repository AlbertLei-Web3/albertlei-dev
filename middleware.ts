// next-intl middleware for locale routing
// 中文：为国际化路由提供中间件重写与默认语言处理
// English: Middleware to handle locale routing and default locale redirects

import createMiddleware from 'next-intl/middleware';
import {NextRequest, NextResponse} from 'next/server';
import intlConfig from './next-intl.config'; // 不带扩展名，Node/Edge 均可解析

// 中文：先创建 next-intl 提供的中间件实例，用于处理带语言前缀的页面路由
// English: Create the next-intl middleware instance to handle locale-prefixed page routes
const intlMiddleware = createMiddleware(intlConfig);

// 中文：统一处理“带语言前缀的静态资源请求”，将 /{locale}/xxx.(jpg|png|...) 重写为根目录 /xxx
// English: Normalize locale-prefixed static asset requests; rewrite /{locale}/xxx.(jpg|png|...) to root /xxx
export default function middleware(request: NextRequest) {
  const {pathname} = request.nextUrl;

  // 中文：匹配 /en 或 /zh 前缀下的常见静态资源后缀
  // English: Match common static asset extensions under /en or /zh prefix
  const assetMatch = pathname.match(
    /^\/(en|zh)\/(.*\.(?:png|jpe?g|gif|svg|webp|ico|txt|json|woff2?|ttf|otf|mp4|webm|ogg|mp3))$/i
  );

  if (assetMatch) {
    const url = request.nextUrl.clone();
    // 中文：去掉语言前缀，改写到 public 根下的同名文件
    // English: Drop locale prefix and rewrite to the same filename under public root
    url.pathname = `/${assetMatch[2]}`;
    return NextResponse.rewrite(url);
  }

  // 中文：其余情况交给 next-intl 中间件处理（包括 /en 与 /zh 页面路由）
  // English: Delegate remaining requests to next-intl middleware
  return intlMiddleware(request);
}

export const config = {
  // 中文：仅匹配站点根与 /{locale}/ 下的所有路径（含静态资源），避免处理 /_next
  // English: Match only site root and all paths under /{locale}/ (including assets); ignore /_next
  matcher: ['/', '/(en|zh)/:path*']
};


