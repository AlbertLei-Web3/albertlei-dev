/**
 * 中文：
 * - Next.js App Router 布局，包含基础 SEO（title/description/OG/Twitter）
 * - 包裹全站背景与网格装饰
 * 
 * English:
 * - Next.js App Router layout with base SEO (title/description/OG/Twitter)
 * - Provides global neon background and subtle grid overlay
 */
import type { Metadata, Viewport } from "next";
import "./globals.css";
import LiquidEtherBackground from "@/components/LiquidEtherBackground";

export const metadata: Metadata = {
  title: "Albert Lei — Web3 & AI Projects | 赛博霓虹作品集",
  description:
    "Showcase of Web3 and AI projects by Albert Lei. 赛博朋克霓虹风个人主页，展示区含视频 Demo、项目标题与简述。",
  openGraph: {
    title: "Albert Lei — Web3 & AI Projects",
    description:
      "Cyberpunk neon portfolio showcasing Web3 and AI projects with video demos.",
    url: "https://your-domain.com",
    siteName: "Albert Lei Dev",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Albert Lei — Web3 & AI Projects",
    description:
      "Cyberpunk neon portfolio showcasing Web3 and AI projects with video demos.",
  },
  metadataBase: new URL("https://your-domain.com"),
  icons: { icon: "/favicon.ico" },
};

// 中文：声明移动端 viewport，启用全面屏安全区；English: declare mobile viewport with safe-area support
export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  viewportFit: "cover",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="zh-CN">
      <body className="page-bg">
        {/* 液体效果背景 Liquid Ether Background */}
        <LiquidEtherBackground />
        
        {/* 装饰性网格层 Decorative grid layer */}
        <div className="fixed inset-0 pointer-events-none bg-grid z-10" />
        
        {/* 主要内容 Main content */}
        <div className="relative min-h-screen z-20">{children}</div>
      </body>
    </html>
  );
}


