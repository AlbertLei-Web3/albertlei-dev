"use client";

/**
 * 中文：
 * - 可展开的项目区：默认展示部分项目，点击“View more”逐步加载更多；支持“View less”折叠
 * - 自适应网格：移动 1 列、平板 2 列、桌面 3 列；空列表时显示骨架占位
 * - 你可以通过 props 调整初始展示数量与每次增加数量
 *
 * English:
 * - Expandable projects section: shows a subset initially; "View more" to load more; "View less" to collapse
 * - Responsive grid: 1 col (mobile), 2 cols (tablet), 3 cols (desktop); skeleton placeholders when empty
 * - Tune initial visible count and increment via props
 */
import React, { useMemo, useState } from "react";
import { ProjectCard, type Project } from "./ProjectCard";
import ProjectCardSkeleton from "./ProjectCardSkeleton";

export default function ProjectsSection({
  projects,
  initialVisible = 3,
  increment = 3,
}: {
  projects: Project[];
  initialVisible?: number;
  increment?: number;
}) {
  const safeInitial = Math.max(1, Math.floor(initialVisible));
  const step = Math.max(1, Math.floor(increment));
  const [visible, setVisible] = useState<number>(safeInitial);

  const canShowMore = useMemo(() => visible < projects.length, [visible, projects.length]);
  const canShowLess = useMemo(() => projects.length > 0 && visible > safeInitial, [visible, safeInitial, projects.length]);

  const shown = useMemo(() => projects.slice(0, visible), [projects, visible]);

  return (
    <section id="projects" className="mt-14">
      {/* 标题行 Header */}
      <div className="mb-6 flex items-end justify-between">
        <h2 className="neon-text text-xl font-bold">Projects</h2>
        <span className="text-xs text-white/60">Videos are responsive, ideally 16:9.</span>
      </div>

      {/* 内容区 Content */}
      {projects.length === 0 ? (
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3">
          <ProjectCardSkeleton />
          <ProjectCardSkeleton />
          <ProjectCardSkeleton />
        </div>
      ) : (
        <>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3">
            {shown.map((p) => (
              <ProjectCard key={p.id} project={p} />
            ))}
          </div>

          {/* 操作区 Actions */}
          <div className="mt-8 flex items-center justify-center gap-4">
            {canShowMore && (
              <button
                onClick={() => setVisible((v) => Math.min(projects.length, v + step))}
                className="rounded-full bg-neon-cyan/20 px-5 py-2 text-sm font-semibold text-white ring-1 ring-white/10 shadow-neonCyan hover:bg-neon-cyan/30 transition-transform hover:scale-[1.03] active:scale-[0.98]"
              >
                View more
              </button>
            )}
            {canShowLess && (
              <button
                onClick={() => setVisible(safeInitial)}
                className="rounded-full bg-white/10 px-5 py-2 text-sm font-semibold text-white/90 ring-1 ring-white/10 hover:bg-white/15 transition-transform hover:scale-[1.03] active:scale-[0.98]"
              >
                View less
              </button>
            )}
          </div>
        </>
      )}
    </section>
  );
}


