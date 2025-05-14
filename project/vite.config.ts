import { defineConfig } from 'vite';

export default defineConfig({
  root: './',  // Set root directory to the root folder
  build: {
    rollupOptions: {
      input: './index.html',  // Explicitly specify the path to index.html
    },
  },
});
