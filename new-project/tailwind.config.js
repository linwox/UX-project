/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx,vue}",
  ],
  theme: {
    extend: {
      backgroundImage:{
        'partySwipe': "url('../assets/partySwipeStart.svg')",
        'header':"url('../assets/headerBakgrund.svg')"
      }
    },
  },
  plugins: [require('daisyui')]
}



