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

export type Project = {
  id: string;
  title: string;
  description: string;
  // 'video' 使用 <video> 标签, 'iframe' 用于 YouTube/Player 等
  // 'video' uses <video>, 'iframe' for YouTube/Players
  mediaType: "video" | "iframe";
  mediaSrc: string; // 视频地址或嵌入地址 video url or embed url
  poster?: string; // 可选视频封面 optional poster for <video>
};

export function ProjectCard({ project }: { project: Project }) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 14 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.5 }}
      className="group glass relative overflow-hidden rounded-xl ring-1 ring-white/10"
    >
      {/* 媒体区域 Media area */}
      <div className="relative aspect-[16/9] w-full overflow-hidden">
        {project.mediaType === "video" ? (
          <video
            src={project.mediaSrc}
            poster={project.poster}
            controls
            playsInline
            className="h-full w-full object-cover"
          />
        ) : (
          <iframe
            src={project.mediaSrc}
            title={project.title}
            className="h-full w-full"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowFullScreen
          />
        )}
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

      {/* 文本区域 Text area */}
      <div className="space-y-2 px-4 py-4">
        <h3 className="text-lg font-semibold">
          {project.title}
        </h3>
        <p className="text-sm text-white/75">{project.description}</p>
      </div>
    </motion.article>
  );
}


