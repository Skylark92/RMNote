/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      spacing: {
        header: 'var(--header-height)',
        main: 'calc(100% - var(--header-height))'
      },
    },
  },
  plugins: [],
}

