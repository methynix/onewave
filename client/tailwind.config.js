/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        brand: {
          orange: "#E9BD3B",
          black: "#0A0A0A",
          darkGrey: "#1A1A1A",
          lightGrey: "#2D2D2D",
          accent: "#F5F5F7"
        }
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
        display: ['Lexend', 'sans-serif'], // Great for "anti-boring" headings
      }
    },
  },
  plugins: [],
}