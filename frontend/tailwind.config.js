/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Racing Base Colors
        'racing-black': '#0a0a0a',
        'carbon-grey': '#1a1a1a',
        'steel-grey': '#2d3436',
        'white-flag': '#ffffff',
        
        // F1 Brand Colors
        'f1-red': '#E10600',
        'f1-black': '#15151E',
        'f1-dark': '#0D0D14',
        'f1-gray': '#38383F',
        
        // Team Colors  
        'mclaren-orange': '#FF8700',
        'mclaren-dark': '#1E1E1E',
        'ferrari-red': '#DC0000',
        'ferrari-yellow': '#FFF200',
        'mclaren': {
          orange: '#FF8700',
          dark: '#1E1E1E',
        },
        'ferrari': {
          red: '#DC0000',
          yellow: '#FFF200',
        },
        'mercedes': {
          teal: '#00D2BE',
          silver: '#C0C0C0',
        },
        'redbull': {
          blue: '#0600EF',
          red: '#DC143C',
          yellow: '#FFD700',
        },
        
        // Racing UI Colors
        'track': '#2A2A2E',
        'pit': '#3D3D42',
        'flag': {
          green: '#00FF00',
          yellow: '#FFFF00',
          red: '#FF0000',
        },
        
        // Neon accent
        'neon': '#00FFFF',
        'electric': '#0066FF',
      },
      fontFamily: {
        'f1': ['Titillium Web', 'sans-serif'],
        'racing': ['Orbitron', 'monospace'],
      },
      animation: {
        'pulse-fast': 'pulse 1s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'slide-up': 'slideUp 0.3s ease-out',
        'gradient': 'gradient 8s linear infinite',
      },
      keyframes: {
        slideUp: {
          '0%': { transform: 'translateY(20px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        gradient: {
          '0%': { backgroundPosition: '0% 50%' },
          '50%': { backgroundPosition: '100% 50%' },
          '100%': { backgroundPosition: '0% 50%' },
        },
      },
    },
  },
  plugins: [],
}