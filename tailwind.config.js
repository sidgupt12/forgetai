/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,jsx,ts,tsx}",
    "./components/**/*.{js,jsx,ts,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        'true-black': '#000000',
        'off-black': '#0a0a0a',
        'charcoal': '#121212',
      },
      fontFamily: {
        'display': ['Poppins', 'system-ui', 'sans-serif'],
        'body': ['Inter', 'system-ui', 'sans-serif'],
      },
      animation: {
        'expand': 'expand 1.5s ease-in-out',
        'collapse': 'collapse 1.5s ease-in-out',
      },
      keyframes: {
        expand: {
          '0%': { transform: 'scale(0)', opacity: '0' },
          '100%': { transform: 'scale(1)', opacity: '1' },
        },
        collapse: {
          '0%': { transform: 'scale(1)', opacity: '1' },
          '100%': { transform: 'scale(0)', opacity: '0', display: 'none' },
        },
      },
    },
  },
  plugins: [],
}
