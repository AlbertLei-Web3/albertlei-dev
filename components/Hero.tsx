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

export function Hero() {
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
            <span className="block bg-gradient-to-r from-white via-white to-neon-cyan/80 bg-clip-text text-transparent mb-2 md:mb-3">
              Always Evolving,
            </span>
            <span className="block bg-gradient-to-r from-neon-cyan/90 via-white to-white bg-clip-text text-transparent">
              Never Defined
            </span>
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
              Web3 × AI
            </span>
            <span className="glass px-3 py-1 text-sm font-medium text-rose-300 bg-rose-500/10 ring-1 ring-rose-400/25">
              Founder
            </span>
            <span className="glass px-3 py-1 text-sm font-medium text-amber-300 bg-amber-500/10 ring-1 ring-amber-400/25">
              Full-Stack Developer
            </span>
            <span className="glass px-3 py-1 text-sm font-medium text-indigo-300 bg-indigo-500/10 ring-1 ring-indigo-400/25">
              Project Manager
            </span>
          </div>

          {/**
           * 中文：一句话标语，独立成行，避免与标题混排导致视觉拥挤
           * English: One-line tagline separated from heading for cleaner layout
           */}
          <p className="text-base text-white/70 md:text-lg">
            Build the next‑gen decentralized & intelligent apps
          </p>

          {/**
           * 中文：两句式简介，控制行宽（max-w-prose）提升阅读体验
           * English: Two-sentence intro with controlled measure (max-w-prose) for readability
           */}
          <p className="max-w-prose text-white/80">
            Focused on on-chain apps, Web3 protocols, and AI‑powered product prototyping with premium UX and futuristic visuals.
            Relentlessly exploring how frontier technology can serve real‑world human experiences.
          </p>

	      {/**
	       * 中文：根据你的要求已删除“技能标签（Tech badges）”区块。
	       * English: Removed the "Tech badges" block per your request.
	       */}

          {/* CTAs */}
          <div className="flex flex-wrap gap-3 pt-2">
            <a
              href="#projects"
              className="rounded-md bg-neon-cyan/20 px-4 py-2 text-sm font-medium
                         text-white shadow-neonCyan ring-1 ring-white/10 hover:bg-neon-cyan/30
                         transition-transform hover:scale-105 active:scale-98"
            >
              View Projects
            </a>

            <a
              href="#about"
              className="rounded-md bg-neon-pink/20 px-4 py-2 text-sm font-medium
                         text-white shadow-neonPink ring-1 ring-white/10 hover:bg-neon-pink/30
                         transition-transform hover:scale-105 active:scale-98"
            >
              About Me
            </a>
          </div>
        </div>

        {/* Right: Profile Card */}
        <div className="relative">
          <ProfileCard
            avatarUrl="/avatar.jpg"
            name="Albert Lei"
            title="Web3 × AI Developer"
            handle="Albert_Lei"
            status="Online"
            contactText="Get in Touch"
            showUserInfo={true}
            enableTilt={true}
            enableMobileTilt={true}
            mobileTiltSensitivity={1.5}
            className="w-full max-w-sm mx-auto"
          />
        </div>
      </div>
    </section>
  );
}


