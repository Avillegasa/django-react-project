/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{html,js,jsx,ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        serif: ['Noto Serif', 'serif'],
      },
      width: {
          '300' : '300px',
          '100': '25rem', // Clase personalizada
      },
      height: {
          '260': '260px',
      },
      colors: {
        "blue-primary": "#003F91",
        "blue-dark": "#002961",
        "yellow-accent": "#FFBF00",
      },
    },
  },
  plugins: [],
};
1;
