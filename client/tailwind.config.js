/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'ios-blue': '#007aff',
        'ios-purple': '#5856d6',
        'ios-gray': '#86868b',
        'ios-dark': '#1d1d1f',
        'ios-light': '#f2f2f7',
      },
      fontFamily: {
        'system': ['-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'sans-serif'],
      },
      borderRadius: {
        'ios': '20px',
      },
      backdropBlur: {
        'ios': '20px',
      }
    },
  },
  plugins: [],
} 