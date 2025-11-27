import path from 'path';
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  root: 'examples',
  plugins: [react()],
  server: {
    port: 3001,
    host: '0.0.0.0',
  },
  build: {
    outDir: '../dist-examples',
    emptyOutDir: true,
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, '.')
    }
  }
});
