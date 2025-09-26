import {NavBar} from '@/components/NavBar';
import {Hero} from '@/components/Hero';
import ProjectsSection from '@/components/ProjectsSection';
import TechStackBento from '@/components/TechStackBento';
import {Footer} from '@/components/Footer';
import type {Project} from '@/components/ProjectCard';
import {getMessages} from 'next-intl/server';
import { roleSkills } from '@/lib/skills';

export default async function HomePage({params}:{params:{locale:string}}) {
  const messages = await getMessages() as any;

  // 注意：真实数据请来自你的后端或静态数据文件；此处仅沿用现有 page.tsx 的数组
  const projects: Project[] = [
    {
      id: 'yt-akgktekzgn8',
      title: 'Somnia DeFi Wallet ',
      description: 'Somnia DeFi Wallet is a smart wallet project based on ERC4337.',
      longDescription: 'Somnia DeFi Wallet is a smart wallet project based on Account Abstraction, built specifically for the Somnia DeFi Mini Hackathon.This is a complete DeFi wallet ecosystem with 4 core microservice components, each focusing on specific functional areas, working together to provide users with secure and convenient decentralized financial services.',
      mediaType: 'video',
      mediaSrc: '/video/SomniaWalletFinal-PT.mp4?v=20250926',
      poster: '/1.png?v=20250926',
      tags: ['Next.js 15+', 'TypeScript', 'Tailwind CSS', 'Go', 'Fiber', 'PostgreSQL', 'Solidity', 'Hardhat', 'ERC-4337', 'Turnkey API'],
      demoUrl: 'https://dorahacks.io/buidl/32615',
      repoUrl: 'https://github.com/springmacedonio-sys/Somnia-DeFi-Wallet'
    },
    {
      id: 'yt-0gGCtpkIk_A',
      title: 'FanForce AI',
      description: 'FanForce is an on-chain platform combining amateur sports with Web3 incentive mechanisms.',
      longDescription: 'FanForce is an on-chain platform combining real-world amateur sports with Web3 incentive mechanisms, featuring four distinct roles: Administrator, Ambassador, Athlete, and Audience. Through decentralized governance, it boosts grassroots sports economies and integrates an AI-powered DeFi yield engine so participants can grow their assets while engaging with the sports ecosystem.',
      mediaType: 'video',
      mediaSrc: '/video/FanForce Project  _ OKX Hackathon 2025.mp4?v=20250926',
      poster: '/2.png?v=20250926',
      tags: ['Next.js 14', 'TypeScript', 'Tailwind CSS', 'Express.js', 'PostgreSQL', 'JWT', 'X Layer', 'ERC-4626', 'OKX DEX SDK', 'Ethers.js', 'Hardhat', 'AI Agent', 'WebSocket'],
      demoUrl: 'https://dorahacks.io/buidl/31076',
      repoUrl: 'https://github.com/AlbertLei-Web3/FanForce-AI'
    },
    {
      id: 'yt-5tw3ut8hd2g',
      title: 'SomniFlow',
      description: 'SomniFlow revolutionizes Web3 onboarding.',
      longDescription: 'SomniFlow revolutionizes Web3 onboarding by enabling users to access DeFi in just 30 seconds using their email and device biometrics. No seed phrases, no browser extensions, no gas fees - just pure DeFi accessibility.',
      mediaType: 'video',
      mediaSrc: '/video/SomniFlow.mp4?v=20250926',
      poster: '/3.png?v=20250926',
      tags: ['Next.js 14', 'React 18', 'TypeScript', 'TailwindCSS', 'NextAuth.js', 'Google OAuth', 'Wagmi', 'ERC-4337', 'Solidity', 'Hardhat', 'PostgreSQL', 'IPFS'],
      demoUrl: 'https://dorahacks.io/buidl/32754',
      repoUrl: 'https://github.com/onsommoshitarminda-star/SomniFlow'
    },
    {
      id: 'gdrive-12kv0sPD',
      title: 'AIHarvest',
      description: 'AIHarvest is a DeFi platform that enables token swapping, liquidity provision, and yield farming.',
      longDescription: 'AIHarvest is a DeFi platform that enables token swapping, liquidity provision, and yield farming.',
      mediaType: 'video',
      mediaSrc: '/video/AIHarvest-DeFi-FullCycle-Demo.mp4?v=20250926',
      poster: '/4.png?v=20250926',
      tags: ['Next.js', 'React', 'TypeScript', 'Tailwind CSS', 'Solidity 0.8.20', 'Hardhat', 'OpenZeppelin', 'ethers.js', 'wagmi', 'React Context API'],
      demoUrl: 'https://www.notion.so/AIHarvest-DeFi-Project-1f6e010d461f80eab73ddb885fa80805?pvs=12',
      repoUrl: 'https://github.com/AlbertLei-Web3/AIHarvest2.0'
    }
  ];

  return (
    <>
      <NavBar />
      <main className="mx-auto max-w-7xl px-4">
        <Hero />
        <ProjectsSection projects={projects} initialVisible={3} increment={3} />
        <section
          id="about"
          className="mt-14 relative z-[20] rounded-2xl bg-white/5 p-6 ring-1 ring-white/10 about-safe"
        >
          <div className="mb-4">
            <h2 className="neon-text text-xl font-bold">{messages?.about?.title ?? 'About'}</h2>
          </div>
          <TechStackBento
            projects={projects}
            maxItems={0}
            title="Skills"
            roleSkills={roleSkills}
          />
        </section>
      </main>
      <Footer />
    </>
  );
}


