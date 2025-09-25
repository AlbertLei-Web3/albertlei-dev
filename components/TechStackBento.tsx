"use client";

import React, { useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import type { Project } from "./ProjectCard";

/**
 * 中文（初学者友好）：
 * TechStackBento 使用“便当格（Bento）”布局，将从 projects.tags 聚合出的
 * Top 技术项以卡片形式展示。每张卡片内含一个小进度条，整体风格与站点霓虹视觉统一。
 * 
 * English (Beginner-friendly):
 * TechStackBento renders a Bento-style grid of top tech items aggregated from
 * projects.tags. Each card shows a small progress bar in a neon theme.
 */
export default function TechStackBento({
  projects,
  maxItems = 12,
  title = "Skills",
  roleSkills,
  rolePalette,
}: {
  projects: Project[];
  maxItems?: number;
  title?: string;
  /**
   * 中文：角色→技能清单，用于颜色与归类（如果提供，则优先使用）。
   * English: Role→skills mapping to color-code and group bars (if provided).
   */
  roleSkills?: Record<string, string[]>;
  /**
   * 中文：角色→颜色名（Tailwind 语义色），例如 { 'Web3 × AI': 'emerald' }
   * English: Role→tailwind hue name for coloring bars.
   */
  rolePalette?: Record<string, string>;
}) {
  // 归一化别名，合并同义标签
  const aliasMap: Record<string, string> = useMemo(
    () => ({
      "typescript": "TypeScript",
      "ts": "TypeScript",
      "next": "Next.js",
      "next.js": "Next.js",
      "react": "React",
      "tailwind": "Tailwind CSS",
      "tailwindcss": "Tailwind CSS",
      "erc4337": "ERC-4337",
      "erc-4337": "ERC-4337",
      "viem": "Viem",
      "wagmi": "Wagmi",
      "solidity": "Solidity",
      "hardhat": "Hardhat",
      "postgres": "PostgreSQL",
      "postgresql": "PostgreSQL",
      "okx dex sdk": "OKX DEX SDK",
      "aa(erc-4337)": "ERC-4337",
      "ethers": "Ethers.js",
      "ethers.js": "Ethers.js",
    }),
    []
  );

  const { items, maxCount } = useMemo(() => {
    const map = new Map<string, number>();
    for (const p of projects) {
      const list = (p.tags || []).map((t) => String(t).trim());
      for (const raw of list) {
        const k = raw.toLowerCase();
        const normalized = aliasMap[k] || raw.replace(/\s+/g, " ").trim();
        map.set(normalized, (map.get(normalized) || 0) + 1);
      }
    }
    // 如果传入 roleSkills，则把其中的技能也加入集合（频次为空视为 1 次，只用于展示，不代表熟练度）。
    if (roleSkills) {
      for (const role of Object.keys(roleSkills)) {
        for (const raw of roleSkills[role] || []) {
          const k = String(raw).trim();
          if (!k) continue;
          if (!map.has(k)) map.set(k, 1);
        }
      }
    }
    const arr = Array.from(map.entries()).sort((a, b) => b[1] - a[1]);
    const limited = maxItems > 0 ? arr.slice(0, maxItems) : arr;
    const max = limited.length ? limited[0][1] : 1;
    return { items: limited, maxCount: max };
  }, [projects, aliasMap, maxItems, roleSkills]);

  // 角色配色（与 Hero 徽章对应）
  const palette = useMemo(() => ({
    "Web3 × AI": "emerald",
    "Founder": "rose",
    "Full-Stack Developer": "amber",
    "Project Manager": "indigo",
    ...(rolePalette || {}),
  }), [rolePalette]);

  // 颜色映射（固定十六进制，避免动态类名在构建期被裁剪而失效）
  const hueColorMap: Record<string, string> = useMemo(() => ({
    emerald: "#10B981",
    rose: "#F43F5E",
    amber: "#F59E0B",
    indigo: "#6366F1",
  }), []);

  const hexToRgba = (hex: string, alpha: number): string => {
    const h = hex.replace('#','');
    const r = parseInt(h.substring(0,2),16);
    const g = parseInt(h.substring(2,4),16);
    const b = parseInt(h.substring(4,6),16);
    return `rgba(${r}, ${g}, ${b}, ${alpha})`;
  };

  // 技能归属的角色
  const resolveRole = (skill: string): string | undefined => {
    if (!roleSkills) return "Full-Stack Developer"; // 默认归入 Full-Stack Developer
    const key = skill.toLowerCase();
    for (const role of Object.keys(roleSkills)) {
      const list = roleSkills[role] || [];
      if (list.some((s) => String(s).toLowerCase() === key)) return role;
    }
    // 未命中映射时，默认归入 Full-Stack Developer
    return "Full-Stack Developer";
  };

  if (items.length === 0) {
    return <div className="text-sm text-white/60">No tech tags found.</div>;
  }

  // 便当格布局：小屏单列；中屏 6 列；大屏 12 列
  // Skills 置于中心（md: col-start-2 span-4 row-span-2；xl: col-start-5 span-4 row-span-2）
  const mdSlots = [
    "md:col-start-1 md:row-start-1",
    "md:col-start-3 md:row-start-1",
    "md:col-start-5 md:row-start-1",
    "md:col-start-1 md:row-start-2",
    "md:col-start-5 md:row-start-2",
    "md:col-start-1 md:row-start-4",
    "md:col-start-3 md:row-start-4",
    "md:col-start-5 md:row-start-4",
    "md:col-start-2 md:row-start-5",
    "md:col-start-4 md:row-start-5",
  ];
  const xlSlots = [
    // 第一行（左半）
    "xl:col-start-1 xl:row-start-1",
    "xl:col-start-3 xl:row-start-1",
    "xl:col-start-5 xl:row-start-1",
    // 第一行（右半）
    "xl:col-start-9 xl:row-start-1",
    "xl:col-start-11 xl:row-start-1",
    // 中心卡下方两侧
    "xl:col-start-1 xl:row-start-3",
    "xl:col-start-11 xl:row-start-3",
    // 更下方一行
    "xl:col-start-1 xl:row-start-5",
    "xl:col-start-3 xl:row-start-5",
    "xl:col-start-11 xl:row-start-5",
  ];

  // 交互：中心芯片与环绕标签
  const [activeRole, setActiveRole] = useState<string | null>(null);

  // 计算角色→技能的字典（优先使用传入的 roleSkills，否则根据 tags 推断）
  const roleToSkills: Record<string, string[]> = useMemo(() => {
    if (roleSkills) return roleSkills;
    const dict: Record<string, string[]> = {};
    for (const [name] of items) {
      const r = resolveRole(name) || "Full-Stack Developer";
      (dict[r] ||= []).push(name);
    }
    return dict;
  }, [roleSkills, items]);

  const rolesOrder = ["Web3 × AI", "Founder", "Full-Stack Developer", "Project Manager"]; 
  const roleCounts: Record<string, number> = useMemo(() => {
    const res: Record<string, number> = {};
    for (const r of rolesOrder) res[r] = (roleToSkills[r] || []).length;
    return res;
  }, [roleToSkills]);

  // 颜色工具
  const chipStyle = (role: string) => {
    const hue = palette[role] || "amber";
    const bg = hexToRgba(hueColorMap[hue] || "#22E1FF", 0.15);
    const ring = hexToRgba(hueColorMap[hue] || "#22E1FF", 0.35);
    const text = hexToRgba(hueColorMap[hue] || "#22E1FF", 0.95);
    return { backgroundColor: bg, boxShadow: `0 0 16px ${ring}`, color: text, borderColor: ring } as React.CSSProperties;
  };

  // Tabs × Bento：上方角色 Tabs，下方技能 Chip 网格
  const [tabRole, setTabRole] = useState<string>(rolesOrder[0]);

  const displaySkills = useMemo(() => {
    return (roleToSkills[tabRole] || []).slice();
  }, [roleToSkills, tabRole]);

  return (
    <div className="space-y-4">
      {/* Tabs - 横向可滚动，显示计数 */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
        {rolesOrder.map((r) => (
          <button
            key={r}
            onClick={() => setTabRole(r)}
            className={`whitespace-nowrap rounded-full border px-3 py-1 text-xs font-semibold transition-colors ${tabRole === r ? 'ring-1 ring-white/30 scale-[1.02]' : 'opacity-90 hover:opacity-100'}`}
            style={chipStyle(r)}
            aria-pressed={tabRole === r}
          >
            {r}
            <span className="ml-1 inline-block rounded-full bg-white/10 px-1.5 py-0.5 text-[10px] align-middle">
              {roleCounts[r] ?? 0}
            </span>
          </button>
        ))}
      </div>

      {/* Bento Chips with animation */}
      <AnimatePresence mode="popLayout">
        <motion.div
          key={tabRole}
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -8 }}
          transition={{ duration: 0.18 }}
          className="grid grid-cols-2 gap-2 md:grid-cols-3 xl:grid-cols-4"
          aria-live="polite"
        >
          {displaySkills.map((skill) => (
            <motion.span
              key={skill}
              layout
              className="truncate rounded-xl border px-3 py-2 text-[12px] font-medium"
              style={chipStyle(tabRole)}
              title={skill}
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.15 }}
            >
              {skill}
            </motion.span>
          ))}
          {displaySkills.length === 0 && (
            <div className="col-span-full text-sm text-white/60">No skills found for this role.</div>
          )}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}


