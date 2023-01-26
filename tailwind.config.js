/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
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
        skeleton: "skeleton 1.5s ease-in-out infinite",
      },
    },
  },
  plugins: [],
};
