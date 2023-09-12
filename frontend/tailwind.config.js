/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{ts,tsx}"],
  darkMode: 'class',
  theme: {
    borderWidth:{
      '1': '1px'
    },
    extend: {
        backgroundImage: {
          mobile: {
            default: "url",
            dark: "url('/assets/bg-mobile-dark.jpg')"
          },
          desktop: {
            default: "url('/assets/bg-desktop-light.jpg')",
            dark: "url('/assets/bg-desktop-dark.jpg')"
          }
        }
      ,
      colors: {
        primary: {
          default: "hsl(236, 9%, 61%)",
          dark: "hsl(234, 39%, 85%)"
        },
        secundary: {
          default: "hsl(233, 11%, 84%)",
          dark: "hsl(234, 11%, 52%)"
        },
        bg: {
          default: "hsl(0, 0%, 98%)",
          dark: "hsl(235, 24%, 19%)",
          dark2: "hsl(235, 21%, 11%)"
        }

      }
    },
  },
  plugins: [],
}

