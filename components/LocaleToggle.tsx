"use client";

import React, {useCallback} from "react";
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
    // #hash 只能在客户端读取；hash can only be read on client
    const hash = typeof window !== "undefined" ? window.location.hash : "";
    const url = query && query.length > 0 ? `${newPath}?${query}${hash}` : `${newPath}${hash}`;

    router.push(url);
  }, [locale, pathname, searchParams, router]);

  return (
    <button
      type="button"
      onClick={onToggle}
      className="rounded-md border border-white/15 bg-white/10 px-2 py-1 text-xs font-semibold text-white/90 hover:bg-white/15 active:scale-95 transition"
      aria-label={locale === "zh" ? "Switch to English" : "切换到中文"}
      title={locale === "zh" ? "Switch to English" : "切换到中文"}
    >
      {/* 中文：按钮显示目标语言；English: show target language label */}
      {locale === "zh" ? "EN" : "中文"}
    </button>
  );
}


