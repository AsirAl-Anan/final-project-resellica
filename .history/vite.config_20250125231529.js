import { defineConfig } from 'vite';
import path from 'path';

export default defineConfig({
  resolve: {
    alias: {
      '@mswjs/interceptors/presets/node': path.resolve(
        __dirname,
        'node_modules/@mswjs/interceptors/presets/node/index.js'
      ),
    },
  },
});