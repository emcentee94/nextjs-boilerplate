/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        fredoka: ['var(--font-fredoka)', 'Fredoka', 'sans-serif'],
        nunito: ['var(--font-nunito)', 'Nunito', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
