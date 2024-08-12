// tailwind.config.js
const { addDynamicIconSelectors } = require('@iconify/tailwind')
module.exports = {
    darkMode: "class",
    content: [
      "./src/**/*.{js,ts,jsx,tsx}",
      "./index.html",
    ],
    theme: {},
    plugins: [
      require('tailwind-scrollbar-hide'),
      addDynamicIconSelectors()],
  };