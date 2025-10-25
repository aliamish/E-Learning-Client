// postcss.config.js
module.exports = {
  plugins: {
    // Use the separate PostCSS plugin package for Tailwind
    // See Tailwind v4 migration notes: use '@tailwindcss/postcss' as the plugin
    '@tailwindcss/postcss': {},
    autoprefixer: {},
  },
};
