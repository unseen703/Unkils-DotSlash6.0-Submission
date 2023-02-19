/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    fontFamily: {
      cursive: "sans-serif",
      playfair: "sans-serif",
    },
    extend: {
      colors: {
        body: "#ffffff",
        header: "#2563eb",
        button: "",
        footer: "#ffffff",
      },
    },
  },
  plugins: [],
}
