import tsconfigPaths from 'vite-tsconfig-paths';
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { patchCssModules } from 'vite-css-modules';

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    patchCssModules({ generateSourceTypes: true }),
    react(),
    tsconfigPaths()
  ],
  css: {
    modules: {
      localsConvention: 'camelCase'
    }
  },
  build: {
    target: 'es2022'
  }
});
