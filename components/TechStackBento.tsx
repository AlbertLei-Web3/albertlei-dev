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
}: {
  projects: Project[];
  maxItems?: number;
  title?: string;
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
    const arr = Array.from(map.entries()).sort((a, b) => b[1] - a[1]).slice(0, maxItems);
    const max = arr.length ? arr[0][1] : 1;
    return { items: arr, maxCount: max };
  }, [projects, aliasMap, maxItems]);

  if (items.length === 0) {
    return <div className="text-sm text-white/60">No tech tags found.</div>;
  }

  // 便当格布局：小屏单列；中屏 6 列；大屏 12 列
  return (
    <div className="space-y-4">
      {/* Center brand card */}
      <div className="grid grid-cols-1 gap-4 md:grid-cols-6 xl:grid-cols-12">
        {/* 渲染前 N-1 个卡片 + 中央品牌卡 + 余下卡片 */}
        {items.map(([name, count], idx) => {
          const pct = Math.round((count / maxCount) * 100);
          // 中央品牌卡插入点（近似居中位置）
          const insertBrand = idx === Math.min(6, Math.ceil(items.length / 2));
          return (
            <React.Fragment key={name}>
              {insertBrand && (
                <div className="glass relative flex items-center justify-center rounded-2xl bg-white/5 p-6 text-center ring-1 ring-white/10 md:col-span-6 xl:col-span-4 xl:row-span-2">
                  <div className="select-none">
                    <div className="mx-auto mb-2 h-10 w-10 rounded-lg bg-neon-cyan/20 ring-1 ring-neon-cyan/40 shadow-neonCyan" />
                    <div className="text-2xl font-extrabold tracking-wide text-white/90">{title}</div>
                    <div className="mt-1 text-xs text-white/60">Auto-aggregated from projects</div>
                  </div>
                </div>
              )}

              {/* 技术卡片 */}
              <div className="glass rounded-2xl bg-white/5 p-4 ring-1 ring-white/10 md:col-span-3 xl:col-span-3">
                <div className="mb-2 text-sm font-semibold text-white/85">{name}</div>
                <div className="h-2.5 w-full overflow-hidden rounded-full bg-white/10 ring-1 ring-white/10">
                  <div
                    className="h-full bg-gradient-to-r from-neon-cyan/60 via-neon-cyan/80 to-white shadow-neonCyan"
                    style={{ width: `${Math.max(8, pct)}%` }}
                    role="progressbar"
                    aria-valuemin={0}
                    aria-valuemax={100}
                    aria-valuenow={pct}
                    aria-label={`${name} ${pct}%`}
                  />
                </div>
              </div>
            </React.Fragment>
          );
        })}
      </div>
    </div>
  );
}


