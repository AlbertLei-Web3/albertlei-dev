"use client";

import React, { useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import TechRadar from "./TechRadar";
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

  /**
   * 中文：根据技能名生成稳定的熟练度百分比（30%~80%），保证每次渲染一致。
   * English: Stable pseudo-random percentage (30%~80%) derived from skill name.
   */
  const getSkillPercent = (name: string): number => {
    let hash = 0;
    for (let i = 0; i < name.length; i++) hash = (hash * 31 + name.charCodeAt(i)) >>> 0;
    return 30 + (hash % 51); // 30..80
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
    const base = hueColorMap[hue] || "#22E1FF";
    const bg = hexToRgba(base, 0.24);     // 提升背景不透明度，增强对比度
    const ring = hexToRgba(base, 0.55);    // 更亮的外环/阴影
    const text = "rgba(255,255,255,0.92)"; // 统一白色文本，提升可读性
    return { backgroundColor: bg, boxShadow: `0 0 18px ${ring}`, color: text, borderColor: ring } as React.CSSProperties;
  };

  // Tabs × Bento：上方角色 Tabs，下方技能 Chip 网格
  const [tabRole, setTabRole] = useState<string>(rolesOrder[0]);

  const displaySkills = useMemo(() => {
    return (roleToSkills[tabRole] || []).slice();
  }, [roleToSkills, tabRole]);

  const [view, setView] = useState<"chips" | "radar">("chips");
  const [compareAll, setCompareAll] = useState<boolean>(false);
  // Radar 按钮固定亮青色主题（更显眼的霓虹青）
  const radarHex = "#22E1FF"; // neon-cyan
  const radarBtnStyle = {
    background: `linear-gradient(135deg, ${hexToRgba(radarHex, 0.22)} 0%, ${hexToRgba(
      radarHex,
      0.36
    )} 100%)`,
    borderColor: hexToRgba(radarHex, 0.65),
    color: "rgba(255,255,255,0.95)",
    boxShadow: `0 0 26px ${hexToRgba(radarHex, 0.6)}`,
  } as React.CSSProperties;

  return (
    <div className="space-y-4">
      {/* Tabs + 视图切换按钮 */}
      <div className="flex items-center justify-start gap-2 overflow-visible">
        <div className="flex items-center gap-2 overflow-x-auto overflow-y-visible py-1.5 px-2 md:px-3 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
          {rolesOrder.map((r) => (
            <button
              key={r}
              onClick={() => setTabRole(r)}
              className={`group relative whitespace-nowrap rounded-full border px-3.5 py-1.5 text-[13px] font-semibold transition-transform duration-150 hover:scale-[1.05] active:scale-95 ${tabRole === r ? 'ring-1 ring-white/30' : 'opacity-95 hover:opacity-100'}`}
              style={chipStyle(r)}
              aria-pressed={tabRole === r}
            >
              <span className="pointer-events-none absolute inset-0 rounded-full opacity-0 transition-opacity duration-200 group-hover:opacity-100" style={{ boxShadow: `0 0 22px ${hexToRgba((hueColorMap[palette[r] || 'amber'] || '#22E1FF'), 0.55)}` }} aria-hidden />
              {r}
              <span className="ml-1 inline-block rounded-full bg-white/10 px-1.5 py-0.5 text-[10px] align-middle">
                {roleCounts[r] ?? 0}
              </span>
            </button>
          ))}
        </div>
        {/* 删除右上重复的角色标签，仅保留切换按钮 */}
        <button
          onClick={() => setView((v) => (v === "chips" ? "radar" : "chips"))}
          className="group relative ml-auto inline-flex items-center gap-2 rounded-full border px-4 py-2 text-sm font-semibold transition-transform duration-150 hover:scale-110 active:scale-95"
          style={radarBtnStyle}
          aria-label="Toggle skills view"
        >
          <span className="pointer-events-none absolute inset-0 rounded-full opacity-0 transition-opacity duration-200 group-hover:opacity-100" style={{ boxShadow: `0 0 32px ${hexToRgba(radarHex, 0.75)}` }} aria-hidden />
          <svg width="18" height="18" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden>
            {/* 六边形指示图标：Chips->描边，Radar->填充 */}
            {view === 'chips' ? (
              <polygon points="12,2 21,7 21,17 12,22 3,17 3,7" fill="none" stroke="currentColor" strokeWidth="1.6" />
            ) : (
              <polygon points="12,2 21,7 21,17 12,22 3,17 3,7" fill="currentColor" />
            )}
          </svg>
          {view === "chips" ? "Radar" : "Chips"}
        </button>
      </div>

      {/* Bento Chips with animation */}
      {view === "chips" && (
      <AnimatePresence mode="popLayout">
        <motion.div
          key={tabRole}
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -8 }}
          transition={{ duration: 0.18 }}
          className="grid grid-cols-2 gap-2.5 md:grid-cols-3 xl:grid-cols-4"
          aria-live="polite"
        >
          {displaySkills.map((skill) => (
            <motion.div
              key={skill}
              layout
              className="rounded-xl border px-3.5 py-2.5 text-[13px] font-medium"
              style={chipStyle(tabRole)}
              title={skill}
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.15 }}
            >
              <div className="flex items-center justify-between gap-2">
                <span className="truncate">{skill}</span>
                {(() => {
                  const pct = getSkillPercent(skill);
                  return <span className="text-[10px] text-white/75 tabular-nums">{pct}%</span>;
                })()}
              </div>
              {(() => {
                const pct = getSkillPercent(skill);
                const hue = palette[tabRole] || "amber";
                const base = hueColorMap[hue] || "#22E1FF";
                return (
                  <div className="mt-1 h-1.5 w-full rounded-full bg-white/18">
                    <div
                      className="h-full rounded-full"
                      style={{
                        width: `${pct}%`,
                        background: `linear-gradient(90deg, ${hexToRgba(base,0.7)}, ${base})`,
                      }}
                    />
                  </div>
                );
              })()}
            </motion.div>
          ))}
          {displaySkills.length === 0 && (
            <div className="col-span-full text-sm text-white/60">No skills found for this role.</div>
          )}
        </motion.div>
      </AnimatePresence>
      )}

      {view === "radar" && (
        <div className="rounded-2xl bg-white/5 p-3 ring-1 ring-white/10">
          {/* 图例（Compare All 模式） */}
          {/* Compare 图例移除，避免右上重复展示 */}
          <TechRadar
            axes={[
              "Frontend",
              "Blockchain",
              "Data & AI Services",
              "Infra & DevOps",
              "PM & Collaboration",
              "Business",
            ]}
            series={compareAll ? [
              { label:'Web3 × AI', colorHex:'#10B981', values:{ Frontend:85, Blockchain:75, 'Data & AI Services':70, 'Infra & DevOps':60, 'PM & Collaboration':80, Business:65 } },
              { label:'Founder', colorHex:'#F43F5E', values:{ Frontend:70, Blockchain:55, 'Data & AI Services':58, 'Infra & DevOps':52, 'PM & Collaboration':85, Business:82 } },
              { label:'Full-Stack Developer', colorHex:'#F59E0B', values:{ Frontend:88, Blockchain:60, 'Data & AI Services':55, 'Infra & DevOps':65, 'PM & Collaboration':72, Business:60 } },
              { label:'Project Manager', colorHex:'#6366F1', values:{ Frontend:68, Blockchain:52, 'Data & AI Services':56, 'Infra & DevOps':58, 'PM & Collaboration':92, Business:75 } },
            ] : [
              {
                label: tabRole,
                values: {
                  Frontend: tabRole === "Full-Stack Developer" ? 88 : 85,
                  Blockchain: tabRole === "Web3 × AI" ? 75 : 60,
                  "Data & AI Services": tabRole === "Web3 × AI" ? 70 : 58,
                  "Infra & DevOps": tabRole === "Full-Stack Developer" ? 65 : 55,
                  "PM & Collaboration": tabRole === "Project Manager" ? 92 : 80,
                  Business: tabRole === "Founder" ? 82 : 65,
                },
                colorHex:
                  ({
                    "Web3 × AI": "#10B981",
                    Founder: "#F43F5E",
                    "Full-Stack Developer": "#F59E0B",
                    "Project Manager": "#6366F1",
                  } as Record<string, string>)[tabRole] || "#22E1FF",
              },
            ]}
            size={380}
          />
        </div>
      )}
    </div>
  );
}


