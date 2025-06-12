import { defineConfig } from 'vite'
import path from 'path';

// https://vitejs.dev/config/
export default defineConfig({
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
      '@components': path.resolve(__dirname, './src/components'),
      '@styles': path.resolve(__dirname, './src/styles'),
    },
  },
  server: {
    host: true
  },
  assetsInclude: ["/src/components/SVGs/**.svg"],
  css: {
    preprocessorOptions: {
      scss: {
        quietDeps: true
      }
    }
  }
})