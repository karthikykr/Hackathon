/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'neon-blue': '#00C3FF',
        'neon-pink': '#FF00F5',
      },
    },
  },
  plugins: [],
}