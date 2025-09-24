"use client";

/**
 * 中文：
 * - 可复用项目卡片：标题、描述、视频（<video> 或 <iframe>）
 * - 悬停时卡片亮起霓虹边框；滚动进入时淡入
 * - 重点：响应式 16:9 容器，视频自适应
 * 
 * English:
 * - Reusable project card: title, description, video (<video> or <iframe>)
 * - Neon border glow on hover; fade-in on scroll
 * - Key: responsive 16:9 container for auto-scaling media
 */
import { motion } from "framer-motion";
import { useState } from "react";
import ProjectModal from "./ProjectModal";

// 中文：为了解决某些类型推断在项目环境下对 motion.* 的 HTML 属性兼容性问题
// English: work around occasional typing issues for motion.* accepting HTML props in this project setup
const MotionDiv = motion.div as any;

export type Project = {
  id: string;
  title: string;
  description: string;
  // 'video' 使用 <video> 标签, 'iframe' 用于 YouTube/Player 等
  // 'video' uses <video>, 'iframe' for YouTube/Players
  mediaType: "video" | "iframe";
  mediaSrc: string; // 视频地址或嵌入地址 video url or embed url
  poster?: string; // 可选视频封面 optional poster for <video>
  /**
   * 中文：可选的长描述、标签与外链（例如 GitHub/Live Demo），用于弹出层中展示
   * English: optional long description, tags and links for the modal detail panel
   */
  longDescription?: string;
  tags?: string[];
  repoUrl?: string;
  demoUrl?: string;
};

export function ProjectCard({ project }: { project: Project }) {
  // 中文：控制弹窗的开关
  // English: control modal visibility
  const [open, setOpen] = useState(false);
  // 中文：小屏(≤800px)下控制标签是否展开
  // English: controls whether tags are expanded on small screens (≤800px)
  const [tagsExpanded, setTagsExpanded] = useState(false);

  // 中文：若未提供 poster，尝试为常见外链源自动生成缩略图（YouTube / Google Drive）
  // English: auto-generate thumbnail for common providers if poster is missing
  const resolvePoster = (): string | undefined => {
    if (project.poster) return project.poster;
    if (project.mediaType === "iframe") {
      const src = project.mediaSrc || "";
      // YouTube embed or watch URL → img.youtube.com thumbnail
      // e.g. https://www.youtube-nocookie.com/embed/VIDEO_ID
      let m = src.match(/\/embed\/([a-zA-Z0-9_-]{6,})/);
      if (!m) m = src.match(/[?&]v=([a-zA-Z0-9_-]{6,})/);
      if (m && m[1]) {
        const id = m[1];
        return `https://img.youtube.com/vi/${id}/hqdefault.jpg`;
      }
      // Google Drive preview → thumbnail endpoint
      // e.g. https://drive.google.com/file/d/FILE_ID/preview
      const g = src.match(/\/file\/d\/([^/]+)\//);
      if (g && g[1]) {
        const fid = g[1];
        return `https://drive.google.com/thumbnail?id=${fid}&sz=w1280`;
      }
    }
    return undefined;
  };
  const posterSrc = resolvePoster();

  return (
    <>
      <MotionDiv
        initial={{ opacity: 0, y: 14 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.5 }}
        className="group glass relative overflow-hidden rounded-xl ring-1 ring-white/10 cursor-pointer"
        onClick={() => setOpen(true)}
        role="article"
      >
        {/* 媒体区域占位（不直接加载视频/iframe，减轻首屏） */}
        {/* Media placeholder (we do NOT load video/iframe here) */}
        <div className="relative aspect-[16/9] w-full overflow-hidden">
          {posterSrc ? (
            <img src={posterSrc} alt={project.title} className="h-full w-full object-cover" loading="lazy" />
          ) : (
            <div className="h-full w-full bg-gradient-to-br from-white/5 via-white/10 to-white/5" />
          )}

          {/* 悬浮播放图标 Hover play icon */}
          <div className="absolute inset-0 grid place-items-center">
            <div className="rounded-full border border-white/20 bg-black/40 p-3 backdrop-blur transition-transform group-hover:scale-110">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="text-white/90">
                <path d="M8 5v14l11-7z" fill="currentColor"/>
              </svg>
            </div>
          </div>

          {/* 霓虹高亮边框 Neon glow ring on hover */}
          <div
            className="pointer-events-none absolute inset-0 rounded-xl opacity-0 
                       transition-opacity duration-300 group-hover:opacity-100"
            style={{
              boxShadow:
                "inset 0 0 0 1px rgba(34,225,255,0.35), 0 0 24px rgba(34,225,255,0.25)",
            }}
          />
        </div>

        {/* 文本与标签/按钮 Text + tags/actions */}
        <div className="space-y-3 px-4 py-4">
          <h3 className="text-lg font-semibold">{project.title}</h3>
          <p className="text-sm text-white/75 line-clamp-2">{project.description}</p>

          {/* Tags on card */}
          {project.tags && project.tags.length > 0 && (
            <div className="space-y-2">
              {/**
               * 中文：
               * - 小屏(≤800px)默认仅显示两行标签（通过限高与 overflow-hidden 实现）；
               * - 提供“View more/less”按钮，点击不会触发卡片弹窗。
               * 
               * English:
               * - On ≤800px screens show only two tag rows (via max-height + overflow-hidden);
               * - Provide a "View more/less" button; clicking does not open the card modal.
               */}
              <div className="relative">
                <div
                  className={
                    tagsExpanded
                      ? "flex flex-wrap gap-2"
                      : "flex flex-wrap gap-2 max-[800px]:max-h-12 max-[800px]:overflow-hidden"
                  }
                >
                  {project.tags.map((tag) => (
                    <span
                      key={tag}
                      className="rounded-full px-3 py-1 text-xs font-semibold text-neon-cyan ring-1 ring-neon-cyan/40 bg-neon-cyan/15 hover:bg-neon-cyan/25 transition-colors"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
                {/* 中文：未展开时在小屏显示顶部渐隐遮罩；English: fading overlay when collapsed on small screens */}
                {!tagsExpanded && (
                  <div className="hidden max-[800px]:block pointer-events-none absolute bottom-0 left-0 right-0 h-8 bg-gradient-to-t from-base-900/95 to-transparent" />
                )}
              </div>

              {/* 中文：小屏显示展开/收起按钮；English: toggle only on small screens */}
              {(project.tags?.length || 0) > 6 && (
                <div className="hidden max-[800px]:flex pt-1">
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      setTagsExpanded((v) => !v);
                    }}
                    className="inline-flex items-center gap-1 rounded-full bg-white/10 px-3 py-1 text-xs font-semibold text-white/90 ring-1 ring-white/15 hover:bg-white/15"
                  >
                    {tagsExpanded ? "View less" : "View more"}
                  </button>
                </div>
              )}
            </div>
          )}

          {/* Actions on card */}
          {(project.demoUrl || project.repoUrl) && (
            <div className="flex flex-wrap gap-2 pt-1">
              {project.demoUrl && (
                <a
                  href={project.demoUrl}
                  target="_blank"
                  rel="noreferrer noopener"
                  onClick={(e) => {
                    e.stopPropagation();
                  }}
                  className="inline-flex items-center gap-2 rounded-full px-4 py-1.5 text-sm font-semibold text-white bg-neon-cyan/20 ring-1 ring-neon-cyan/40 hover:bg-neon-cyan/30 shadow-neonCyan transition-colors"
                >
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                    <path d="M12 21c4.97 0 9-4.03 9-9s-4.03-9-9-9-9 4.03-9 9 4.03 9 9 9Z" stroke="currentColor" strokeWidth="1.5"/>
                    <path d="M3 12h18M12 3c2.5 2.5 4 5.5 4 9s-1.5 6.5-4 9c-2.5-2.5-4-5.5-4-9s1.5-6.5 4-9Z" stroke="currentColor" strokeWidth="1.5"/>
                  </svg>
                  Website
                </a>
              )}
              {project.repoUrl && (
                <a
                  href={project.repoUrl}
                  target="_blank"
                  rel="noreferrer noopener"
                  onClick={(e) => {
                    e.stopPropagation();
                  }}
                  className="inline-flex items-center gap-2 rounded-full px-4 py-1.5 text-sm font-semibold text-white bg-white/10 ring-1 ring-white/20 hover:bg-white/15 transition-colors"
                >
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
                    <path d="M12 .5a12 12 0 0 0-3.79 23.4c.6.11.82-.26.82-.58v-2.02c-3.34.73-4.04-1.61-4.04-1.61-.55-1.41-1.34-1.79-1.34-1.79-1.1-.75.08-.73.08-.73 1.22.09 1.86 1.25 1.86 1.25 1.08 1.85 2.84 1.31 3.53 1 .11-.79.42-1.31.76-1.61-2.67-.3-5.47-1.34-5.47-5.95 0-1.31.47-2.39 1.24-3.24-.12-.3-.54-1.52.12-3.17 0 0 1.01-.32 3.3 1.23a11.5 11.5 0 0 1 6 0c2.28-1.55 3.29-1.23 3.29-1.23.66 1.65.24 2.87.12 3.17.77.85 1.24 1.93 1.24 3.24 0 4.62-2.8 5.65-5.47 5.95.43.37.82 1.1.82 2.23v3.3c0 .32.22.7.82.58A12 12 0 0 0 12 .5Z"/>
                  </svg>
                  GitHub
                </a>
              )}
            </div>
          )}
        </div>
      </MotionDiv>

      {/* 详情弹窗 Detail modal */}
      <ProjectModal open={open} onClose={() => setOpen(false)} project={project} />
    </>
  );
}


