/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'regal-blue': 'rgb(196, 203, 208)',
        'color1' : 'rgba(229, 235, 239, 0.81)'
      },

    },
  },
  plugins: [],
}