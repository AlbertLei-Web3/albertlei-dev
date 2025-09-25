import type {Metadata, Viewport} from 'next';
import {NextIntlClientProvider} from 'next-intl';
import {getMessages, unstable_setRequestLocale} from 'next-intl/server';
import {notFound} from 'next/navigation';
import '../globals.css';
import LiquidEtherBackground from '@/components/LiquidEtherBackground';

export const metadata: Metadata = {
  title: '雷雨奇 — Web3 & AI Projects | 赛博霓虹作品集',
  description: '雷雨奇的 Web3 与 AI 项目展示。',
  openGraph: {
    title: 'Lei Yuqi — Web3 & AI Projects',
    description: 'Cyberpunk neon portfolio showcasing Web3 and AI projects with video demos.',
    url: 'https://your-domain.com',
    siteName: 'Lei Yuqi Dev',
    type: 'website'
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Lei Yuqi — Web3 & AI Projects',
    description: 'Cyberpunk neon portfolio showcasing Web3 and AI projects with video demos.'
  },
  metadataBase: new URL('https://your-domain.com'),
  icons: {icon: '/favicon.ico'}
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  viewportFit: 'cover'
};

export default async function LocaleLayout({
  children,
  params
}: {
  children: React.ReactNode;
  params: {locale: string};
}) {
  const {locale} = params;
  const supported = ['en', 'zh'];
  if (!supported.includes(locale)) notFound();

  // 中文：设置当前请求的语言环境；English: set the request locale
  unstable_setRequestLocale(locale);
  // 中文：从 next-intl 取回预加载的 messages；English: load preloaded messages
  const messages = await getMessages();

  return (
    <html lang={locale}>
      <body className="page-bg">
        <LiquidEtherBackground />
        <div className="fixed inset-0 pointer-events-none bg-grid z-10" />
        <div className="relative min-h-screen z-20">
          {/* 中文：为客户端组件提供多语言上下文；English: provide i18n context to client components */}
          <NextIntlClientProvider locale={locale} messages={messages}>
            {children}
          </NextIntlClientProvider>
        </div>
      </body>
    </html>
  );
}


