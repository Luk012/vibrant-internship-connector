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
                // Yellit palette (already present and good)
                yellit: {
                    primary: '#F4D900',     // Main yellow for backgrounds
                    secondary: '#FFB800',   // Accent, hover
                    accent: '#FFCC33',      // Another accent
                    light: '#FFF5CC',       // Lighter yellow elements
                    dark: '#665C00'         // Dark yellow for text on light yellit, or dark elements
                },
                // Added custom black for consistency with previous suggestions
                'custom-black': '#1a1a1a',
            },
            borderRadius: {
                lg: 'var(--radius)',
                md: 'calc(var(--radius) - 2px)',
                sm: 'calc(var(--radius) - 4px)'
            },
            fontFamily: {
                sans: ['"DM Sans"', 'sans-serif'],
                display: ['"Poppins"', 'sans-serif'],
            },
            keyframes: {
                'accordion-down': {
                    from: { height: '0' },
                    to: { height: 'var(--radix-accordion-content-height)' }
                },
                'accordion-up': {
                    from: { height: 'var(--radix-accordion-content-height)' },
                    to: { height: '0' }
                },
                float: { // Existing float, good for hand SVGs
                    '0%, 100%': { transform: 'translateY(0)' },
                    '50%': { transform: 'translateY(-10px)' }
                },
                pulse: {
                    '0%, 100%': { opacity: '1' },
                    '50%': { opacity: '0.5' }
                },
                bounce: { // Existing bounce (infinite)
                    '0%, 100%': { transform: 'translateY(0)' },
                    '50%': { transform: 'translateY(-20px)' }
                },
                fadeIn: {
                    '0%': { opacity: '0', transform: 'translateY(20px)' },
                    '100%': { opacity: '1', transform: 'translateY(0)' }
                },
                marquee: {
                    '0%': { transform: 'translateX(0%)' },
                    '100%': { transform: 'translateX(-100%)' }
                },
                scale: {
                    '0%, 100%': { transform: 'scale(1)' },
                    '50%': { transform: 'scale(1.05)' }
                },
                wave: {
                    '0%': { transform: 'rotate(0deg)' },
                    '20%': { transform: 'rotate(20deg)' },
                    '40%': { transform: 'rotate(-10deg)' },
                    '60%': { transform: 'rotate(10deg)' },
                    '80%': { transform: 'rotate(-10deg)' },
                    '100%': { transform: 'rotate(0deg)' }
                },
                'eye-follow': {
                    '0%': { transform: 'translate(0, 0)' },
                    '100%': { transform: 'translate(10px, 10px)' }
                },
                // Added for modal specific animation if not covered by tailwindcss-animate easily
                'modal-fade-in-scale': {
                    'from': { opacity: '0', transform: 'scale(0.95)' },
                    'to': { opacity: '1', transform: 'scale(1)' }
                },
                // Added for a one-time bounce effect for modal success icon
                'bounce-subtle-once': {
                     '0%, 100%': { transform: 'translateY(0px)' },
                     '30%': { transform: 'translateY(-10px)' },
                     '50%': { transform: 'translateY(0px)' },
                     '70%': { transform: 'translateY(-5px)' },
                }
            },
            animation: {
                'accordion-down': 'accordion-down 0.2s ease-out',
                'accordion-up': 'accordion-up 0.2s ease-out',
                'float': 'float 4s ease-in-out infinite', // Use this for hand SVGs
                'pulse': 'pulse 3s ease-in-out infinite',
                'bounce': 'bounce 2s ease-in-out infinite', // Default infinite bounce
                'fade-in': 'fadeIn 0.5s ease-out forwards',
                'scale': 'scale 3s ease-in-out infinite',
                'marquee': 'marquee 25s linear infinite',
                'wave': 'wave 2s linear infinite',
                'eye-follow': 'eye-follow 0.3s ease-out forwards',
                // Added for modal
                'modal-fade-in-scale': 'modal-fade-in-scale 0.3s ease-out forwards',
                // Added for success icon
                'bounce-subtle-once': 'bounce-subtle-once 0.8s ease-out forwards', // 'forwards' to hold end state if needed
            }
        }
    },
    
} satisfies Config;