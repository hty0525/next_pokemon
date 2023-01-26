/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      backgroundColor: {
        sk: "#f2f2f2",
      },
      backgroundImage: {
        skeleton: "linear-gradient(to right, #f2f2f2, #ddd, #f2f2f2)",
      },
      keyframes: {
        skeleton: {
          "0%": {
            transform: "translateX(0)",
          },
          "100%": {
            transform: "translateX(460px)",
          },
        },
      },
      animation: {
        skeleton: "skeleton 1s ease-in-out infinite",
      },
    },
  },
  plugins: [],
};
