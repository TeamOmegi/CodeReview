/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'primary': { //퍼플
          '50': '#f2f0fc',
          '100': '#e5e2f8',
          '200': '#d8d4f5',
          '300': '#cac6f1',
          '400': '#bdb8ee',
          '500': '#afaaea',
          '600': '#908bbf',
          '700': '#716e95',
          '800': '#54526e',
          '900': '#393749',
          '950': '#201f27',
        },
      
      'secondary': {//블루
          '50': '#edf4fc',
          '100': '#dbe8f9',
          '200': '#c8ddf6',
          '300': '#b5d2f3',
          '400': '#a1c7ef',
          '500': '#8cbcec',
          '600': '#749ac0',
          '700': '#5c7997',
          '800': '#465a6f',
          '900': '#303c49',
          '950': '#1c2127',
        },
        'base' : '#171821'
      },
      fontFamily:{
        'sans': ['Pretendard-Regular', 'sans-serif'],
      },
    },
  },
  plugins: [
    function ({ addUtilities }) {
      const newUtilities = {
        ".scrollbar-webkit": {
          "&::-webkit-scrollbar": {
            width: "20px",
          },
          "&::-webkit-scrollbar-track": {
            background: "rgba(255, 255, 255, 0)",
            borderRadius: "20px",
          },
          "&::-webkit-scrollbar-thumb": {
            background: "rgba(255, 255, 255, 0.3)",
            borderRadius: "20px",
            backgroundClip: "padding-box",
            border: "6px solid transparent",
            height: "20%"
          }
        }
      }

      addUtilities(newUtilities, ["responsive", "hover"])
    }
  ],
}

