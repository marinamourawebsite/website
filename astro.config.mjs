// @ts-check
import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';

// https://astro.build/config
export default defineConfig({
  // Used for canonical + absolute OG URLs (Base.astro).
  site: 'https://marinamoura.com', // TODO(Leo): real domain
  vite: {
    plugins: [tailwindcss()],
  },
});
