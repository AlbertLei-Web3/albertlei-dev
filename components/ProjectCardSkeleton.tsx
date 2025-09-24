"use client";

/**
 * 中文：
 * - 项目卡片骨架占位：用于你还未填充真实项目时展示布局
 * - 结构与 ProjectCard 一致：媒体区域(16:9) + 标题 + 描述
 * - 使用 Tailwind 的 animate-pulse 实现加载感，便于你快速替换为真实内容
 * 
 * English:
 * - Project card skeleton placeholder: shows layout before real projects exist
 * - Mirrors ProjectCard structure: media(16:9) + title + description
 * - Uses Tailwind animate-pulse for loading vibe; replace with real content later
 */
export default function ProjectCardSkeleton() {
  return (
    <article className="glass relative overflow-hidden rounded-xl ring-1 ring-white/10">
      {/* 媒体区域占位 Media placeholder (16:9) */}
      <div className="relative aspect-[16/9] w-full overflow-hidden">
        <div
          className="absolute inset-0 animate-pulse bg-gradient-to-br from-white/5 via-white/10 to-white/5"
        />
      </div>

      {/* 文本占位 Text placeholders */}
      <div className="space-y-3 p-4">
        <div className="h-5 w-2/3 animate-pulse rounded bg-white/15" />
        <div className="h-3 w-full animate-pulse rounded bg-white/10" />
        <div className="h-3 w-5/6 animate-pulse rounded bg-white/10" />
      </div>
    </article>
  );
}


