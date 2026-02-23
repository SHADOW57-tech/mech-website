/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    theme: {
      extend: {
        colors: {
          primary: "#1E1E1E",   // Charcoal Black
          secondary: "#F5F5F5", // Light Gray/White
          accent1: "#FFB400",   // Bright Yellow-Orange (Main CTA)
          accent2: "#FF3B3B",   // Brighter Red (Emergency CTA)
          accent3: "#007BFF",     // Strong Red
        },
      },
    },
  },
  plugins: [],
}

