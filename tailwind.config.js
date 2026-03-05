/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors:{
        primary: '#6976EB',
        secondary: '#ADB4F3',
        title: '#3B3D53',
        lightGray: '#B7B7B7',
        red: '#FF0404',
        danger: '#EAA1A1',
        normal: '#EFD99A',
        safe: '#97D799',
        blue: '#2B3695',
        navy: '#1F1A5F',
        blueBlack: '#161A41',
      },
      fontFamily: {
        sans: ["Cairo", "sans-serif"],
      },
    },
  },
  plugins: [],
}


