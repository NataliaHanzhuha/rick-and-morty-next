/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
 
    // Or if using `src` directory:
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      sepia: {
        50: '.5',
        75: '.75',
      },
      colors: {
        'dark-green': '#223843',
        'biege': '#DBD3D8',
        'accent': '#d77a61',
        'primary': '#D8B4A0'
      },
      screens: {
        'xs': '75px',
      }
    }
  },
  plugins: [],
}