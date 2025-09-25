"use client";

import React, { useMemo } from "react";
import type { Project } from "./ProjectCard";

/**
 * 中文（初学者友好）：
 * TechStackMeter 组件会从 projects 的 tags 中自动汇总技术关键词，
 * 统计出现频次并按比例渲染进度条，以直观展示你的技术覆盖面与熟悉度。
 * 
 * English (Beginner-friendly):
 * TechStackMeter aggregates tech keywords from projects' tags, counts frequency,
 * and renders proportional progress bars to visualize coverage/familiarity.
 */
export default function TechStackMeter({ projects, maxItems = 10 }: { projects: Project[]; maxItems?: number }) {
  // 统一大小写/别名，便于合并同义标签
  const aliasMap: Record<string, string> = useMemo(
    () => ({
      "typescript": "TypeScript",
      "ts": "TypeScript",
      "next": "Next.js",
      "next.js": "Next.js",
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
    }),
    []
  );

  const { totals, maxCount } = useMemo(() => {
    const map = new Map<string, number>();
    for (const p of projects) {
      const list = (p.tags || []).map((t) => String(t).trim());
      for (const raw of list) {
        const keyLower = raw.toLowerCase();
        const normalized = aliasMap[keyLower] || raw.replace(/\s+/g, " ").trim();
        map.set(normalized, (map.get(normalized) || 0) + 1);
      }
    }
    const entries = Array.from(map.entries())
      .sort((a, b) => b[1] - a[1])
      .slice(0, maxItems);
    const max = entries.length ? entries[0][1] : 1;
    return { totals: entries, maxCount: max };
  }, [projects, aliasMap, maxItems]);

  if (totals.length === 0) {
    return (
      <div className="text-sm text-white/60">No tech tags found. Add tags to your projects to power this chart.</div>
    );
  }

  return (
    <div className="space-y-3" aria-label="Tech stack proficiency">
      {totals.map(([name, count]) => {
        const pct = Math.round((count / maxCount) * 100);
        return (
          <div key={name} className="grid grid-cols-5 items-center gap-3">
            <div className="col-span-2 text-xs font-medium text-white/85">{name}</div>
            <div className="col-span-3">
              <div className="h-2.5 w-full rounded-full bg-white/10 ring-1 ring-white/10 overflow-hidden">
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
          </div>
        );
      })}
    </div>
  );
}


