/** @type {import('postcss-load-config').Config} */
const config = {
  plugins: {
    '@tailwindcss/postcss': {}, // <--- This fixes the error
    autoprefixer: {},
  },
};

export default config;