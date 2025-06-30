/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#5B47E0',
        'primary-light': '#8B7FE8',
        accent: '#FF6B6B',
        surface: '#FFFFFF',
        background: '#F7F9FC',
        success: '#4ECDC4',
        warning: '#FFD93D',
        error: '#FF6B6B',
        info: '#4A90E2',
      },
      fontFamily: {
        display: ['Plus Jakarta Sans', 'sans-serif'],
        body: ['Inter', 'sans-serif'],
      },
      animation: {
        'bounce-subtle': 'bounce-subtle 0.5s ease-out',
        'scale-in': 'scale-in 0.2s ease-out',
        'confetti': 'confetti 1s ease-out',
      },
      keyframes: {
        'bounce-subtle': {
          '0%, 100%': { transform: 'scale(1)' },
          '50%': { transform: 'scale(1.05)' },
        },
        'scale-in': {
          '0%': { transform: 'scale(0.95)', opacity: '0' },
          '100%': { transform: 'scale(1)', opacity: '1' },
        },
        'confetti': {
          '0%': { transform: 'translateY(0) rotateZ(0deg)', opacity: '1' },
          '100%': { transform: 'translateY(-100px) rotateZ(360deg)', opacity: '0' },
        },
      },
    },
  },
  plugins: [],
}