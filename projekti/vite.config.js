// vite.config.js
import { resolve } from 'path';
import { defineConfig } from 'vite';

export default defineConfig({
  build: {
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'start-api-harjoituspohja.html'),
        home: resolve(__dirname, 'start-auth.html'),
      },
    },
  },
});