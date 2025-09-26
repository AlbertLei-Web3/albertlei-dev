/**
 * 中文（初学者友好）：
 * 这个文件集中管理“关于（About）”区域的技能清单与熟练度数值。
 * - 你只需要在这里“增删改”即可，前端会自动更新渲染。
 * - 删除任意技能（从 roleSkills 中移除或从 skillPercent 中删除该键），前端就不会再显示它。
 * - 修改熟练度（0~100），数值会立刻应用到进度条和百分比文案。
 *
 * English (Beginner-friendly):
 * This file centralizes the Skills list and proficiency percentages for the About section.
 * - Edit here only (add/remove/update); the frontend will reflect changes automatically.
 * - Removing any skill (from roleSkills or from skillPercent) will stop it from rendering.
 * - Update proficiency (0~100) and the change will immediately apply to bars and labels.
 */

// ----------------------------
// 类型声明 / Type Declarations
// ----------------------------

/**
 * 中文：角色到技能名称数组的映射；这些字符串会直接在前端 Chips 上显示。
 * English: Mapping from role to skill name array; strings render directly on Chips.
 */
export type RoleSkills = Record<string, string[]>;

/**
 * 中文：每个技能对应一个 0~100 的熟练度百分比。键名必须与 Chips 上显示的技能名称完全一致（区分大小写）。
 * English: Each skill has a 0~100 proficiency percent. Keys must EXACTLY match the chip labels (case-sensitive).
 */
export type SkillPercent = Record<string, number>;

// -----------------------------------------
// 角色→技能清单（你可以自由增删改）
// Role → Skills list (freely add/remove/update)
// -----------------------------------------

export const roleSkills: RoleSkills = {
  /**
   * 中文：Web3 × AI 角色技能清单
   * English: Web3 × AI role skills
   */
  "Web3 × AI": [
    "Solidity",
    "Hardhat",
    "Ethers.js",
    "Web3.js",
    "ERC-4337", // 统一显示形式：建议使用带连字符的写法 / prefer hyphenated form
    "DeFi (Swap, Staking, Yield Farming)",
    "OpenAI API",
    "Whisper API",
    "AI Agent",
    "MCP",
  ],

  /**
   * 中文：创始人（Founder）角色能力清单（产品/商业相关）
   * English: Founder role capabilities (product/business oriented)
   */
  "Founder": [
    "Product Design (Figma, Notion...)",
    "Business Model Design",
    "Ecosystem Partnerships",
    "Team Management",
    "Remote Collaboration",
    "Rapid Iteration",
    "Demo Video Production",
    "Pitch Deck",
  ],

  /**
   * 中文：全栈开发（Full-Stack Developer）角色技能清单
   * English: Full-Stack Developer role skills
   */
  "Full-Stack Developer": [
    "React.js",
    "Next.js",
    "TypeScript",
    "Tailwind CSS",
    "Node.js",
    "Python",
    "Java",
    "MongoDB",
    "MySQL",
    "Redis",
    "Docker",
  ],

  /**
   * 中文：项目经理（PM）角色能力清单（协作/治理类）
   * English: Project Manager role capabilities (collaboration/governance)
   */
  "Project Manager": [
    "Linear",
    "Jira",
    "Figma",
    "Scrum Master",
    "Stakeholder Management",
    "Delivery governance",
    "Analytics dashboards",
    "User Feedback Loop",
  ],
};

// -----------------------------------------------------------
// 技能→熟练度（0~100）。你可以只填写想精确控制的项，不填的默认会显示为 1%。
// Skill → Proficiency (0~100). Only fill what you want to control precisely; unspecified defaults to 1%.
//
// 说明 / Notes:
// - 这些默认值仅为占位，方便你后续逐项手动调整。
// - 请确保键名与上方 roleSkills 中的技能名称完全一致。
// - 删除某个键或其在 roleSkills 中的出现，前端会自动停止渲染该技能。
// -----------------------------------------------------------

export const skillPercent: SkillPercent = {
  // Web3 × AI
  "Solidity": 62,
  "ERC-4337": 48,
  "Hardhat": 59,
  "Ethers.js": 57,
  "Web3.js": 56,
  "DeFi (Swap, Staking, Yield Farming)": 67,
  "NFT Minting": 48,
  "Tokenomics": 50,
  "OpenAI API": 66,
  "Whisper API": 65,
  "AI Agent": 68,
  "MCP": 40,
  "GitHub Actions": 50,
  "Vercel": 50,

  // Founder
  "Product Design (Figma, Notion...)": 60,
  "Business Model Design": 45,
  "Ecosystem Partnerships": 45,
  "Hackathon Prototype Incubation": 50,
  "Team Management": 63,
  "Remote Collaboration": 63,
  "Rapid Iteration": 60,
  "Demo Video Production": 58,
  "Pitch Deck": 63,

  // Full-Stack Developer
  "React.js": 62,
  "Next.js": 60,
  "TypeScript": 55,
  "Tailwind CSS": 53,
  "Wagmi": 51,
  "Node.js": 50,
  "Python": 50,
  "Java": 62,
  "MongoDB": 57,
  "Redis": 42,
  "MySQL": 48,
  "Docker": 35,
  "Telegram API": 50,

  // Project Manager
  "Jira": 46,
  "Figma": 63,
  "Linear": 67,
  "Scrum Master": 67,
  "Slack": 50,
  "Discord": 50,
  "Stakeholder Management": 62,
  "Delivery governance": 65,
  "Analytics dashboards": 60,
  "User Feedback Loop": 46,

  // 以下为从 projects.tags 中抽取的技能标签（保持与页面示例一致）
  // The following come from projects.tags in the example page
  "Next.js 15+": 50,
  "Go": 50,
  "Fiber": 50,
  "PostgreSQL": 50,
  "Turnkey API": 50,
  "Next.js 14": 50,
  "Express.js": 50,
  "JWT": 50,
  "X Layer": 50,
  "ERC-4626": 50,
  "OKX DEX SDK": 50,
  "WebSocket": 50,
  "React 18": 50,
  "TailwindCSS": 50,
  "NextAuth.js": 50,
  "Google OAuth": 50,
  "IPFS": 50,
  "React": 50,
  "Solidity 0.8.20": 50,
  "OpenZeppelin": 50,
  "React Context API": 50,
};

/**
 * 使用说明 / How to use:
 * 1) 在页面中传入 roleSkills（建议直接从本文件导入并传入），将完全由你在此处定义的技能清单驱动渲染。
 * 2) 进度条百分比由 skillPercent[name] 控制；若未指定则默认显示 1%。
 * 3) 删除技能名：
 *    - 若从 roleSkills 中移除，Chips 将不再显示该技能；
 *    - 同时可从 skillPercent 中删除对应键，保持数据整洁。
 *
 * In your page:
 * - Import and pass roleSkills from this file to the component; chips will follow this list.
 * - Bars read numbers from skillPercent; unspecified skills show 1% by default.
 * - Removing a skill from roleSkills stops rendering it; also remove its skillPercent entry if desired.
 */


