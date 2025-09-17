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
import { Footer } from "@/components/Footer";

export default function HomePage() {
  // 注意：按你的真实数据填充，不要使用示例数据（遵循“不编造”要求）
  // Note: fill with your real data; do not use fabricated samples (per your rule)
  const projects: Project[] = [
    // {
    //   id: "my-web3-ai-app",
    //   title: "Your Project Name",
    //   description: "简短描述 / Brief description...",
    //   mediaType: "video", // or "iframe"
    //   mediaSrc: "https://your-cdn.com/demo.mp4", // or YouTube embed
    //   poster: "https://your-cdn.com/poster.jpg",
    // },
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
              我热衷于用 Web3 与 AI 技术探索新的人机交互方式、价值生产与分配模式，
              注重从 0 到 1 的产品探索与技术落地。 
              Passionate about Web3 and AI, I explore new HCI patterns and value flows,
              focusing on 0-to-1 product discovery and shipping polished experiences.
            </p>
          </div>
        </section>

        {/* Projects Section */}
        <section id="projects" className="mt-14">
          <div className="mb-6 flex items-end justify-between">
            <h2 className="neon-text text-xl font-bold">Projects</h2>
            <span className="text-xs text-white/60">
              视频自适应，建议 16:9。Videos are responsive, ideally 16:9.
            </span>
          </div>

          {projects.length === 0 ? (
            <div className="glass rounded-xl p-6 text-center text-white/70">
              尚未添加项目。请在 <code>app/page.tsx</code> 内填充 <code>projects</code> 列表。
              No projects yet. Add items to <code>projects</code> in <code>app/page.tsx</code>.
            </div>
          ) : (
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3">
              {projects.map((p) => (
                <ProjectCard key={p.id} project={p} />
              ))}
            </div>
          )}
        </section>
      </main>

      <Footer />
    </>
  );
}


