import { defineConfig } from 'astro/config';

export default defineConfig({
  site: 'https://fellipegabriel.github.io',
  base: '/portfolio',
  trailingSlash: 'always',
  build: { format: 'directory' },
  image: { responsiveStyles: false },
});
