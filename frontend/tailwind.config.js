/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'f1-red': '#E10600',
        'f1-black': '#15151E',
        'mclaren-orange': '#FF8700',
        'ferrari-red': '#DC0000',
        'mercedes-teal': '#00D2BE',
        'redbull-navy': '#0600EF',
      },
      fontFamily: {
        'f1': ['Formula1', 'sans-serif'],
      },
    },
  },
  plugins: [],
}