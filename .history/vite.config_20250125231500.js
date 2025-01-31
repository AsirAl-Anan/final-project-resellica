import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import htmlPlugin from 'vite-plugin-html';
// https://vite.dev/config/
export default defineConfig({
  plugins: [react(),htmlPlugin()],
  exclude: ['@mapbox/node-pre-gyp'],
 
})
