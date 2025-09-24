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
          <h1 className="neon-text text-3xl font-extrabold leading-tight md:text-5xl">
            Web3 × AI Developer
            <span className="block text-base text-white/70 md:text-lg">
              Build the next-gen decentralized & intelligent apps
            </span>
          </h1>

          <p className="max-w-prose text-white/80">
            Focused on on-chain apps, Web3 protocols, and AI-powered product prototyping with a premium UX and futuristic visuals.
          </p>

          {/* Tech badges */}
          <div className="flex flex-wrap gap-2">
            {["Next.js", "TypeScript", "Tailwind", "Framer Motion", "Web3", "AI"].map(
              (t) => (
                <span
                  key={t}
                  className="glass animate-float px-3 py-1 text-xs text-white/90
                             transition-transform hover:scale-105"
                >
                  {t}
                </span>
              )
            )}
          </div>

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


