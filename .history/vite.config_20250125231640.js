import { defineConfig } from 'vite';
import htmlPlugin from 'vite-plugin-html';
import path from 'path';

export default defineConfig({
  plugins: [htmlPlugin()],
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