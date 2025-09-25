"use client";

/**
 * 中文：
 * - 联系方式卡片：将「Contact」标题放到卡片左上角；
 * - 使用真实的邮箱与社交链接；添加 GitHub / X / LinkedIn / Email / 微信 图标；
 * - 悬停动效与无障碍支持（aria-label）。
 *
 * English:
 * - Contact card: place the "Contact" title at the top-left of the card;
 * - Use real email and social links; add icons for GitHub / X / LinkedIn / Email / WeChat;
 * - Hover animation and accessibility (aria-label).
 */
import React, { useState, useCallback, useEffect } from "react";
import { Mail, Github, Linkedin, X as CloseIcon, Send } from "lucide-react";

// 中文：简单的微信图标（内联 SVG），避免额外依赖；
// English: Minimal WeChat icon (inline SVG) to avoid extra dependency.
function WeChatIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      viewBox="0 0 48 48"
      width={20}
      height={20}
      aria-hidden="true"
      focusable="false"
      {...props}
    >
      {/* WeChat logo simplified */}
      <circle cx="18" cy="20" r="10" fill="#1AAD19" />
      <circle cx="32" cy="26" r="12" fill="#1AAD19" />
      <circle cx="15" cy="19" r="1.8" fill="#fff" />
      <circle cx="21" cy="19" r="1.8" fill="#fff" />
      <circle cx="28" cy="25" r="2" fill="#fff" />
      <circle cx="36" cy="25" r="2" fill="#fff" />
    </svg>
  );
}

// 中文：X（原 Twitter）品牌图标（内联 SVG）；避免外部依赖，并保持清晰的“X”外形。
// English: X (formerly Twitter) brand icon as inline SVG; no external deps, clean brand "X" shape.
function XLogoIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      viewBox="0 0 24 24"
      width={20}
      height={20}
      aria-hidden="true"
      focusable="false"
      {...props}
    >
      {/* Simple X mark resembling X brand */}
      <path
        fill="currentColor"
        d="M2.5 2.5h4.3l6.1 7.9 6.2-7.9h2.6l-7.4 9.5 7.9 9.5h-4.3l-6.6-8.1-6.3 8.1H2.9l7.7-9.8-8.1-9.2Z"
      />
    </svg>
  );
}

export function Footer() {
  // 中文：控制微信弹窗的可见性
  // English: Control visibility of the WeChat modal
  const [isWeChatOpen, setIsWeChatOpen] = useState(false);
  const [highlightContacts, setHighlightContacts] = useState(false);

  // 中文：快捷方法，打开/关闭
  // English: Helpers to open/close
  const openWeChat = useCallback(() => setIsWeChatOpen(true), []);
  const closeWeChat = useCallback(() => setIsWeChatOpen(false), []);

  // 中文：暴露一个全局函数，供 Hero 的 CTA 调用以触发“发光高亮”
  // English: Expose a global function so Hero CTA can trigger contact highlight
  useEffect(() => {
    (window as any).__highlightContactCard = () => {
      setHighlightContacts(true);
      // 高亮 2.2 秒后自动关闭
      setTimeout(() => setHighlightContacts(false), 2200);
    };
  }, []);

  // 中文：键盘可访问性——按下 ESC 关闭弹窗
  // English: Keyboard a11y — close modal on ESC key
  useEffect(() => {
    if (!isWeChatOpen) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeWeChat();
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [isWeChatOpen, closeWeChat]);

  // 中文：社交与联系方式数据（单一可信来源，便于维护）
  // English: Single source of truth for socials and contact links.
  const socialLinks = [
    {
      href: "mailto:albert.lei1975@gmail.com",
      label: "Email",
      icon: <Mail size={20} aria-hidden={true} />,
      ariaLabel: "Email: albert.lei1975@gmail.com",
    },
    {
      href: "https://github.com/AlbertLei-Web3",
      label: "GitHub",
      icon: <Github size={20} aria-hidden={true} />,
      ariaLabel: "GitHub: AlbertLei-Web3",
    },
    {
      href: "https://x.com/Web3preacherLei",
      label: "X",
      icon: <XLogoIcon />,
      ariaLabel: "X (Twitter): @Web3preacherLei",
    },
    {
      href: "https://www.linkedin.com/in/albert-lei-626536320/",
      label: "LinkedIn",
      icon: <Linkedin size={20} aria-hidden={true} />,
      ariaLabel: "LinkedIn profile",
    },
    {
      // 中文：Telegram 链接，使用纸飞机图标
      // English: Telegram link with paper plane icon
      href: "https://t.me/Web3preacherLei",
      label: "Telegram",
      icon: <Send size={20} aria-hidden={true} />,
      ariaLabel: "Telegram: @Web3preacherLei",
    },
    {
      // 中文：微信使用弹窗显示二维码图片，因此 href 设为 # 并绑定 onClick
      // English: WeChat opens a modal with QR image; set href to # and use onClick
      href: "#",
      label: "WeChat",
      icon: <WeChatIcon />,
      ariaLabel: "WeChat: 17743267863",
      onClick: (e: React.MouseEvent) => {
        e.preventDefault();
        openWeChat();
      },
    },
  ];

  return (
    <div className="mx-auto mt-16 max-w-7xl px-4 pb-12">
      <footer id="contact">
      {/**
       * 中文：将 items-center / text-center 改为 items-start / text-left，使「Contact」位于卡片左上
       * English: Switch to items-start / text-left so the "Contact" title sits at top-left of the card.
       */}
      <div className={`glass flex flex-col items-start gap-3 px-6 py-6 text-left ${highlightContacts ? 'ring-2 ring-neon-cyan/70 shadow-[0_0_24px_rgba(34,225,255,0.6)]' : ''}`}>
        <h4 className="neon-text text-lg font-semibold">Contact</h4>

        {/**
         * 中文：展示真实邮箱地址
         * English: Show the real email address
         */}
        <p className="text-white/80">
          Email: {" "}
          <a
            className="underline decoration-neon-cyan/60 hover:opacity-90"
            href="mailto:albert.lei1975@gmail.com"
          >
            albert.lei1975@gmail.com
          </a>
        </p>

        {/**
         * 中文：社交与通讯入口（带图标）；桌面端 hover 轻微缩放；移动端触控区域更大
         * English: Social/contact entries with icons; subtle hover scale; large touch targets on mobile
         */}
        <div className={`flex flex-wrap items-center justify-start gap-3 text-sm ${highlightContacts ? 'contact-glow' : ''}`}>
          {socialLinks.map((s) => (
            <a
              key={s.label}
              href={s.href}
              className="group"
              aria-label={s.ariaLabel}
              target={s.href.startsWith("http") ? "_blank" : undefined}
              rel={s.href.startsWith("http") ? "noopener noreferrer" : undefined}
              onClick={(s as any).onClick}
            >
              <span
                className="inline-flex items-center gap-2 rounded-md px-3 py-2 text-white/85 hover:bg-white/5 transition-transform duration-200 hover:scale-[1.06]"
              >
                {s.icon}
                <span>{s.label}</span>
              </span>
            </a>
          ))}
        </div>
      </div>
      <p className="mt-6 text-center text-xs text-white/50">
        © {new Date().getFullYear()} Albert Lei. All rights reserved.
      </p>
      </footer>
      {/**
       * 中文：微信弹窗（覆盖层 + 卡片）。
       * English: WeChat modal (overlay + card).
       */}
      {isWeChatOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm"
          role="dialog"
          aria-modal="true"
          aria-label="WeChat QR"
          onClick={closeWeChat}
        >
          {/**
           * 中文：阻止点击卡片内容时冒泡到遮罩，避免误关闭。
           * English: Stop propagation so clicks inside the card do not close the modal.
           */}
          <div
            className="glass relative mx-4 w-full max-w-sm rounded-lg p-4 text-center"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              type="button"
              className="absolute right-2 top-2 rounded-md p-1 text-white/80 hover:bg-white/10"
              aria-label="Close"
              onClick={closeWeChat}
            >
              <CloseIcon size={18} />
            </button>
            {/**
             * 中文：展示 public/wechat.png；Next.js 的 public 目录可直接用根路径引用。
             * English: Display public/wechat.png; Next.js public assets are available at root path.
             */}
            <img
              src="/wechat.png"
              alt="WeChat QR Code"
              className="mx-auto h-auto max-h-[70vh] w-full rounded-md object-contain"
            />
            <p className="mt-3 text-sm text-white/70">WeChat: 17743267863</p>
          </div>
        </div>
      )}
    </div>
  );
}

