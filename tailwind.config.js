/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./src/App.tsx",
    "./src/components/**/*.tsx",
    "./src/pages/**/*.tsx"
  ],
  theme: {
    extend: {
      colors : {
        colorPrimary : "#00DD00",
        grayPrimary : "#EEEEEE"
      }
    },
  },
  plugins: []
}