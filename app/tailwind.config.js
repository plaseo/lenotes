/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {},
  },
  plugins: [
    require('daisyui')],
    daisyui: {
      mytheme: {
        "primary": "#008fec",
        "secondary": "#00f9ff",
        "accent": "#bdab00",
        "neutral": "#140801",
        "base-100": "#2e2227",
        "info": "#0088a1",
        "success": "#00fcb4",
        "warning": "#de8100",
        "error": "#ff8c98",
      },
    },
}