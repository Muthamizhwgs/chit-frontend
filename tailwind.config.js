/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      screens:{
        xs:"442px"
      },
      fontFamily:{
        Inter: ["inter"],
        Lato:["lato"]
      }
    },
    
  },
  plugins: [],
}

