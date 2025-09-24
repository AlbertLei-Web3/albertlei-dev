"use client";

import { useEffect } from "react";
import type { Project } from "./ProjectCard";

/**
 * 中文：
 * - 轻量弹窗：点击项目卡片后弹出，展示更丰富的文字与媒体。
 * - 不自动播放：仅当用户点击“Play”时，才渲染 video/iframe，节省首屏。
 *
 * English:
 * - Lightweight modal: opens from card, shows richer details & media.
 * - No autoplay: video/iframe only rendered after user intent.
 */
export default function ProjectModal({
  open,
  onClose,
  project,
}: {
  open: boolean;
  onClose: () => void;
  project: Project;
}) {
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-[1000] grid place-items-center p-4"
      aria-modal="true"
      role="dialog"
    >
      {/* 背景遮罩 Backdrop */}
      <div
        className="absolute inset-0 bg-black/70 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* 容器 Container */}
      <div className="relative z-[1001] w-full max-w-3xl overflow-hidden rounded-2xl border border-white/10 bg-[#0b0f1e]/95 shadow-2xl">
        {/* Header */}
        <div className="flex items-start justify-between gap-4 border-b border-white/10 p-4">
          <div className="min-w-0">
            <h3 className="text-lg font-semibold">{project.title}</h3>
            <p
              className="mt-1 text-sm text-white/70 line-clamp-2 md:line-clamp-3"
              title={project.description}
            >
              {project.description}
            </p>
          </div>
          <button
            onClick={onClose}
            className="rounded-md border border-white/10 bg-white/10 px-2 py-1 text-sm text-white/90 hover:bg-white/15"
            aria-label="Close"
          >
            Close
          </button>
        </div>

        {/* Body */}
        <div className="grid gap-4 p-4 md:grid-cols-5">
          {/* Media placeholder + manual play */}
          <div className="md:col-span-3">
            {project.mediaType === "video" ? (
              <video
                src={project.mediaSrc}
                poster={project.poster}
                controls
                playsInline
                preload="metadata"
                className="aspect-[16/9] w-full rounded-lg border border-white/10 bg-black/40 object-cover"
              />
            ) : (
              <iframe
                src={project.mediaSrc}
                title={project.title}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="aspect-[16/9] w-full rounded-lg border border-white/10 bg-black/40"
                allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
              />
            )}
          </div>

          {/* Details */}
          <div className="md:col-span-2">
            <div className="space-y-3 text-sm text-white/80">
              {project.longDescription ? (
                <p className="leading-relaxed">{project.longDescription}</p>
              ) : (
                <p className="leading-relaxed">More details about this project will appear here. Add longDescription, tags, repoUrl, and demoUrl to your Project object.</p>
              )}

              {project.tags && project.tags.length > 0 && (
                <div className="flex flex-wrap gap-2 pt-1">
                  {project.tags.map(tag => (
                    <span
                      key={tag}
                      className="rounded-full bg-white/10 px-3 py-1 text-xs font-medium text-white/90 ring-1 ring-white/10"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              )}

              <div className="flex flex-wrap gap-3 pt-2">
                {project.demoUrl && (
                  <a
                    href={project.demoUrl}
                    target="_blank"
                    rel="noreferrer noopener"
                    className="inline-flex items-center gap-2 rounded-full bg-black/80 px-4 py-1.5 text-xs font-semibold text-white ring-1 ring-white/10 shadow hover:bg-black/70 transition-colors"
                  >
                    {/* Globe icon */}
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
                    className="inline-flex items-center gap-2 rounded-full bg-black/80 px-4 py-1.5 text-xs font-semibold text-white ring-1 ring-white/10 shadow hover:bg-black/70 transition-colors"
                  >
                    {/* GitHub icon */}
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
                      <path d="M12 .5a12 12 0 0 0-3.79 23.4c.6.11.82-.26.82-.58v-2.02c-3.34.73-4.04-1.61-4.04-1.61-.55-1.41-1.34-1.79-1.34-1.79-1.1-.75.08-.73.08-.73 1.22.09 1.86 1.25 1.86 1.25 1.08 1.85 2.84 1.31 3.53 1 .11-.79.42-1.31.76-1.61-2.67-.3-5.47-1.34-5.47-5.95 0-1.31.47-2.39 1.24-3.24-.12-.3-.54-1.52.12-3.17 0 0 1.01-.32 3.3 1.23a11.5 11.5 0 0 1 6 0c2.28-1.55 3.29-1.23 3.29-1.23.66 1.65.24 2.87.12 3.17.77.85 1.24 1.93 1.24 3.24 0 4.62-2.8 5.65-5.47 5.95.43.37.82 1.1.82 2.23v3.3c0 .32.22.7.82.58A12 12 0 0 0 12 .5Z"/>
                    </svg>
                    Source
                  </a>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}


