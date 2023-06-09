/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      spacing: {
        100: "100%",
      },
      colors: {
        red: "var(--red)",
        yellow: "var(--yellow)",
        purple: "var(--purple)",
        lightYellow: "var(--lightYellow)",
        borderColor: "var(--bordr-color)",
      },
      screens: {
        ipad: "801px",
        mobile: "496px",
      },
      height: {
        bg: "var(--widthcalculate)",
      },
    },
  },
  plugins: [require("@tailwindcss/typography"), require("@tailwindcss/forms")],
};
