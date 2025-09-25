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

export function NavBar() {
  return (
    <div className="sticky top-0 z-40">
      <motion.div
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6 }}
      >
        {/* Desktop / Tablet: 原有胶囊导航 */}
        <div className="hidden sm:flex mx-auto max-w-7xl px-4 py-4 justify-center">
          <PillNav
            logo="/logo.svg" // SVG logo with neon styling
            logoAlt="Albert Lei"
            items={[
              { href: "/", label: "HOME" },
              { href: "#about", label: "ABOUT" },
              { href: "#projects", label: "PROJECTS" },
              { href: "#contact", label: "CONTACT" },
            ]}
            baseColor="#0a0f1f" // 深色背景
            pillColor="rgba(34, 225, 255, 0.1)" // 半透明霓虹青色背景
            hoveredPillTextColor="#22E1FF" // 悬停时霓虹青色文字
            pillTextColor="#22E1FF" // 正常时霓虹青色文字
          />
        </div>

        {/* Mobile: 简洁底部导航条（固定底部） */}
        <div className="sm:hidden">
          <nav className="fixed inset-x-0 bottom-3 z-40 mx-auto w-[92%] rounded-2xl border border-white/10 bg-black/30 backdrop-blur-md px-3 py-2 shadow-[0_0_18px_rgba(34,225,255,0.25)]">
            <ul className="grid grid-cols-4 text-[12px] font-semibold text-white/90">
              {[
                { href: "/", label: "Home" },
                { href: "#about", label: "About" },
                { href: "#projects", label: "Work" },
                { href: "#contact", label: "Contact" },
              ].map((i) => (
                <li key={i.label} className="flex items-center justify-center">
                  <a
                    href={i.href}
                    className="inline-flex items-center justify-center rounded-lg px-2 py-1.5 hover:bg-white/10 active:scale-95 transition"
                    onClick={(e) => {
                      if (i.href.startsWith('#')) {
                        e.preventDefault();
                        const el = document.getElementById(i.href.slice(1));
                        if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
                        else location.hash = i.href;
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
      </motion.div>
    </div>
  );
}


