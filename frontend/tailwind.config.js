/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        lobster: ["Lobster", "cursive"], // Add the Lobster font here
      },
      screens: {
        xs: "480px", // Custom screen size
      },
    },
  },
  plugins: [],
};
