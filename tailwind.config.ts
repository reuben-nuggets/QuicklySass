import type { Config } from "tailwindcss";

export default {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
      },
    },
  },
  daisyui: {
    themes: [
      {
        mytheme: {
            "primary": "#3674B5",
            "secondary": "#578FCA",
            "accent": "#A1E3F9",
            "neutral": "#1e170e",
            "base-100": "#fbfdf5",
            "info": "#0093ff",
            "success": "#099b00",
            "warning": "#ffa900",
            "error": "#ff8189",
          },
        },
      ],
    },
  plugins: [require('daisyui')],
} satisfies Config;
