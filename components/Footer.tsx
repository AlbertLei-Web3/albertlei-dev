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
import { Mail, Github, Linkedin, Twitter } from "lucide-react";

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

export function Footer() {
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
      icon: <Twitter size={20} aria-hidden={true} />,
      ariaLabel: "X (Twitter): @Web3preacherLei",
    },
    {
      href: "https://www.linkedin.com/in/albert-lei-626536320/",
      label: "LinkedIn",
      icon: <Linkedin size={20} aria-hidden={true} />,
      ariaLabel: "LinkedIn profile",
    },
    {
      // 中文：微信以手机号呈现；为了可点击性，这里使用 tel:，也可改为展示纯文本
      // English: Show WeChat as phone number; use tel: for clickability; can switch to plain text.
      href: "tel:17743267863",
      label: "WeChat",
      icon: <WeChatIcon />,
      ariaLabel: "WeChat: 17743267863",
    },
  ];

  return (
    <div className="mx-auto mt-16 max-w-7xl px-4 pb-12">
      <footer id="contact">
      {/**
       * 中文：将 items-center / text-center 改为 items-start / text-left，使「Contact」位于卡片左上
       * English: Switch to items-start / text-left so the "Contact" title sits at top-left of the card.
       */}
      <div className="glass flex flex-col items-start gap-3 px-6 py-6 text-left">
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
        <div className="flex flex-wrap items-center justify-start gap-3 text-sm">
          {socialLinks.map((s) => (
            <a
              key={s.label}
              href={s.href}
              className="group"
              aria-label={s.ariaLabel}
              target={s.href.startsWith("http") ? "_blank" : undefined}
              rel={s.href.startsWith("http") ? "noopener noreferrer" : undefined}
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
    </div>
  );
}

