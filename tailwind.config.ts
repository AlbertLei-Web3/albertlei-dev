// tailwind.config.ts
/* 
  中文说明：
  - 自定义赛博朋克霓虹色彩与阴影，方便在组件中统一调用。
  - content 指定扫描目录，确保 Tailwind 能找到类名。
  
  English:
  - Custom neon colors and shadows for a cyberpunk vibe, used consistently.
  - 'content' defines scan paths so Tailwind can tree-shake classes correctly.
*/
import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: ["class"],
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./pages/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // 赛博霓虹色 Cyberpunk neon palette
        neon: {
          cyan: "#22E1FF",
          pink: "#FF33A1",
          purple: "#7A5CFF",
          lime: "#B6FF00",
          amber: "#FFC857",
        },
        base: {
          // 深色背景层次 Dark layered background
          900: "#0a0f1f",
          800: "#0e1426",
          700: "#11182d",
        },
      },
      boxShadow: {
        // 霓虹发光 Neon glows
        neonCyan: "0 0 10px rgba(34,225,255,0.6), 0 0 20px rgba(34,225,255,0.4)",
        neonPink: "0 0 10px rgba(255,51,161,0.6), 0 0 20px rgba(255,51,161,0.4)",
        neonPurple: "0 0 10px rgba(122,92,255,0.6), 0 0 20px rgba(122,92,255,0.4)",
        neonLime: "0 0 10px rgba(182,255,0,0.6), 0 0 20px rgba(182,255,0,0.4)",
      },
      backgroundImage: {
        // 渐变和网格效果 Gradients and subtle grids
        "radial-faint":
          "radial-gradient(800px 400px at 50% -10%, rgba(34,225,255,0.25), rgba(122,92,255,0.15), rgba(0,0,0,0))",
        "grid-dark":
          "linear-gradient(to bottom, rgba(255,255,255,0.04) 1px, transparent 1px), linear-gradient(to right, rgba(255,255,255,0.04) 1px, transparent 1px)",
      },
      backgroundSize: {
        grid: "40px 40px",
      },
      animation: {
        // 微弱闪烁与漂移 Subtle flicker and float
        flicker: "flicker 2s infinite alternate",
        float: "float 6s ease-in-out infinite",
      },
      keyframes: {
        flicker: {
          "0%, 100%": { opacity: "1", filter: "drop-shadow(0 0 8px rgba(34,225,255,0.6))" },
          "50%": { opacity: "0.9", filter: "drop-shadow(0 0 12px rgba(255,51,161,0.6))" },
        },
        float: {
          "0%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-6px)" },
          "100%": { transform: "translateY(0px)" },
        },
      },
    },
  },
  plugins: [],
};

export default config;


