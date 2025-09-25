/**
 * 中文：
 * - 首页组合：NavBar + Hero + About + Projects + Footer
 * - projects 数组默认为空，按类型注释添加你的真实项目（标题/描述/视频）
 * - 列表区采用响应式网格，移动端一列、平板两列、桌面三列
 * 
 * English:
 * - Home composition: NavBar + Hero + About + Projects + Footer
 * - 'projects' is empty by default; add real ones per typed hints
 * - Responsive grid: 1 col on mobile, 2 on tablet, 3 on desktop
 */
import { NavBar } from "@/components/NavBar";
import { Hero } from "@/components/Hero";
import TechStackMeter from "@/components/TechStackMeter";
import TechStackBento from "@/components/TechStackBento";
import { ProjectCard, type Project } from "@/components/ProjectCard";
import ProjectsSection from "@/components/ProjectsSection";
import { Footer } from "@/components/Footer";

export default function HomePage() {
  // 注意：按你的真实数据填充，不要使用示例数据（遵循“不编造”要求）
  // Note: fill with your real data; do not use fabricated samples (per your rule)
  const projects: Project[] = [
    {
      id: "yt-akgktekzgn8",
      title: "Somnia DeFi Wallet ",
      description: "Somnia DeFi Wallet is a smart wallet project based on ERC4337.",
      longDescription: "Somnia DeFi Wallet is a smart wallet project based on Account Abstraction, built specifically for the Somnia DeFi Mini Hackathon.This is a complete DeFi wallet ecosystem with 4 core microservice components, each focusing on specific functional areas, working together to provide users with secure and convenient decentralized financial services.",
      mediaType: "iframe",
      mediaSrc: "https://www.youtube-nocookie.com/embed/AkGktEKzgn8?rel=0&modestbranding=1&playsinline=1",
      tags: ["Next.js 15+", "TypeScript", "Tailwind CSS", "Go", "Fiber", "PostgreSQL", "Solidity", "Hardhat", "ERC-4337", "Turnkey API"],
      demoUrl: "https://dorahacks.io/buidl/32615",
      repoUrl: "https://github.com/springmacedonio-sys/Somnia-DeFi-Wallet",
    },
  {
      id: "yt-0gGCtpkIk_A",
      title: "FanForce AI",
      description: "FanForce is an on-chain platform combining amateur sports with Web3 incentive mechanisms.",
      longDescription: "FanForce is an on-chain platform combining real-world amateur sports with Web3 incentive mechanisms, featuring four distinct roles: Administrator, Ambassador, Athlete, and Audience. Through decentralized governance, it boosts grassroots sports economies and integrates an AI-powered DeFi yield engine so participants can grow their assets while engaging with the sports ecosystem.",
      mediaType: "iframe",
      mediaSrc: "https://www.youtube-nocookie.com/embed/0gGCtpkIk_A?rel=0&modestbranding=1&playsinline=1",
      tags: ["Next.js 14", "TypeScript", "Tailwind CSS", "Express.js", "PostgreSQL", "JWT", "X Layer", "ERC-4626", "OKX DEX SDK", "Ethers.js", "Hardhat", "AI Agent", "WebSocket"],
      demoUrl: "https://dorahacks.io/buidl/31076",
      repoUrl: "https://github.com/AlbertLei-Web3/FanForce-AI",
    },
    {
      id: "yt-5tw3ut8hd2g",
      title: "SomniFlow",
      description: "SomniFlow revolutionizes Web3 onboarding.",
      longDescription: "SomniFlow revolutionizes Web3 onboarding by enabling users to access DeFi in just 30 seconds using their email and device biometrics. No seed phrases, no browser extensions, no gas fees - just pure DeFi accessibility.",
      mediaType: "iframe",
      mediaSrc: "https://www.youtube-nocookie.com/embed/5Tw3uT8HD2g?rel=0&modestbranding=1&playsinline=1",
      tags: ["Next.js 14", "React 18", "TypeScript", "TailwindCSS", "NextAuth.js", "Google OAuth","Wagmi", "ERC-4337", "Solidity", "Hardhat", "PostgreSQL","IPFS"],
      demoUrl: "https://dorahacks.io/buidl/32754",
      repoUrl: "https://github.com/onsommoshitarminda-star/SomniFlow",
    },
    {
      id: "gdrive-12kv0sPD",
      title: "AIHarvest",
      description: "AIHarvest is a DeFi platform that enables token swapping, liquidity provision, and yield farming.",
      longDescription: "AIHarvest is a DeFi platform that enables token swapping, liquidity provision, and yield farming.",
      mediaType: "iframe",
      mediaSrc: "https://drive.google.com/file/d/12kv0sPDWo3A0-Iv96amvjlb6fo29WFaP/preview",
      tags: ["Next.js", "React", "TypeScript", "Tailwind CSS", "Solidity 0.8.20", "Hardhat", "OpenZeppelin", "ethers.js", "wagmi", "React Context API"],
      demoUrl: "https://www.notion.so/AIHarvest-DeFi-Project-1f6e010d461f80eab73ddb885fa80805?pvs=12",
      repoUrl: "https://github.com/AlbertLei-Web3/AIHarvest2.0",
    },
    /**
     * 模板示例 Template example
     *
     * 1) 本地/远程视频 Local/Remote video
     * {
     *   id: "my-web3-ai-app",
     *   title: "My Web3 × AI Demo",
     *   description: "ZK + LLM pipeline with neon UI",
     *   mediaType: "video",
     *   mediaSrc: "/demos/my-demo.mp4",
     *   poster: "/demos/my-demo-poster.jpg",
     * }
     *
     * 2) YouTube/Iframe
     * {
     *   id: "yt-agent",
     *   title: "On-chain Agent Preview",
     *   description: "Realtime actions + wallet ops",
     *   mediaType: "iframe",
     *   mediaSrc: "https://www.youtube.com/embed/XXXXXXXX?rel=0",
     * }
     */
  ];

  return (
    <>
      <NavBar />
      <main className="mx-auto max-w-7xl px-4">
        <Hero />

        {/* Projects Section with View more */}
        <ProjectsSection projects={projects} initialVisible={3} increment={3} />

        {/* About Section */}
        {/**
         * 中文（初学者友好）：
         * - 按你的要求，将 "About" 标题置于卡片上方；
         * - 删除文字描述，仅保留技能便当格；
         * - 取消多列网格，让便当格在容器中满宽铺展。
         * English (Beginner-friendly):
         * - Place the "About" heading above the cards;
         * - Remove paragraph description, keep skills bento only;
         * - Drop the column grid so the bento fills the container width.
         */}
        <section
          id="about"
          className="mt-14 rounded-2xl bg-white/5 p-6 ring-1 ring-white/10"
        >
          <div className="mb-4">
            <h2 className="neon-text text-xl font-bold">About</h2>
          </div>
          <TechStackBento projects={projects} maxItems={12} title="Skills" />
        </section>
      </main>

      <Footer />
    </>
  );
}


