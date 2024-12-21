import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: ["class"], // Enables dark mode when 'class' is added to an element
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "hsl(var(--background))", // Default background color controlled by a CSS variable
        foreground: "hsl(var(--foreground))", // Foreground color for texts and general elements
        card: {
          DEFAULT: "hsl(var(--card))", // Background for cards
          foreground: "hsl(var(--card-foreground))", // Text color within cards
        },
        popover: {
          DEFAULT: "hsl(var(--popover))", // Background for popovers (modals, dropdowns, etc.)
          foreground: "hsl(var(--popover-foreground))", // Text color inside popovers
        },
        primary: {
          DEFAULT: "hsl(var(--primary))", // Main primary theme color
          foreground: "hsl(var(--primary-foreground))", // Text color for primary elements
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))", // Secondary color
          foreground: "hsl(var(--secondary-foreground))", // Text color for secondary elements
        },
        muted: {
          DEFAULT: "hsl(var(--muted))", // Muted colors for less emphasis
          foreground: "hsl(var(--muted-foreground))", // Text color for muted elements
        },
        accent: {
          DEFAULT: "hsl(var(--accent))", // Accent color for highlighting key elements
          foreground: "hsl(var(--accent-foreground))", // Text color for accent elements
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))", // Destructive color (e.g., for warnings or errors)
          foreground: "hsl(var(--destructive-foreground))", // Text color for destructive elements
        },
        border: "hsl(var(--border))", // Border color
        input: "hsl(var(--input))", // Input background color
        ring: "hsl(var(--ring))", // Ring color (outline for focus or hover states)
        chart: {
          "1": "hsl(var(--chart-1))", // Colors for chart visualizations
          "2": "hsl(var(--chart-2))",
          "3": "hsl(var(--chart-3))",
          "4": "hsl(var(--chart-4))",
          "5": "hsl(var(--chart-5))",
        },
      },
      borderRadius: {
        lg: "var(--radius)", // Large radius for rounded corners
        md: "calc(var(--radius) - 2px)", // Medium radius
        sm: "calc(var(--radius) - 4px)", // Small radius
      },
      spacing: {
        '14': '3.5rem', // Custom spacing for layout adjustments
      },
      fontSize: {
        'xxs': '0.625rem', // Very small font size
      },
      animation: {
        'bounce-slow': 'bounce 3s infinite', // Custom slow bounce animation
      },
      keyframes: {
        bounce: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-10px)' },
        },
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
};

export default config;
