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
      tags: ["Next.js", "AA(ERC-4337)", "DeFi", "Wallet"],
      demoUrl: "https://www.youtube.com/watch?v=AkGktEKzgn8",
      repoUrl: "#",
    },
  {
      id: "yt-0gGCtpkIk_A",
      title: "FanForce AI",
      description: "FanForce is an on-chain platform combining amateur sports with Web3 incentive mechanisms.",
      longDescription: "FanForce is an on-chain platform combining real-world amateur sports with Web3 incentive mechanisms, featuring four distinct roles: Administrator, Ambassador, Athlete, and Audience. Through decentralized governance, it boosts grassroots sports economies and integrates an AI-powered DeFi yield engine so participants can grow their assets while engaging with the sports ecosystem.",
      mediaType: "iframe",
      mediaSrc: "https://www.youtube-nocookie.com/embed/0gGCtpkIk_A?rel=0&modestbranding=1&playsinline=1",
      tags: ["On-chain", "Governance", "Sports"],
      demoUrl: "https://www.youtube.com/watch?v=0gGCtpkIk_A",
      repoUrl: "#",
    },
    {
      id: "yt-5tw3ut8hd2g",
      title: "SomniFlow",
      description: "SomniFlow revolutionizes Web3 onboarding.",
      longDescription: "SomniFlow revolutionizes Web3 onboarding by enabling users to access DeFi in just 30 seconds using their email and device biometrics. No seed phrases, no browser extensions, no gas fees - just pure DeFi accessibility.",
      mediaType: "iframe",
      mediaSrc: "https://www.youtube-nocookie.com/embed/5Tw3uT8HD2g?rel=0&modestbranding=1&playsinline=1",
      tags: ["Onboarding", "Email Login", "Biometrics"],
      demoUrl: "https://www.youtube.com/watch?v=5Tw3uT8HD2g",
      repoUrl: "#",
    },
    {
      id: "gdrive-12kv0sPD",
      title: "AIHarvest",
      description: "AIHarvest is a DeFi platform that enables token swapping, liquidity provision, and yield farming.",
      longDescription: "AIHarvest is a DeFi platform that enables token swapping, liquidity provision, and yield farming.",
      mediaType: "iframe",
      mediaSrc: "https://drive.google.com/file/d/12kv0sPDWo3A0-Iv96amvjlb6fo29WFaP/preview",
      tags: ["DeFi", "Yield", "Liquidity"],
      demoUrl: "https://drive.google.com/file/d/12kv0sPDWo3A0-Iv96amvjlb6fo29WFaP/view",
      repoUrl: "#",
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

        {/* About Section */}
        <section
          id="about"
          className="mt-14 grid gap-6 rounded-2xl bg-white/5 p-6 ring-1 ring-white/10 md:grid-cols-3"
        >
          <div>
            <h2 className="neon-text text-xl font-bold">About</h2>
          </div>
          <div className="md:col-span-2">
            <p className="text-white/80">
              Passionate about Web3 and AI, I explore new HCI patterns and value flows,
              focusing on 0-to-1 product discovery and shipping polished experiences.
            </p>
          </div>
        </section>

        {/* Projects Section with View more */}
        <ProjectsSection projects={projects} initialVisible={3} increment={3} />
      </main>

      <Footer />
    </>
  );
}


