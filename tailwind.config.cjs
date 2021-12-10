const production = !process.env.ROLLUP_WATCH;

module.exports = {
  future: {
    purgeLayersByDefault: true,
    removeDeprecatedGapUtilities: true,
  },
  plugins: [

  ],
  content: [
    './index.html',
    './src/**/*.svelte',
  ],
  purge: {
    content: [
     './src/**/*.svelte',

    ],
    enabled: production // disable purge in dev
  },
};
