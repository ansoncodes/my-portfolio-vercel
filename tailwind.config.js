/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  safelist: [
    'animate-float-orb-1',
    'animate-float-orb-2', 
    'animate-float-orb-3',
    'animate-float-particle',
    'animation-delay-2000',
    'animation-delay-4000',
    'animation-delay-6000'
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}