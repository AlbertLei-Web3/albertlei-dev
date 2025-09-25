"use client";

/**
 * 中文：
 * - Hero 区：标题 + 简介 + 技术栈 Badge + CTA
 * - 动画：进入时淡入上浮；按钮悬停放大；徽章轻微漂浮动画
 * - 按钮处同样可替换为第三方 UI 组件
 * 
 * English:
 * - Hero section: heading + intro + tech badges + CTA
 * - Animations: fade-up on mount; hover scale for buttons; subtle float for badges
 * - Buttons can be replaced with MagicUI/Aceternity/cult/ui components
 */
import { motion } from "framer-motion";
import ProfileCard from "./ProfileCard";
import React from "react";
import {useTranslations, useLocale} from 'next-intl';

export function Hero() {
  // 中文：Hero 文案国际化；English: i18n for Hero texts
  const t = useTranslations('hero');
  // 中文：根据语言决定标题是否单行；English: make zh single-line, keep en two lines
  const locale = useLocale();
  return (
    <section className="relative mx-auto max-w-7xl px-4 pt-10 md:pt-16">
      
      <div className="grid gap-8 md:grid-cols-2 md:items-center relative z-20">
        {/* Left: Text */}
        <div className="space-y-6">
          {/**
           * 中文：双行主标题，移除 <br/>，使用渐变文字增强层级与可读性
           * English: Two-line heading without <br/>, gradient text for visual hierarchy
           */}
          {/**
           * 中文：提高主标题行高，避免两行文字的发光边界相互覆盖；同时略微收紧字间距。
           * English: Increase heading line-height to prevent glow overlap; add tighter tracking.
           */}
          {/**
           * 中文：
           * - 提高整体行高，避免字母 y/g 的下延笔画与下一行产生遮挡；
           * - 设置 overflow-visible 确保文字发光不被裁剪；
           * - 适当增大两行之间的外边距（mb-*），进一步拉开视觉间距。
           * English:
           * - Increase line-height so descenders (y/g) do not collide with next line;
           * - Use overflow-visible to prevent glow clipping;
           * - Add larger bottom margin between lines for comfortable spacing.
           */}
          <h1 className="neon-text text-3xl font-extrabold tracking-tight leading-[1.32] md:text-5xl md:leading-[1.22] overflow-visible">
            {locale === 'zh' ? (
              // 中文：在中文环境，将两段标题合并为单行，避免换行；
              // English: For zh, merge both parts into a single line.
              <span className="block bg-gradient-to-r from-white via-white to-neon-cyan/80 bg-clip-text text-transparent">
                {t('h1a')}{t('h1b')}
              </span>
            ) : (
              // 英文保持两行；English: keep two lines for English
              <>
                <span className="block bg-gradient-to-r from-white via-white to-neon-cyan/80 bg-clip-text text-transparent mb-2 md:mb-3">
                  {t('h1a')}
                </span>
                <span className="block bg-gradient-to-r from-neon-cyan/90 via-white to-white bg-clip-text text-transparent">
                  {t('h1b')}
                </span>
              </>
            )}
          </h1>

          {/**
           * 中文：角色徽章（更紧凑且易读，替代冗长的职位串）
           * English: Role badges (compact alternative to long inline role string)
           */}
          <div className="flex flex-wrap gap-2">
            {/**
             * 中文：为不同角色配色，便于一眼区分；颜色与语义匹配。
             * English: Color-code role badges for quick visual parsing; colors match semantics.
             */}
            <span className="glass px-3 py-1 text-sm font-medium text-emerald-300 bg-emerald-500/10 ring-1 ring-emerald-400/25">
              {t('roles.web3ai')}
            </span>
            <span className="glass px-3 py-1 text-sm font-medium text-rose-300 bg-rose-500/10 ring-1 ring-rose-400/25">
              {t('roles.founder')}
            </span>
            <span className="glass px-3 py-1 text-sm font-medium text-amber-300 bg-amber-500/10 ring-1 ring-amber-400/25">
              {t('roles.fullstack')}
            </span>
            <span className="glass px-3 py-1 text-sm font-medium text-indigo-300 bg-indigo-500/10 ring-1 ring-indigo-400/25">
              {t('roles.pm')}
            </span>
          </div>

          {/**
           * 中文：一句话标语，独立成行，避免与标题混排导致视觉拥挤
           * English: One-line tagline separated from heading for cleaner layout
           */}
          <p className="text-base text-white/70 md:text-lg">{t('tagline')}</p>

          {/**
           * 中文：两句式简介，控制行宽（max-w-prose）提升阅读体验
           * English: Two-sentence intro with controlled measure (max-w-prose) for readability
           */}
          <p className="max-w-prose text-white/80">{t('intro')}</p>

	      {/**
	       * 中文：根据你的要求已删除“技能标签（Tech badges）”区块。
	       * English: Removed the "Tech badges" block per your request.
	       */}

          {/* CTAs */}
          <div className="flex flex-wrap gap-7 pt-2">
            <a
              href="#projects"
              className="rounded-md bg-neon-cyan/20 px-4 py-2 text-sm font-medium
                         text-white shadow-neonCyan ring-1 ring-white/10 hover:bg-neon-cyan/30
                         transition-transform hover:scale-105 active:scale-98"
              data-animate="breath-hero"
            >
              {t('viewProjects')}
            </a>

            <a
              href="#contact"
              onClick={(e) => {
                e.preventDefault();
                const el = document.getElementById('contact');
                if (el) {
                  el.scrollIntoView({ behavior: 'smooth', block: 'start' });
                } else {
                  location.hash = '#contact';
                }
                if ((window as any).__highlightContactCard) {
                  setTimeout(() => (window as any).__highlightContactCard(), 350);
                }
              }}
              className="rounded-md bg-neon-pink/20 px-4 py-2 text-sm font-medium
                         text-white shadow-neonPink ring-1 ring-white/10 hover:bg-neon-pink/30
                         transition-transform hover:scale-105 active:scale-98"
              data-animate="breath-hero"
            >
              {t('contact')}
            </a>
          </div>
        </div>

        {/* Right: Profile Card（横屏手机隐藏，避免遮挡内容） */}
        <div className="relative [@media(orientation:landscape)_and_(max-width:900px)]:hidden">
          <ProfileCard
            avatarUrl="/avatar.jpg"
            name={t('name')}
            title={t('title')}
            handle={t('handle')}
            status={t('status')}
            contactText={t('contact')}
            showUserInfo={true}
            enableTilt={true}
            enableMobileTilt={true}
            mobileTiltSensitivity={1.5}
            className="w-full max-w-sm mx-auto"
            onContactClick={() => {
              const el = document.getElementById('contact');
              if (el) {
                el.scrollIntoView({ behavior: 'smooth', block: 'start' });
              } else {
                location.hash = '#contact';
              }
              if ((window as any).__highlightContactCard) {
                setTimeout(() => (window as any).__highlightContactCard(), 350);
              }
            }}
          />
        </div>
      </div>
    </section>
  );
}


