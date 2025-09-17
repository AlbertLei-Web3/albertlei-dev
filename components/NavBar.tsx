"use client";

/**
 * 中文：
 * - 顶部导航：Logo + 内页锚点（About / Projects / Contact）
 * - 使用 Framer Motion 添加轻微进入和悬停动画
 * - 按钮留有第三方 UI 库替换点（MagicUI/Aceternity/cult/ui）
 * 
 * English:
 * - Top navbar: Logo + anchors (About / Projects / Contact)
 * - Framer Motion for subtle entrance and hover animations
 * - Clear swap point to replace with MagicUI/Aceternity/cult/ui components
 */
import Link from "next/link";
import { motion } from "framer-motion";

export function NavBar() {
  return (
    <motion.header
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6 }}
      className="sticky top-0 z-40"
    >
      <div className="mx-auto max-w-7xl px-4 py-4">
        <div className="glass flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="px-4 py-3">
            <span className="text-xl font-bold neon-text tracking-wide">
              Albert<span className="text-neon-pink">/</span>Lei
            </span>
          </Link>

          {/* Nav Links */}
          <nav className="flex items-center gap-1 pr-2">
            {[
              { href: "#about", label: "About" },
              { href: "#projects", label: "Projects" },
              { href: "#contact", label: "Contact" },
            ].map((item) => (
              <motion.a
                key={item.href}
                href={item.href}
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.98 }}
                className="rounded-md px-3 py-2 text-sm text-white/90 hover:text-white hover:bg-white/5"
              >
                {item.label}
              </motion.a>
            ))}

            {/* CTA Button（可替换为第三方库按钮） */}
            <motion.a
              href="#contact"
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.98 }}
              className="ml-2 rounded-md bg-neon-purple/20 px-3 py-2 text-sm 
                         text-white shadow-neonPurple ring-1 ring-white/10 hover:bg-neon-purple/30"
            >
              Get in Touch
            </motion.a>
          </nav>
        </div>
      </div>
    </motion.header>
  );
}


