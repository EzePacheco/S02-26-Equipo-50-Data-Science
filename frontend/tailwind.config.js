/** @type {import('tailwindcss').Config} */

export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#2563eb', // blue-600
          foreground: '#ffffff',
        },
        secondary: {
          DEFAULT: '#f3f4f6', // gray-100
          foreground: '#111827',
        },
      },      
    },
  },
  plugins: [],
}