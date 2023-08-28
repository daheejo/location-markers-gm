import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tsconfigPaths from 'vite-tsconfig-paths';
import { resolve } from 'path';
// https://vitejs.dev/config/
export default defineConfig({
  resolve: {
    alias: [
      { find: '@src', replacement: resolve(__dirname, 'src') },
    ]
  },
  base: './',
  plugins: [react(), tsconfigPaths()]
});