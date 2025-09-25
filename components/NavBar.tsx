"use client";

/**
 * 中文：
 * - 顶部导航：使用 PillNav 组件，支持酷炫的胶囊式导航
 * - 使用 Framer Motion 添加轻微进入动画
 * - 集成 ReactBits 的个性化导航组件
 * 
 * English:
 * - Top navbar: Using PillNav component with cool pill-style navigation
 * - Framer Motion for subtle entrance animations
 * - Integrated ReactBits personalized navigation component
 */
import { motion } from "framer-motion";
import PillNav from "./PillNav";
import {useTranslations, useLocale} from 'next-intl';
import LocaleToggle from './LocaleToggle';

export function NavBar() {
  // 中文：读取当前语言与文案；English: read current locale and translations
  const t = useTranslations('nav');
  const tHero = useTranslations('hero');
  const locale = useLocale();
  const base = `/${locale}`; // 语言前缀 locale prefix

  return (
    // 中文：使用 sticky + top-7 固定导航相对视口顶部 1.75rem，滚动时位置稳定
    // English: Use sticky + top-7 to keep the navbar offset 1.75rem from viewport top, stable on scroll
    <div className="sticky top-7 z-40">
      <motion.div
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6 }}
      >
        {/* Desktop / Tablet: 原有胶囊导航（去掉 mt-7，offset 改由 sticky top-7 提供） */}
        <div className="hidden sm:flex relative items-center mx-auto max-w-7xl px-4 py-4 justify-center">
          <PillNav
            logo="/logo.svg" // SVG logo with neon styling
            logoAlt={tHero('name')}
            items={[
              { href: `${base}`, label: t('home') },
              { href: `${base}#about`, label: t('about') },
              { href: `${base}#projects`, label: t('projects') },
              { href: `${base}#contact`, label: t('contact') },
            ]}
            baseColor="#0a0f1f" // 深色背景
            pillColor="rgba(34, 225, 255, 0.1)" // 半透明霓虹青色背景
            hoveredPillTextColor="#22E1FF" // 悬停时霓虹青色文字
            pillTextColor="#22E1FF" // 正常时霓虹青色文字
          />
          {/* 中文：让语言切换按钮与导航条平行对齐（同一水平线，靠右） */}
          {/* English: Align locale toggle on the same baseline as nav, anchored to the right. */}
          <div className="absolute right-4 top-1/2 -translate-y-1/2">
            <LocaleToggle />
          </div>
        </div>

        {/* Mobile: 简洁底部导航条（固定底部） */}
        <div className="sm:hidden">
          <nav className="fixed inset-x-0 bottom-3 z-40 mx-auto w-[92%] rounded-2xl border border-white/10 bg-black/30 backdrop-blur-md px-3 py-2 shadow-[0_0_18px_rgba(34,225,255,0.25)]">
            <ul className="grid grid-cols-4 text-[12px] font-semibold text-white/90">
              {[
                { href: `${base}`, label: t('home_m') },
                { href: `${base}#about`, label: t('about_m') },
                { href: `${base}#projects`, label: t('projects_m') },
                { href: `${base}#contact`, label: t('contact_m') },
              ].map((i) => (
                <li key={i.label} className="flex items-center justify-center">
                  <a
                    href={i.href}
                    className="inline-flex items-center justify-center rounded-lg px-2 py-1.5 hover:bg-white/10 active:scale-95 transition"
                    onClick={(e) => {
                      if (i.href.includes('#')) {
                        e.preventDefault();
                        const id = i.href.split('#')[1];
                        const el = document.getElementById(id);
                        if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
                else location.assign(i.href);
                // 中文：滚动后主动触发“联系卡片”高亮；English: trigger highlight after scroll
                if (id === 'contact' && (window as any).__highlightContactCard) {
                  setTimeout(() => (window as any).__highlightContactCard(), 350);
                }
                      }
                    }}
                  >
                    {i.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
        </div>

        {/* 移除了顶部独立定位的语言切换器，改为与导航平行布局 */}
      </motion.div>
    </div>
  );
}


