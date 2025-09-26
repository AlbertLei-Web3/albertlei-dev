"use client";

import React, { useEffect, useMemo, useState } from "react";
import TechRadar from "./TechRadar";
import type { Project } from "./ProjectCard";
import {useTranslations, useLocale} from 'next-intl';
import { skillPercent as globalSkillPercent, roleSkills as defaultRoleSkills } from '@/lib/skills';

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
  const tRadar = useTranslations('radar');
  const locale = useLocale();
  // 中文：若未从外部传入 roleSkills，则使用集中数据源 lib/skills.ts
  // English: Fallback to centralized roleSkills if not provided via props
  const effectiveRoleSkills: Record<string, string[]> | undefined = roleSkills || defaultRoleSkills;
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
    // 中文：仅使用集中定义的技能集合（lib/skills.ts），完全忽略 projects.tags，
    //      这样你在 skills.ts 中的增删改会 100% 反映到前端。
    // English: Use only centralized skills (lib/skills.ts), ignore projects.tags
    const set = new Set<string>();
    if (effectiveRoleSkills) {
      for (const role of Object.keys(effectiveRoleSkills)) {
        for (const raw of effectiveRoleSkills[role] || []) {
          const k = String(raw).trim();
          if (k) set.add(k);
        }
      }
    }
    const arr = Array.from(set.values()).map((name) => [name, 1] as [string, number]);
    return { items: arr, maxCount: 1 };
  }, [effectiveRoleSkills]);

  // 角色配色（与 Hero 徽章对应）
  const palette = useMemo<Record<string, string>>(() => ({
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
    // 中文：集中数据源 lib/skills.ts 中的 skillPercent 优先；未设置则为 1
    // English: Prefer centralized skillPercent; fallback to 1 if unspecified
    const v = (globalSkillPercent as Record<string, number>)[name];
    if (v == null) return 1;
    return Math.max(0, Math.min(100, v));
  };

  // 技能归属的角色
  const resolveRole = (skill: string): string | undefined => {
    if (!effectiveRoleSkills) return "Full-Stack Developer"; // 默认归入 Full-Stack Developer
    const key = skill.toLowerCase();
    for (const role of Object.keys(effectiveRoleSkills)) {
      const list = effectiveRoleSkills[role] || [];
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
    if (effectiveRoleSkills) return effectiveRoleSkills;
    const dict: Record<string, string[]> = {};
    for (const [name] of items) {
      const r = resolveRole(name) || "Full-Stack Developer";
      (dict[r] ||= []).push(name);
    }
    return dict;
  }, [effectiveRoleSkills, items]);

  // 中文：关于页标签的排列顺序：全栈开发者 → Web3 × AI → 项目经理 → 创始人
  // English: Desired order on About page: Full-Stack → Web3 × AI → PM → Founder
  const rolesOrder = ["Full-Stack Developer", "Web3 × AI", "Project Manager", "Founder"]; 
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
  // 中文：小屏（<800px）时，限制 Chips 只显示两行；点击 View more 展开
  // English: On narrow screens (<800px), show only 2 rows of chips; expand with View more
  const [isNarrow, setIsNarrow] = useState<boolean>(false);
  const [chipsExpanded, setChipsExpanded] = useState<boolean>(false);
  useEffect(() => {
    const detect = () => setIsNarrow(typeof window !== 'undefined' && window.innerWidth < 800);
    detect();
    window.addEventListener('resize', detect);
    return () => window.removeEventListener('resize', detect);
  }, []);
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
      <div className="flex flex-wrap md:flex-nowrap items-center justify-start gap-2 overflow-visible">
        <div className="flex flex-wrap md:flex-nowrap items-center gap-2 py-1.5 px-2 md:px-3">
          {rolesOrder.map((r) => (
            <button
              key={r}
              onClick={() => setTabRole(r)}
              className={`group relative shrink-0 whitespace-nowrap rounded-full border px-3.5 py-1.5 text-[13px] font-semibold transition-transform duration-150 hover:scale-[1.05] active:scale-95 ${tabRole === r ? 'ring-1 ring-white/30' : 'opacity-95 hover:opacity-100'}`}
              style={chipStyle(r)}
              aria-pressed={tabRole === r}
            >
              <span className="pointer-events-none absolute inset-0 rounded-full opacity-0 transition-opacity duration-200 group-hover:opacity-100" style={{ boxShadow: `0 0 22px ${hexToRgba((hueColorMap[palette[r] || 'amber'] || '#22E1FF'), 0.55)}` }} aria-hidden />
              {(() => {
                // 中文：Web3 × AI 保持不变；其他在 zh 下使用中文标签
                // English: Keep "Web3 × AI" as-is; localize others for zh
                if (locale === 'zh') {
                  if (r === 'Web3 × AI') return r;
                  if (r === 'Founder') return '创始人';
                  if (r === 'Full-Stack Developer') return '全栈开发';
                  if (r === 'Project Manager') return '项目经理';
                }
                return r;
              })()}
              <span className="ml-1 inline-block rounded-full bg-white/10 px-1.5 py-0.5 text-[10px] align-middle">
                {roleCounts[r] ?? 0}
              </span>
            </button>
          ))}
        </div>
        {/* 删除右上重复的角色标签，仅保留切换按钮 */}
        {/**
         * 中文：为“Radar”按钮加入“呼吸”动画（自动放大-缩小循环），
         *       悬停时仍可额外轻微放大；减速曲线使用 easeInOut，更自然。
         * English: Add a breathing animation (auto scale up/down loop) to the
         *          "Radar" button. Hover still adds a slight extra zoom.
         */}
        <button
          onClick={() => setView((v) => (v === "chips" ? "radar" : "chips"))}
          className="group relative md:ml-auto mt-2 md:mt-0 shrink-0 inline-flex items-center gap-2 rounded-full border px-4 py-2 text-sm font-semibold transition-transform duration-150 hover:scale-110 active:scale-95"
          style={radarBtnStyle}
          aria-label="Toggle skills view"
          data-animate="breath"
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
          {view === "chips" ? tRadar('toggle.to_radar') : tRadar('toggle.to_chips')}
        </button>
      </div>

      {/* Bento Chips with animation */}
      {view === "chips" && (
        <div
          key={tabRole}
          className="grid grid-cols-2 gap-2.5 md:grid-cols-3 xl:grid-cols-4"
          aria-live="polite"
        >
          {(() => {
            const cols = isNarrow ? 2 : 0; // small screens use 2 columns defined in class
            const maxRows = 2;
            const limit = isNarrow && !chipsExpanded ? cols * maxRows : displaySkills.length;
            const list = displaySkills.slice(0, limit);
            const localizeSkill = (s: string): string => {
              if (locale !== 'zh') return s;
              // 仅在中文界面对非专业名词（Founder/PM 相关）进行直观中文化
              // Only localize some non-technical items for zh UI
              const map: Record<string, string> = {
                'Product Design (Figma, Notion...)': '产品设计（Figma、Notion…）',
                'Business Model Design': '商业模型设计',
                'Ecosystem Partnerships': '生态合作伙伴',
                'Team Management': '团队管理',
                'Remote Collaboration': '远程协作',
                'Rapid Iteration': '快速迭代',
                'Demo Video Production': '演示视频制作',
                'Pitch Deck': '路演稿（Pitch Deck）',
                'Linear': 'Linear',
                'Jira': 'Jira',
                'Figma': 'Figma',
                'Scrum Master': 'Scrum Master',
                'Stakeholder Management': '干系人管理',
                'Delivery governance': '交付治理',
                'Analytics dashboards': '分析看板',
                'User Feedback Loop': '用户反馈闭环',
              };
              return map[s] || s;
            };
            return list.map((skill) => (
            <div
              key={skill}
              className="rounded-xl border px-3.5 py-2.5 text-[13px] font-medium"
              style={chipStyle(tabRole)}
              title={skill}
            >
              <div className="flex items-center justify-between gap-2">
                <span className="truncate">{localizeSkill(skill)}</span>
                {(() => {
                  const pct = getSkillPercent(skill);
                  return <span className="text-[10px] text-white/75 tabular-nums">{pct}%</span>;
                })()}
              </div>
              {(() => {
                const pct = getSkillPercent(skill);
                const hue = (palette as Record<string, string>)[tabRole] || "amber";
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
            </div>
            ));
          })()}
          {isNarrow && displaySkills.length > 4 && (
            <div className="col-span-full mt-1 flex justify-center">
              <button
                type="button"
                onClick={() => setChipsExpanded((v) => !v)}
                className="rounded-full border border-white/20 bg-white/10 px-3 py-1.5 text-xs font-semibold text-white/90 hover:bg-white/15 active:scale-95 transition"
              >
                {chipsExpanded ? 'View less' : 'View more'}
              </button>
            </div>
          )}
          {displaySkills.length === 0 && (
            <div className="col-span-full text-sm text-white/60">No skills found for this role.</div>
          )}
        </div>
      )}

      {view === "radar" && (
        <div className="rounded-2xl bg-white/5 p-3 ring-1 ring-white/10">
          {/* 标题：《能力图》/Skills Map */}
          <div className="mb-2 text-sm text-white/85">{tRadar('title')}</div>
          {(() => {
            // 中文：只展示单一系列；轴顺序与强弱依次为：
            // 前后端开发 → 项目管理 → 区块链 → 商务 → 数据与AI服务 → 基础设施与运维（数值递减）
            // English: Single series only; axes order and descending strengths as specified
            const axes = [
              'Frontend & Backend',
              'PM & Collaboration',
              'Blockchain',
              'Business',
              'Data & AI Services',
              'Infra & DevOps',
            ];
            const displayAxes = locale === 'zh'
              ? ['前后端开发','项目管理','区块链','商务','数据与AI服务','基础设施与运维']
              : axes;
            const colorHex = ({
              'Web3 × AI': '#10B981',
              'Founder': '#F43F5E',
              'Full-Stack Developer': '#F59E0B',
              'Project Manager': '#6366F1',
            } as Record<string, string>)[tabRole] || '#22E1FF';
            const values = {
              'Frontend & Backend': 90,
              'PM & Collaboration': 80,
              'Blockchain': 72,
              'Business': 66,
              'Data & AI Services': 60,
              'Infra & DevOps': 55,
            } as Record<string, number>;
            return (
              <TechRadar axes={axes} displayAxes={displayAxes} series={[{ label: tabRole, colorHex, values }]} size={340} />
            );
          })()}
        </div>
      )}
    </div>
  );
}


