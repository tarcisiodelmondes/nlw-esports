/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ["Inter", "sans-serif"],
      },
      backgroundImage: {
        galaxy: "url(background-galaxy.svg)",
        "nlw-gradient":
          "linear-gradient(89deg, #9572FC -1.92%, #43E7AD 52.94%, #E1D55D 99.57%)",
        "game-gradient":
          "linear-gradient(180deg, rgba(0, 0, 0, 0) 0%, rgba(0, 0, 0, 0.9) 67.08%)",
      },
    },
  },
  plugins: [],
};
