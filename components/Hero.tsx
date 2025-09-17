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

export function Hero() {
  return (
    <section className="relative mx-auto max-w-7xl px-4 pt-10 md:pt-16">
      <div className="grid gap-8 md:grid-cols-2 md:items-center">
        {/* Left: Text */}
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.6 }}
          transition={{ duration: 0.7 }}
          className="space-y-6"
        >
          <h1 className="neon-text text-3xl font-extrabold leading-tight md:text-5xl">
            Web3 × AI Developer
            <span className="block text-base text-white/70 md:text-lg">
              构建去中心化与智能化的下一代产品 Build the next-gen decentralized & intelligent apps
            </span>
          </h1>

          <p className="max-w-prose text-white/80">
            我专注于 Web3 协议、链上应用以及 AI 辅助产品原型设计与实现，注重极致体验与现代视觉语言。 
            Focused on on-chain apps, Web3 protocols, and AI-powered product prototyping with a premium UX and futuristic visuals.
          </p>

          {/* Tech badges */}
          <div className="flex flex-wrap gap-2">
            {["Next.js", "TypeScript", "Tailwind", "Framer Motion", "Web3", "AI"].map(
              (t) => (
                <motion.span
                  key={t}
                  whileHover={{ scale: 1.06 }}
                  className="glass animate-float px-3 py-1 text-xs text-white/90"
                >
                  {t}
                </motion.span>
              )
            )}
          </div>

          {/* CTAs */}
          <div className="flex flex-wrap gap-3 pt-2">
            <motion.a
              href="#projects"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.98 }}
              className="rounded-md bg-neon-cyan/20 px-4 py-2 text-sm font-medium
                         text-white shadow-neonCyan ring-1 ring-white/10 hover:bg-neon-cyan/30"
            >
              查看项目 View Projects
            </motion.a>

            <motion.a
              href="#about"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.98 }}
              className="rounded-md bg-neon-pink/20 px-4 py-2 text-sm font-medium
                         text-white shadow-neonPink ring-1 ring-white/10 hover:bg-neon-pink/30"
            >
              关于我 About Me
            </motion.a>
          </div>
        </motion.div>

        {/* Right: Decorative card */}
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.7, delay: 0.1 }}
          className="relative"
        >
          <div
            className="neon-border glass relative aspect-[4/3] w-full overflow-hidden
                       rounded-xl"
          >
            <div className="pointer-events-none absolute inset-0 bg-radial-faint" />
            <div className="absolute inset-0 grid place-items-center">
              <div className="text-center">
                <div className="mx-auto mb-2 h-16 w-16 rounded-full border border-white/10 bg-white/5" />
                <p className="text-white/75">
                  放置个人标志或头像 Place your avatar or logo here
                </p>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}


