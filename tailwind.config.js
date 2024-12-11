/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: {
          white: '#FFFFFF',
          blue: '#A7D8F0',
          navy: '#003B73',
        },
        secondary: {
          yellow: '#FFF3B0',
          green: '#BFE6BA',
        },
        accent: {
          gray: '#EAEAEA',
          red: '#F76E6E',
        },
      },
    },
  },
  plugins: [],
};