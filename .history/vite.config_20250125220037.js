import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@mapbox/node-pre-gyp/lib/util/nw-pre-gyp/index.html': ''
    }
  }
})
