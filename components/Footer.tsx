"use client";

/**
 * 中文：
 * - 页面底部：联系方式 + 社交链接（预留替换真实链接）
 * - 进入动画与轻微悬停效果
 * 
 * English:
 * - Footer: contact info + social links (placeholders to replace with real)
 * - Entrance animation with light hover effects
 */
import { motion } from "framer-motion";

export function Footer() {
  return (
    <motion.footer
      id="contact"
      initial={{ opacity: 0, y: 10 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.5 }}
      className="mx-auto mt-16 max-w-7xl px-4 pb-12"
    >
      <div className="glass flex flex-col items-center gap-3 px-6 py-6 text-center">
        <h4 className="neon-text text-lg font-semibold">Contact</h4>
        <p className="text-white/80">
          邮箱 Email: <a className="underline decoration-neon-cyan/60" href="mailto:you@domain.com">you@domain.com</a>
        </p>
        <div className="flex flex-wrap items-center justify-center gap-3 text-sm">
          {[
            { href: "#", label: "GitHub" },
            { href: "#", label: "Twitter/X" },
            { href: "#", label: "LinkedIn" },
          ].map((s) => (
            <motion.a
              key={s.label}
              href={s.href}
              whileHover={{ scale: 1.06 }}
              className="rounded-md px-3 py-1 text-white/85 hover:bg-white/5"
            >
              {s.label}
            </motion.a>
          ))}
        </div>
      </div>
      <p className="mt-6 text-center text-xs text-white/50">
        © {new Date().getFullYear()} Albert Lei. All rights reserved.
      </p>
    </motion.footer>
  );
}


