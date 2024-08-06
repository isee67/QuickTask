// tailwind.config.js
const { addDynamicIconSelectors } = require('@iconify/tailwind')
module.exports = {
    content: [
      "./src/**/*.{js,ts,jsx,tsx}",
      "./index.html",
    ],
    theme: {},
    plugins: [    
      require('tailwind-scrollbar-hide'),
      addDynamicIconSelectors()],
  };