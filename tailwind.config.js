/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#5B4FE8',
        secondary: '#8B7FF5',
        accent: '#FF6B8A',
        surface: '#FFFFFF',
        background: '#F8F9FC',
        success: '#22C55E',
        warning: '#F59E0B',
        error: '#EF4444',
        info: '#3B82F6',
      },
      fontFamily: {
        display: ['Plus Jakarta Sans', 'sans-serif'],
        body: ['Inter', 'sans-serif'],
      },
      backgroundImage: {
        'gradient-primary': 'linear-gradient(135deg, #5B4FE8 0%, #8B7FF5 100%)',
        'gradient-accent': 'linear-gradient(135deg, #FF6B8A 0%, #FF8FA3 100%)',
        'gradient-card': 'linear-gradient(135deg, #FFFFFF 0%, #F8F9FC 100%)',
      },
      animation: {
        'bounce-subtle': 'bounce-subtle 0.6s ease-in-out',
        'pulse-soft': 'pulse-soft 2s infinite',
      },
      keyframes: {
        'bounce-subtle': {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-4px)' },
        },
        'pulse-soft': {
          '0%, 100%': { opacity: 1 },
          '50%': { opacity: 0.8 },
        },
      },
    },
  },
  plugins: [],
}