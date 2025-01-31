import { defineConfig } from 'vite';
import {createHtmlPlugin } from 'vite-plugin-html';
import path from 'path';

export default defineConfig({
  plugins: [createHtmlPlugin()],
  optimizeDeps: {
    exclude: ['@mapbox/node-pre-gyp', '@mswjs/interceptors'],
  },
  resolve: {
    alias: {
      '@mswjs/interceptors/presets/node': path.resolve(
        __dirname,
        'node_modules/@mswjs/interceptors/presets/node/index.js'
      ),
    },
  },
});