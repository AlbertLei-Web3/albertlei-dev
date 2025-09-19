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
  			neon: {
  				cyan: '#22E1FF',
  				pink: '#FF33A1',
  				purple: '#7A5CFF',
  				lime: '#B6FF00',
  				amber: '#FFC857'
  			},
  			base: {
  				'700': '#11182d',
  				'800': '#0e1426',
  				'900': '#0a0f1f'
  			},
  			background: 'hsl(var(--background))',
  			foreground: 'hsl(var(--foreground))',
  			card: {
  				DEFAULT: 'hsl(var(--card))',
  				foreground: 'hsl(var(--card-foreground))'
  			},
  			popover: {
  				DEFAULT: 'hsl(var(--popover))',
  				foreground: 'hsl(var(--popover-foreground))'
  			},
  			primary: {
  				DEFAULT: 'hsl(var(--primary))',
  				foreground: 'hsl(var(--primary-foreground))'
  			},
  			secondary: {
  				DEFAULT: 'hsl(var(--secondary))',
  				foreground: 'hsl(var(--secondary-foreground))'
  			},
  			muted: {
  				DEFAULT: 'hsl(var(--muted))',
  				foreground: 'hsl(var(--muted-foreground))'
  			},
  			accent: {
  				DEFAULT: 'hsl(var(--accent))',
  				foreground: 'hsl(var(--accent-foreground))'
  			},
  			destructive: {
  				DEFAULT: 'hsl(var(--destructive))',
  				foreground: 'hsl(var(--destructive-foreground))'
  			},
  			border: 'hsl(var(--border))',
  			input: 'hsl(var(--input))',
  			ring: 'hsl(var(--ring))',
  			chart: {
  				'1': 'hsl(var(--chart-1))',
  				'2': 'hsl(var(--chart-2))',
  				'3': 'hsl(var(--chart-3))',
  				'4': 'hsl(var(--chart-4))',
  				'5': 'hsl(var(--chart-5))'
  			}
  		},
  		boxShadow: {
  			neonCyan: '0 0 10px rgba(34,225,255,0.6), 0 0 20px rgba(34,225,255,0.4)',
  			neonPink: '0 0 10px rgba(255,51,161,0.6), 0 0 20px rgba(255,51,161,0.4)',
  			neonPurple: '0 0 10px rgba(122,92,255,0.6), 0 0 20px rgba(122,92,255,0.4)',
  			neonLime: '0 0 10px rgba(182,255,0,0.6), 0 0 20px rgba(182,255,0,0.4)'
  		},
  		backgroundImage: {
  			'radial-faint': 'radial-gradient(800px 400px at 50% -10%, rgba(34,225,255,0.25), rgba(122,92,255,0.15), rgba(0,0,0,0))',
  			'grid-dark': 'linear-gradient(to bottom, rgba(255,255,255,0.04) 1px, transparent 1px), linear-gradient(to right, rgba(255,255,255,0.04) 1px, transparent 1px)'
  		},
  		backgroundSize: {
  			grid: '40px 40px'
  		},
  		animation: {
  			flicker: 'flicker 2s infinite alternate',
  			float: 'float 6s ease-in-out infinite'
  		},
  		keyframes: {
  			flicker: {
  				'0%, 100%': {
  					opacity: '1',
  					filter: 'drop-shadow(0 0 8px rgba(34,225,255,0.6))'
  				},
  				'50%': {
  					opacity: '0.9',
  					filter: 'drop-shadow(0 0 12px rgba(255,51,161,0.6))'
  				}
  			},
  			float: {
  				'0%': {
  					transform: 'translateY(0px)'
  				},
  				'50%': {
  					transform: 'translateY(-6px)'
  				},
  				'100%': {
  					transform: 'translateY(0px)'
  				}
  			}
  		},
  		borderRadius: {
  			lg: 'var(--radius)',
  			md: 'calc(var(--radius) - 2px)',
  			sm: 'calc(var(--radius) - 4px)'
  		}
  	}
  },
  plugins: [require("tailwindcss-animate")],
};

export default config;


