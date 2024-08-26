/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      perspective: {
        '1000': '1000px',
      },

    },
  },
  variants: {
    extend: {
      transform: ['group-hover'],
    },
  },
  plugins: [
    require('@tailwindcss/aspect-ratio'),
  ],
}