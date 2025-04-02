import type { Config } from "tailwindcss";

export default {
	darkMode: ["class"],
	content: [
		"./pages/**/*.{ts,tsx}",
		"./components/**/*.{ts,tsx}",
		"./app/**/*.{ts,tsx}",
		"./src/**/*.{ts,tsx}",
	],
	prefix: "",
	theme: {
		container: {
			center: true,
			padding: '2rem',
			screens: {
				'2xl': '1400px'
			}
		},
		extend: {
			colors: {
				border: 'hsl(var(--border))',
				input: 'hsl(var(--input))',
				ring: 'hsl(var(--ring))',
				background: 'hsl(var(--background))',
				foreground: 'hsl(var(--foreground))',
				primary: {
					DEFAULT: 'hsl(var(--primary))',
					foreground: 'hsl(var(--primary-foreground))'
				},
				secondary: {
					DEFAULT: 'hsl(var(--secondary))',
					foreground: 'hsl(var(--secondary-foreground))'
				},
				destructive: {
					DEFAULT: 'hsl(var(--destructive))',
					foreground: 'hsl(var(--destructive-foreground))'
				},
				muted: {
					DEFAULT: 'hsl(var(--muted))',
					foreground: 'hsl(var(--muted-foreground))'
				},
				accent: {
					DEFAULT: 'hsl(var(--accent))',
					foreground: 'hsl(var(--accent-foreground))'
				},
				popover: {
					DEFAULT: 'hsl(var(--popover))',
					foreground: 'hsl(var(--popover-foreground))'
				},
				card: {
					DEFAULT: 'hsl(var(--card))',
					foreground: 'hsl(var(--card-foreground))'
				},
				sidebar: {
					DEFAULT: 'hsl(var(--sidebar-background))',
					foreground: 'hsl(var(--sidebar-foreground))',
					primary: 'hsl(var(--sidebar-primary))',
					'primary-foreground': 'hsl(var(--sidebar-primary-foreground))',
					accent: 'hsl(var(--sidebar-accent))',
					'accent-foreground': 'hsl(var(--sidebar-accent-foreground))',
					border: 'hsl(var(--sidebar-border))',
					ring: 'hsl(var(--sidebar-ring))'
				},
				"white": "#FFFFFF",
				"flipkart-blue": "#2874F0",
				"flipkart-red": "#FF3366",
				"flipkart-orange": "#FB641B",
				"sky-blue": "#33C3F0",
				"break": {
					primary: "#2874F0",
					secondary: "#FB641B",
					accent: "#FF3366",
					light: "#FFFFFF",
					dark: "#000000",
					pink: "#FF66B2",
					blue: "#2874F0",
					red: "#FF3366",
					skyblue: "#33C3F0",
					orange: "#FB641B",
					indigo: "#3333FF",
					violet: "#9900FF",
					slate: "#555555",
					cyan: "#00AAFF"
				},
				"theme": {
					"vibrant": {
						primary: "#2874F0",
						secondary: "#FB641B",
						accent: "#FF3366"
					},
					"pastel": {
						primary: "#FFFFFF", 
						secondary: "#2874F0",
						accent: "#FF3366"
					},
					"neon": {
						primary: "#FFFFFF", 
						secondary: "#2874F0",
						accent: "#FF3366"
					},
					"galaxy": {
						primary: "#2874F0",
						secondary: "#000033",
						accent: "#FF3366"
					},
					"sunset": {
						primary: "#FB641B",
						secondary: "#2874F0",
						accent: "#FF3366"
					}
				}
			},
			borderRadius: {
				lg: 'var(--radius)',
				md: 'calc(var(--radius) - 2px)',
				sm: 'calc(var(--radius) - 4px)'
			},
			keyframes: {
				'accordion-down': {
					from: {
						height: '0'
					},
					to: {
						height: 'var(--radix-accordion-content-height)'
					}
				},
				'accordion-up': {
					from: {
						height: 'var(--radix-accordion-content-height)'
					},
					to: {
						height: '0'
					}
				},
				'fade-in': {
					from: {
						opacity: '0'
					},
					to: {
						opacity: '1'
					}
				},
				'fade-in-up': {
					from: {
						opacity: '0',
						transform: 'translateY(20px)'
					},
					to: {
						opacity: '1',
						transform: 'translateY(0)'
					}
				},
				'slide-in-right': {
					from: {
						transform: 'translateX(100%)'
					},
					to: {
						transform: 'translateX(0)'
					}
				},
				'pulse-soft': {
					'0%, 100%': {
						opacity: '1'
					},
					'50%': {
						opacity: '0.8'
					}
				}
			},
			animation: {
				'accordion-down': 'accordion-down 0.2s ease-out',
				'accordion-up': 'accordion-up 0.2s ease-out',
				'fade-in': 'fade-in 0.6s ease-out',
				'fade-in-up': 'fade-in-up 0.7s ease-out',
				'slide-in-right': 'slide-in-right 0.5s ease-out',
				'pulse-soft': 'pulse-soft 3s ease-in-out infinite'
			},
			transitionTimingFunction: {
				'apple-ease': 'cubic-bezier(0.25, 0.1, 0.25, 1)',
			},
			boxShadow: {
				'subtle': '0 2px 10px rgba(0, 0, 0, 0.05)',
				'glass': '0 4px 30px rgba(0, 0, 0, 0.1)',
				'elevated': '0 10px 30px rgba(0, 0, 0, 0.08)',
				'dark-glow': '0 0 20px rgba(44, 148, 125, 0.25)',
				'dark-card': '0 8px 16px rgba(0, 0, 0, 0.2)',
			},
			backdropBlur: {
				'subtle': '8px',
			},
		}
	},
	plugins: [require("tailwindcss-animate")],
} satisfies Config;
