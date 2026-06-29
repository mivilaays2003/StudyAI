/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        bg: "#0F0F1A",
        card: "#1A1A2E",
        card2: "#16213E",
        accent: "#6C63FF",
        accent2: "#FF6584",
        muted: "#8888AA",
        textprimary: "#E8E8F0",
      },
      fontFamily: {
        sans: ["Inter", "Segoe UI", "sans-serif"],
      },
    },
  },
  plugins: [],
};
