"use client";

import React, { useMemo } from "react";
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
    if (!roleSkills) return undefined;
    const key = skill.toLowerCase();
    for (const role of Object.keys(roleSkills)) {
      const list = roleSkills[role] || [];
      if (list.some((s) => String(s).toLowerCase() === key)) return role;
    }
    return undefined;
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

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 auto-rows-fr gap-4 md:grid-cols-6 xl:grid-cols-12">
        {/* 中央品牌卡 */}
        <div className="glass relative flex items-center justify-between rounded-2xl bg-white/5 p-6 text-center ring-1 ring-white/10 md:col-span-4 md:col-start-2 md:row-start-2 md:row-span-2 xl:col-span-6 xl:col-start-4 xl:row-start-2 xl:row-span-2">
          <div className="select-none mx-auto">
            <div className="mx-auto mb-2 h-10 w-10 rounded-lg bg-neon-cyan/20 ring-1 ring-neon-cyan/40 shadow-neonCyan" />
            <div className="text-2xl font-extrabold tracking-wide text-white/90">{title}</div>
            <div className="mt-1 text-xs text-white/60">Auto-aggregated from projects</div>
          </div>
          {/* 角色色块图例（右上角横向排列） */}
          <div className="absolute right-3 top-3 flex items-center gap-2">
            {Object.entries(palette).map(([role, hue]) => (
              <div key={role} className="flex items-center gap-1">
                <span className={`inline-block h-2.5 w-3 rounded-sm`} style={{ backgroundColor: hueColorMap[hue] || "#22E1FF" }} aria-hidden />
                <span className="text-[10px] text-white/70 whitespace-nowrap">{role}</span>
              </div>
            ))}
          </div>
        </div>

        {/* 环绕卡片（缩小尺寸：p-3、text-xs、进度条 h-1.5；xl 变为 col-span-2） */}
        {items.map(([name, count], idx) => {
          const pct = Math.round((count / maxCount) * 100);
          const mdClass = mdSlots[idx] || "";
          const xlClass = xlSlots[idx] || "";
          return (
            <div
              key={name}
              className={`glass rounded-2xl bg-white/5 p-3 ring-1 ring-white/10 md:col-span-2 xl:col-span-2 ${mdClass} ${xlClass}`}
            >
              <div className="mb-1.5 text-xs font-medium text-white/85">{name}</div>
              <div className="h-1.5 w-full overflow-hidden rounded-full bg-white/10 ring-1 ring-white/10">
                <div
                  className="h-full"
                  style={{
                    width: `${Math.max(8, pct)}%`,
                    background: (() => {
                      const role = resolveRole(name);
                      const hue = role ? palette[role] : undefined;
                      if (!hue) return "linear-gradient(90deg, #22E1FFB3, #22E1FF, #ffffff)";
                      const base = hueColorMap[hue] || "#22E1FF";
                      return `linear-gradient(90deg, ${hexToRgba(base, 0.7)}, ${base}, #ffffff)`;
                    })(),
                  }}
                  role="progressbar"
                  aria-valuemin={0}
                  aria-valuemax={100}
                  aria-valuenow={pct}
                  aria-label={`${name} ${pct}%`}
                />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}


