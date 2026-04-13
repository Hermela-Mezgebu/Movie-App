/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: "#00e5ff",
        "brand-dark": "#00b8d4",
        "bg-dark": "#121212",
        "bg-card": "#1e1e1e",
        sidebar: "#0a0a0a",
      },
      fontFamily: {
        sans: ["Inter", "sans-serif"],
      },
    },
  },
  plugins: [],
};