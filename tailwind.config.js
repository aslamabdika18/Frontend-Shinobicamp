/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: '#006bb8',
        secondary: '#2fa0df',
        tertiary: '#ffc973',
        quaternary: '#fee3b3',
      },
    },
  },
  plugins: [],
}
