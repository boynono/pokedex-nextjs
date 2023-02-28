/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./pages/**/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",

    // Or if using `src` directory:
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  safelist: [
    "text-2xl",
    "text-3xl",
    {
      pattern:
        /bg-(red|green|blue|black|brown|gray|pink|purple|white|yellow)-(100|200|300|500|900)/,
      variants: ["lg", "hover", "focus", "lg:hover"],
    },
  ],
  theme: {
    extend: {},
  },
  plugins: [require("@tailwindcss/aspect-ratio")],
};
