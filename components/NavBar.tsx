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
      <div className="mx-auto max-w-7xl px-4 py-4 flex justify-center">
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
      </motion.div>
    </div>
  );
}


