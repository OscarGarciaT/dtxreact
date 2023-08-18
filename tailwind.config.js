/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      backgroundImage: {
        "dental-stock": "url('/Images/tooth.jpg')",
      },
      colors: {
        cakepurple: "#33b3a6",
        aquablue: "#40e0d0",
        "dental-green": "#058789",
      },
    },
  },
  plugins: [import('tailwindcss-animated')],
};
