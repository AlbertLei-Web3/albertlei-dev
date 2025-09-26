"use client";

import React, {useCallback} from "react";
import type { Route } from 'next';
import {useLocale} from "next-intl";
import {usePathname, useRouter, useSearchParams} from "next/navigation";

/**
 * 中文（初学者友好）：
 * - 站内语言切换按钮：保留当前路径、查询参数与锚点（#hash），仅替换首段语言前缀 /zh 或 /en。
 * - 工作原理：
 *   1) 读出当前 locale 与 pathname（如 /zh 或 /en/foo）。
 *   2) 替换路径首段为目标语言。
 *   3) 保留 ?query 与 #hash，然后通过 router.push 导航。
 *
 * English (Beginner-friendly):
 * - In-app locale toggle: preserves current path, query and hash; only swaps the leading locale segment (/zh or /en).
 * - How it works:
 *   1) Read current locale and pathname (e.g., /zh or /en/foo).
 *   2) Replace the first segment with the target locale.
 *   3) Keep ?query and #hash and navigate using router.push.
 */
export default function LocaleToggle() {
  const locale = useLocale();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const router = useRouter();

  const onToggle = useCallback(() => {
    const current = pathname || "/";
    const target = locale === "zh" ? "en" : "zh";

    // 中文：切分路径，替换第一段为目标语言；英文：split pathname and replace the first segment.
    const segments = current.split("/").filter(Boolean); // e.g. ["zh", "foo"]
    if (segments.length === 0) {
      segments.push(target);
    } else {
      // 若首段不是 zh/en，也强制插入（兜底）
      if (segments[0] === "zh" || segments[0] === "en") {
        segments[0] = target;
      } else {
        segments.unshift(target);
      }
    }
    const newPath = "/" + segments.join("/");

    const query = searchParams?.toString();
    // 中文：typedRoutes 不接受包含 hash 的字符串作为 Route；因此把 hash 分离，先只推送“路径+查询”，再单独设置 hash。
    // English: typedRoutes rejects URLs containing hash; push pathname+query first, then set hash separately.
    const hash = typeof window !== "undefined" ? window.location.hash : "";
    const pathWithQuery = query && query.length > 0 ? `${newPath}?${query}` : `${newPath}`;

    router.push(pathWithQuery as Route);
    if (hash) {
      // 中文：导航完成后再设置 hash，避免类型冲突
      // English: Apply hash after navigation to avoid type constraint
      setTimeout(() => {
        try { if (typeof window !== 'undefined') window.location.hash = hash.substring(1); } catch {}
      }, 0);
    }
  }, [locale, pathname, searchParams, router]);

  return (
    // 中文：更显眼的语言切换按钮（增大尺寸、霓虹描边、柔和脉冲光）
    // English: More prominent locale toggle (larger size, neon ring, soft pulsing glow)
    <button
      type="button"
      onClick={onToggle}
      className="relative overflow-visible rounded-full border border-white/20 bg-black/60 px-5 py-2.5 text-base font-extrabold text-white/95 shadow-[0_0_22px_rgba(34,225,255,0.45)] ring-2 ring-neon-cyan/50 hover:bg-black/70 hover:ring-neon-cyan/70 active:scale-95 transition"
      aria-label={locale === "zh" ? "Switch to English" : "切换到中文"}
      title={locale === "zh" ? "Switch to English" : "切换到中文"}
    >
      {/* 中文：柔和的发光背景与脉冲环，提升可见性（纯装饰，不影响可点击区域） */}
      {/* English: Soft glow + pulsing ring for visibility (decorative only, non-interactive) */}
      <span className="pointer-events-none absolute -inset-1 rounded-full bg-neon-cyan/30 blur-md opacity-50"></span>
      <span className="pointer-events-none absolute -inset-2 rounded-full ring-2 ring-neon-cyan/40 animate-ping opacity-25"></span>

      {/* 中文：按钮显示目标语言；English: show target language label */}
      {locale === "zh" ? "EN" : "中文"}
    </button>
  );
}


