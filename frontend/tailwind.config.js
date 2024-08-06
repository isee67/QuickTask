// tailwind.config.js
module.exports = {
    content: [
      "./src/**/*.{js,ts,jsx,tsx}",
      "./index.html",
    ],
    theme: {},
    plugins: [],
  };

const { addDynamicIconSelectors } = require('@iconify/tailwind')
export default {
  plugins: [
    addDynamicIconSelectors(),
    require('tailwind-scrollbar-hide')
  ]
  
}